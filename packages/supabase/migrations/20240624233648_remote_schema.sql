
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

ALTER SCHEMA "public" OWNER TO "postgres";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."access_role" AS ENUM (
    'superadmin',
    'admin',
    'member'
);

ALTER TYPE "public"."access_role" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
    INSERT INTO public.profiles (
        id, 
        name, 
        email, 
        avatar,
        phone,
        organization_id
    ) 
    VALUES (
        new.id, 
        new.raw_user_meta_data ->> 'name', 
        new.email,
        new.avatar,
        new.raw_user_meta_data ->> 'phone',
        CAST(new.raw_user_meta_data ->> 'organization_id' as uuid)
    );

    INSERT INTO public.organizations_members (
        user_id,
        organization_id
    )
    VALUES (
        new.id,
        CAST(new.raw_user_meta_data ->> 'organization_id' AS uuid)
    );

    RETURN new; 
END;$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_updated_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN 
    UPDATE public.profiles 
    SET 
        name = new.raw_user_meta_data ->> 'name', 
        email = new.email, 
        avatar = new.raw_user_meta_data ->> 'avatar',
        phone = new.raw_user_meta_data ->> 'phone',
        organization_id = CAST(new.raw_user_meta_data ->> 'organization_id' as uuid)
    WHERE id = new.id;
    
    RETURN new; 
END;$$;

ALTER FUNCTION "public"."handle_updated_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "sql"
    AS $$SELECT EXISTS(
    SELECT 1
    FROM public.profiles k
    WHERE k.id = auth.uid() AND k.role = 'admin'
);$$;

ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_me"("id" "uuid") RETURNS boolean
    LANGUAGE "sql"
    AS $$SELECT auth.uid()::text = id::text$$;

ALTER FUNCTION "public"."is_me"("id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_same_organization"("organization_id" "uuid") RETURNS boolean
    LANGUAGE "sql"
    AS $$SELECT ((((auth.jwt())::json -> 'user_metadata'::text) ->> 'organization_id'::text) = (organization_id)::text);$$;

ALTER FUNCTION "public"."is_same_organization"("organization_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_superadmin"() RETURNS boolean
    LANGUAGE "sql"
    AS $$SELECT EXISTS(
    SELECT 1
    FROM public.profiles k
    WHERE k.id = auth.uid() AND k.role = 'superadmin'
);$$;

ALTER FUNCTION "public"."is_superadmin"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "name" character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone
);

ALTER TABLE "public"."organizations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."organizations_members" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "organization_id" "uuid" NOT NULL,
    "deleted_at" timestamp with time zone,
    "role" "public"."access_role" DEFAULT 'member'::"public"."access_role" NOT NULL,
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."organizations_members" OWNER TO "postgres";

ALTER TABLE "public"."organizations_members" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."organizer_mainteners_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "avatar" "text" NOT NULL,
    "phone" "text" NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "deleted_at" timestamp with time zone,
    "id" "uuid" NOT NULL,
    "organization_id" "uuid" NOT NULL,
    "role" "public"."access_role" DEFAULT 'member'::"public"."access_role" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text")
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "kaders_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "kaders_phone_key" UNIQUE ("phone");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "kaders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."organizations_members"
    ADD CONSTRAINT "organizer_mainteners_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."organizations_members"
    ADD CONSTRAINT "organizers_members_kader_id_key" UNIQUE ("user_id");

ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizers_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizers_uid_key" UNIQUE ("id");

CREATE INDEX "idx_kaders_deleted_at" ON "public"."profiles" USING "btree" ("deleted_at");

ALTER TABLE ONLY "public"."organizations_members"
    ADD CONSTRAINT "organizations_members_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."organizations_members"
    ADD CONSTRAINT "organizations_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON UPDATE CASCADE ON DELETE SET NULL;

CREATE POLICY "Allow view for the same organization" ON "public"."organizations_members" FOR SELECT TO "authenticated" USING ("public"."is_same_organization"("organization_id"));

CREATE POLICY "Enable all for superadmin" ON "public"."organizations" TO "authenticated" USING ("public"."is_superadmin"());

CREATE POLICY "Enable all for superadmin" ON "public"."organizations_members" TO "authenticated" USING ("public"."is_superadmin"());

CREATE POLICY "Enable all for superadmin" ON "public"."profiles" TO "authenticated" USING ("public"."is_superadmin"());

CREATE POLICY "Enable all to admin in the same organization" ON "public"."profiles" TO "authenticated" USING (("public"."is_same_organization"("organization_id") AND "public"."is_admin"()));

CREATE POLICY "Enable read for authenticated users only" ON "public"."organizations" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Enable read in the same organization" ON "public"."profiles" FOR SELECT TO "authenticated" USING ("public"."is_same_organization"("organization_id"));

CREATE POLICY "Enable update for owner" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ("public"."is_me"("id"));

ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."organizations_members" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT ALL ON SCHEMA "public" TO PUBLIC;

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_updated_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_updated_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_updated_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_me"("id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_me"("id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_me"("id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."is_same_organization"("organization_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_same_organization"("organization_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_same_organization"("organization_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."is_superadmin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_superadmin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_superadmin"() TO "service_role";

GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";

GRANT ALL ON TABLE "public"."organizations_members" TO "anon";
GRANT ALL ON TABLE "public"."organizations_members" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations_members" TO "service_role";

GRANT ALL ON SEQUENCE "public"."organizer_mainteners_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."organizer_mainteners_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."organizer_mainteners_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

--
-- Dumped schema changes for auth and storage
--


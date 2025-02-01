-- BASIC SEED DATA

-- CREATE TEST WORKSPACES
INSERT INTO "public"."organizations" ("created_at", "updated_at", "name", "id")
VALUES 
    ('2022-01-01 10:00:00', '2022-01-01 10:00:00', 'Masjid Al-Kautsar CLTC', '123e4567-e89b-12d3-a456-426614174000');

-- CREATE TEST USERS
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) VALUES 
    (
        '00000000-0000-0000-0000-000000000000',
        'a5738633-3128-45e2-b2aa-95c229fb1d4a',
        'authenticated',
        'authenticated',
        'gifa.eriyanto@gmail.com',
        crypt ('alkautsar123', gen_salt ('bf')),
        NOW(),
        NOW(),
        NOW(),
        '{}',
        '{"organization_id": "123e4567-e89b-12d3-a456-426614174000", "name": "Gifa Eriyanto", "phone": "+6281234567890", "avatar": ""}',
        NOW(),
        NOW(),
        '',
        '',
        '',
        ''
    );

-- TEST USER EMAIL IDENTITIES
INSERT INTO
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        SELECT
            uuid_generate_v4 (),
            id,
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            NOW(),
            NOW(),
            NOW()
        FROM
            auth.users
    );
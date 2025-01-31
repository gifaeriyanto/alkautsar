import { Database } from '@client/supabase/types/database'

export type GeneralDatabaseTable = keyof Database['public']['Tables']

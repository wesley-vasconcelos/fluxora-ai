import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  if (!_supabase) {
    _supabase = createClient(url, key);
  }
  return _supabase;
}

export interface ContactLead {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message: string;
  created_at?: string;
}

/*
  SQL para criar a tabela no Supabase:

  CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Habilitar RLS
  ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

  -- Permitir INSERT anônimo (para o formulário público)
  CREATE POLICY "Allow anonymous inserts"
    ON contacts
    FOR INSERT
    TO anon
    WITH CHECK (true);
*/

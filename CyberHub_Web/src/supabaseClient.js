import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rhmoeunejcebykkbbelz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJobW9ldW5lamNlYnlra2JiZWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3Mzk0MzYsImV4cCI6MjA5ODMxNTQzNn0.kyy4VoO50wCqqeDtxexSOI34ZGedA4LI_wB3dU5clRc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
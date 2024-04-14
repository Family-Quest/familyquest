import { createClient } from "@supabase/supabase-js";

const key = process.env.SUPABASE_KEY || '';
const url = process.env.SUPABASE_URL || '';

const supabase = createClient(url, key);

export default supabase;

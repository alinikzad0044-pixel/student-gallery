
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://junouasxobfwwsetdkhh.supabase.co";

const supabasePublishableKey =
  "sb_publishable_V_DEBXB8ztKawU4HgF54ZA_9N-ggXmr";

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);

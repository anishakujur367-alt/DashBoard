/**
 * Backward-compatibility re-export.
 * Redirects any legacy `import { supabase } from "@/lib/supabase"` to the
 * correct browser client. New code should import directly from
 * "@/lib/supabase/client" (browser) or "@/lib/supabase/server" (server).
 */
export { supabase } from "./supabase/client";

import {createClient} from "@supabase/supabase-js";

const config = {
  SUPABASE_URL: "https://cbluufxienoloamrwmjb.supabase.co",
  SUPABASE_SERVICE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNibHV1ZnhpZW5vbG9hbXJ3bWpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MDAyMTE0NCwiZXhwIjoyMDA1NTk3MTQ0fQ.4GEJUI4yLzcLz7Wac97UdmAEr0VkY9jzZIwh8oxitVw",
  SUPABASE_JWT: "2b5p8q6ABv744/nmWNxwqRytzcWibrToWDVkwwB4vlOOxhqDv76aLLDqy1cmv/PTQ30KnbMnQFpZ2EuzQN6XOw=="
}

export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);
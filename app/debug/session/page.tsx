"use client"

import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser"

export default function DebugSessionPage() {
  const supabase = getSupabaseBrowserClient()
  const [sessionJson, setSessionJson] = useState<string>("loading...")

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.auth.getSession()
      setSessionJson(JSON.stringify({ session: data?.session, error: error?.message }, null, 2))
    }
    run()
  }, [])

  return (
    <pre style={{ padding: 16, whiteSpace: "pre-wrap" }}>{sessionJson}</pre>
  )
}



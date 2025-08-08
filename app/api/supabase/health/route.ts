import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createSupabaseServerClient()
    const { data, error } = await supabase.auth.getSession()

    return new Response(
      JSON.stringify({ ok: !error, hasSession: !!data?.session, error: error?.message ?? null }),
      { headers: { 'content-type': 'application/json' } }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message ?? 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}



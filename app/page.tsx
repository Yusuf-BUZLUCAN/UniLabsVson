"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser"

interface Post {
  id: number
  content: string
}

export default function HomePage() {
  const supabase = getSupabaseBrowserClient()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState("")

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user
      setIsLoggedIn(Boolean(user))
      if (user) {
        const fn = (user.user_metadata as any)?.firstName || ""
        const ln = (user.user_metadata as any)?.lastName || ""
        setDisplayName(`${fn} ${ln}`.trim() || user.email || "Kullanıcı")
        setAvatarUrl((user.user_metadata as any)?.avatar_url || "")
      }
    }
    load()
    const { data: sub } = supabase.auth.onAuthStateChange(() => load())
    return () => sub.subscription.unsubscribe()
  }, [])

  const handleCreatePost = () => {
    if (!newPost.trim()) return
    setPosts([{ id: Date.now(), content: newPost.trim() }, ...posts])
      setNewPost("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">UniLabs’a hoş geldiniz</h1>
              <p className="text-gray-600 mb-6">Sosyal akış, kulüpler ve mesajlaşma için giriş yapın veya kaydolun.</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/login">
                  <Button variant="outline">Giriş Yap</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">Kaydol</Button>
                </Link>
                  </div>
              </CardContent>
            </Card>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatarUrl || "/placeholder-user.jpg"} />
                    <AvatarFallback>
                      {displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Bir şeyler yaz..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-none resize-none focus:ring-0 p-0"
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                        Paylaş
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {posts.length === 0 ? (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center text-gray-600">
                  Henüz gönderi yok. İlk gönderini oluştur!
                </CardContent>
              </Card>
            ) : (
              posts.map((p) => (
                <Card key={p.id} className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <p className="text-gray-800 whitespace-pre-wrap">{p.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}



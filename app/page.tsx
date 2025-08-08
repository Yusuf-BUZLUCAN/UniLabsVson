"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Users,
  Calendar,
  MapPin,
  ImageIcon,
  Video,
  FileText,
  TrendingUp,
  UserPlus,
  Clock,
  BookOpen,
  Award,
  Target,
  Bookmark,
  BookmarkCheck,
  Upload,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

interface Post {
  id: number
  author: string
  avatar: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
  views: number
  isClubPost?: boolean
  clubName?: string
  eventDate?: string
  location?: string
  isLiked?: boolean
  isSaved?: boolean
  isNote?: boolean
  noteFile?: string
}

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  time: string
}

interface SuggestedFriend {
  id: number
  name: string
  avatar: string
  department: string
  mutualFriends: number
}

interface UpcomingEvent {
  id: number
  title: string
  date: string
  time: string
  location: string
  clubName: string
}

interface TrendingTopic {
  id: number
  topic: string
  posts: number
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      time: "2 saat önce",
      content:
        "🎉 Eczacılık Kulübü olarak düzenlediğimiz 'Bitkisel İlaçlar Semineri' büyük ilgi gördü! Katılan tüm arkadaşlarımıza teşekkürler. Gelecek hafta farmakoloji atölyemiz var, kaçırmayın! 🌿💊",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
      likes: 47,
      comments: 12,
      views: 234,
      isClubPost: true,
      clubName: "Eczacılık Kulübü",
      eventDate: "15 Aralık 2024",
      location: "Amfi 3",
    },
    {
      id: 2,
      author: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      time: "4 saat önce",
      content:
        "Yazılım Kulübü Hackathon'u için kayıtlar başladı! 48 saatte harika projeler geliştireceğiz. Ödül havuzu 15.000 TL! 💻🚀",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop",
      likes: 89,
      comments: 23,
      views: 456,
      isClubPost: true,
      clubName: "Yazılım Kulübü",
      eventDate: "20-22 Aralık 2024",
      location: "Bilgisayar Lab",
    },
    {
      id: 3,
      author: "Fatma Yıldız",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      time: "6 saat önce",
      content:
        "Farmakoloji dersi için hazırladığım kardiyovasküler ilaçlar notlarını paylaşıyorum. ACE inhibitörleri, beta blokerler ve kalsiyum kanal blokerleri detaylı anlatım. 📚",
      likes: 34,
      comments: 8,
      views: 156,
      isNote: true,
      noteFile: "Kardiyovasküler_İlaçlar.pdf",
    },
    {
      id: 4,
      author: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      time: "8 saat önce",
      content:
        "Yeşil Kampüs projesi kapsamında bugün 50 fidan diktik! 🌱 Doğa için küçük adımlar, büyük değişimler yaratır.",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop",
      likes: 156,
      comments: 34,
      views: 678,
      isClubPost: true,
      clubName: "Yeşil Kampüs",
      eventDate: "18 Aralık 2024",
      location: "Kampüs Bahçesi",
    },
    {
      id: 5,
      author: "Can Yılmaz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      time: "1 gün önce",
      content:
        "Biyokimya dersi protein sentezi konusu notlarım. Transkripsiyon ve translasyon süreçleri detaylı şemalarla anlatılmış. Sınavda çok işinize yarayacak! 🧬",
      likes: 67,
      comments: 15,
      views: 234,
      isNote: true,
      noteFile: "Protein_Sentezi_Notları.pdf",
    },
  ])

  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({
    1: [
      {
        id: 1,
        author: "Merve Ak",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
        content: "Harika bir seminerdi! Çok şey öğrendim 🙏",
        time: "1 saat önce",
      },
      {
        id: 2,
        author: "Can Yılmaz",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        content: "Farmakoloji atölyesi için sabırsızlanıyorum!",
        time: "45 dakika önce",
      },
    ],
  })

  const [newComment, setNewComment] = useState("")
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [newPost, setNewPost] = useState("")
  const [savedPosts, setSavedPosts] = useState<number[]>([])
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  })
  const [noteForm, setNoteForm] = useState({
    title: "",
    course: "",
    description: "",
    file: null as File | null,
  })

  const suggestedFriends: SuggestedFriend[] = [
    {
      id: 1,
      name: "Emre Yılmaz",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      department: "İşletme",
      mutualFriends: 5,
    },
    {
      id: 2,
      name: "Selin Kara",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      department: "Güzel Sanatlar",
      mutualFriends: 3,
    },
    {
      id: 3,
      name: "Burak Şen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      department: "Müzik",
      mutualFriends: 7,
    },
  ]

  const upcomingEvents: UpcomingEvent[] = [
    {
      id: 1,
      title: "Bitkisel İlaçlar Semineri",
      date: "15 Aralık",
      time: "14:00",
      location: "Amfi 3",
      clubName: "Eczacılık Kulübü",
    },
    {
      id: 2,
      title: "Hackathon 2024",
      date: "20 Aralık",
      time: "09:00",
      location: "Bilgisayar Lab",
      clubName: "Yazılım Kulübü",
    },
    {
      id: 3,
      title: "Geri Dönüşüm Atölyesi",
      date: "18 Aralık",
      time: "15:30",
      location: "Kampüs Bahçesi",
      clubName: "Yeşil Kampüs",
    },
  ]

  const trendingTopics: TrendingTopic[] = [
    { id: 1, topic: "#FinalSınavları", posts: 234 },
    { id: 2, topic: "#Bitkiselİlaçlar", posts: 89 },
    { id: 3, topic: "#Hackathon2024", posts: 156 },
    { id: 4, topic: "#YeşilKampüs", posts: 67 },
    { id: 5, topic: "#KariyerGünleri", posts: 123 },
  ]

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
          : post,
      ),
    )
  }

  const handleSave = (postId: number) => {
    setSavedPosts((prev) => (prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]))
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)))
  }

  const handleComment = (postId: number) => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "Sen",
        avatar: "/images/merve-profile.jpg",
        content: newComment,
        time: "Şimdi",
      }
      setComments({
        ...comments,
        [postId]: [...(comments[postId] || []), comment],
      })
      setNewComment("")
      setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post)))
    }
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        author: "Merve KARASAKAL",
        avatar: "/images/merve-profile.jpg",
        time: "Şimdi",
        content: newPost,
        likes: 0,
        comments: 0,
        views: 1,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const handleShareNote = () => {
    if (noteForm.title.trim() && noteForm.course.trim() && noteForm.description.trim()) {
      const post: Post = {
        id: Date.now(),
        author: "Merve KARASAKAL",
        avatar: "/images/merve-profile.jpg",
        time: "Şimdi",
        content: `${noteForm.course} dersi için hazırladığım "${noteForm.title}" notlarını paylaşıyorum. ${noteForm.description} 📚`,
        likes: 0,
        comments: 0,
        views: 1,
        isNote: true,
        noteFile: noteForm.file?.name || `${noteForm.title}.pdf`,
      }
      setPosts([post, ...posts])
      setNoteForm({ title: "", course: "", description: "", file: null })
    }
  }

  const handleJoinClub = () => {
    alert("Kulüp başvurunuz alındı! En kısa sürede size dönüş yapılacaktır.")
    setJoinForm({ name: "", email: "", phone: "", reason: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            {/* User Profile Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16 ring-4 ring-blue-200">
                    <AvatarImage src="/images/merve-profile.jpg" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xl">
                      MK
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-800">Merve KARASAKAL</h3>
                    <p className="text-sm text-gray-500">Eczacılık • 3. Sınıf</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="font-bold text-gray-800">45</div>
                    <div className="text-gray-500">Gönderi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">234</div>
                    <div className="text-gray-500">Takipçi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">189</div>
                    <div className="text-gray-500">Takip</div>
                  </div>
                </div>
                <Link href="/profile">
                  <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    Profili Görüntüle
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Access Menu */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Target className="w-4 h-4 mr-2 text-blue-500" />
                  Hızlı Erişim
                </h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/clubs"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Kulüplerim</span>
                </Link>
                <Link
                  href="/announcements"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-teal-500" />
                  <span className="text-sm">Duyurular</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Award className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm">Notlarım</span>
                </Link>
                <Link
                  href="/users"
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm">Arkadaş Bul</span>
                </Link>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                  Trend Konular
                </h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-blue-600">{topic.topic}</span>
                    <span className="text-xs text-gray-500">{topic.posts} gönderi</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Create Post */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10 ring-2 ring-blue-200">
                    <AvatarImage src="/images/merve-profile.jpg" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                      MK
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Bugün neler oluyor? Düşüncelerini paylaş..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-none resize-none focus:ring-0 p-0 text-lg placeholder:text-gray-400"
                      rows={3}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm">
                          <ImageIcon className="w-4 h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Fotoğraf</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-600 text-xs sm:text-sm">
                          <Video className="w-4 h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Video</span>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-teal-500 hover:text-teal-600 text-xs sm:text-sm">
                              <FileText className="w-4 h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Not Paylaş</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                Ders Notu Paylaş
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="noteTitle">Not Başlığı *</Label>
                                <Input
                                  id="noteTitle"
                                  value={noteForm.title}
                                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                                  placeholder="Örn: Kardiyovasküler İlaçlar"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="noteCourse">Ders Adı *</Label>
                                <Input
                                  id="noteCourse"
                                  value={noteForm.course}
                                  onChange={(e) => setNoteForm({ ...noteForm, course: e.target.value })}
                                  placeholder="Örn: Farmakoloji"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="noteDescription">Açıklama *</Label>
                                <Textarea
                                  id="noteDescription"
                                  value={noteForm.description}
                                  onChange={(e) => setNoteForm({ ...noteForm, description: e.target.value })}
                                  placeholder="Notun içeriği hakkında kısa bilgi..."
                                  rows={3}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="noteFile">Dosya Yükle</Label>
                                <div className="flex items-center space-x-2">
                                  <Input
                                    id="noteFile"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                                    onChange={(e) => setNoteForm({ ...noteForm, file: e.target.files?.[0] || null })}
                                    className="hidden"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => document.getElementById("noteFile")?.click()}
                                    className="w-full"
                                  >
                                    <Upload className="w-4 h-4 mr-2" />
                                    {noteForm.file ? noteForm.file.name : "Dosya Seç"}
                                  </Button>
                                </div>
                              </div>
                              <Button
                                onClick={handleShareNote}
                                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                              >
                                Notu Paylaş
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Button
                        onClick={handleCreatePost}
                        disabled={!newPost.trim()}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 w-full sm:w-auto"
                      >
                        Paylaş
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="ring-2 ring-blue-200">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 truncate">{post.author}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{post.time}</span>
                            {post.isClubPost && (
                              <>
                                <span>•</span>
                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs"
                                >
                                  {post.clubName}
                                </Badge>
                              </>
                            )}
                            {post.isNote && (
                              <>
                                <span>•</span>
                                <Badge variant="secondary" className="bg-teal-100 text-teal-800 text-xs">
                                  Ders Notu
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{post.views}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    {post.isNote && post.noteFile && (
                      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-4 border border-teal-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-teal-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-800 truncate">{post.noteFile}</h4>
                            <p className="text-sm text-gray-600">Ders notu • PDF dosyası</p>
                          </div>
                          <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white flex-shrink-0">
                            İndir
                          </Button>
                        </div>
                      </div>
                    )}

                    {post.eventDate && (
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-4 border border-blue-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm">
                          <div className="flex items-center space-x-1 text-blue-600">
                            <Calendar className="w-4 h-4" />
                            <span>{post.eventDate}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-cyan-600">
                            <MapPin className="w-4 h-4" />
                            <span>{post.location}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-48 sm:h-64 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
                      <div className="flex items-center justify-between sm:justify-start sm:space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            post.isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>

                        <button
                          onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>

                        <button
                          onClick={() => handleSave(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            savedPosts.includes(post.id) ? "text-indigo-500" : "text-gray-500 hover:text-indigo-500"
                          }`}
                        >
                          {savedPosts.includes(post.id) ? (
                            <BookmarkCheck className="w-5 h-5 fill-current" />
                          ) : (
                            <Bookmark className="w-5 h-5" />
                          )}
                        </button>

                        <button className="flex items-center space-x-2 text-gray-500 hover:text-teal-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>

                      {post.isClubPost && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-full px-4 sm:px-6 text-sm">
                              <Users className="w-4 h-4 mr-2" />
                              <span className="hidden sm:inline">Kulübe Katıl</span>
                              <span className="sm:hidden">Katıl</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                {post.clubName} - Üyelik Başvurusu
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="name">Ad Soyad</Label>
                                <Input
                                  id="name"
                                  value={joinForm.name}
                                  onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                                  placeholder="Adınız ve soyadınız"
                                />
                              </div>
                              <div>
                                <Label htmlFor="email">E-posta</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  value={joinForm.email}
                                  onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                                  placeholder="E-posta adresiniz"
                                />
                              </div>
                              <div>
                                <Label htmlFor="phone">Telefon</Label>
                                <Input
                                  id="phone"
                                  value={joinForm.phone}
                                  onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                                  placeholder="Telefon numaranız"
                                />
                              </div>
                              <div>
                                <Label htmlFor="reason">Neden katılmak istiyorsunuz?</Label>
                                <Textarea
                                  id="reason"
                                  value={joinForm.reason}
                                  onChange={(e) => setJoinForm({ ...joinForm, reason: e.target.value })}
                                  placeholder="Kulübe katılma nedeninizi açıklayın..."
                                  rows={3}
                                />
                              </div>
                              <Button
                                onClick={handleJoinClub}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                              >
                                Başvuru Gönder
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    {selectedPost === post.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                          {comments[post.id]?.map((comment) => (
                            <div key={comment.id} className="flex space-x-3">
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs">
                                  {comment.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="bg-gray-50 rounded-lg px-3 py-2">
                                  <p className="font-medium text-sm text-gray-800">{comment.author}</p>
                                  <p className="text-sm text-gray-700 break-words">{comment.content}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{comment.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Input
                            placeholder="Yorum yazın..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                            className="flex-1"
                          />
                          <Button
                            onClick={() => handleComment(post.id)}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          >
                            Gönder
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            {/* Suggested Friends */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <UserPlus className="w-4 h-4 mr-2 text-blue-500" />
                  Önerilen Arkadaşlar
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestedFriends.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-sm">
                          {friend.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm text-gray-800 truncate">{friend.name}</p>
                        <p className="text-xs text-gray-500 truncate">{friend.department}</p>
                        <p className="text-xs text-gray-400">{friend.mutualFriends} ortak arkadaş</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent flex-shrink-0"
                    >
                      <UserPlus className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <Link href="/users">
                  <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700">
                    Tümünü Gör
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Yaklaşan Etkinlikler
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
                  >
                    <h4 className="font-medium text-sm text-gray-800 mb-1 truncate">{event.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {event.clubName}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

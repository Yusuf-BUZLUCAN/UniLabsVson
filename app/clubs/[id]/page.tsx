"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Users, Calendar, MapPin, Star, Heart, MessageCircle, Share2, UserPlus, Clock, Award, Eye } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useParams } from "next/navigation"

interface ClubMember {
  id: number
  name: string
  avatar: string
  role: string
  joinDate: string
}

interface ClubEvent {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  image?: string
}

interface ClubPost {
  id: number
  author: string
  avatar: string
  time: string
  content: string
  image?: string
  likes: number
  comments: number
  views: number
}

export default function ClubDetailPage() {
  const params = useParams()
  const clubId = params.id
  const [activeTab, setActiveTab] = useState("posts")
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    experience: "",
  })

  // Mock data - gerçek uygulamada clubId'ye göre API'den gelecek
  const clubData = {
    id: clubId,
    name: "Eczacılık Kulübü",
    description:
      "Eczacılık alanında bilimsel etkinlikler, seminerler ve sosyal aktiviteler düzenliyoruz. Bitkisel ilaçlar, farmakoloji ve klinik eczacılık konularında uzmanlaşma fırsatı sunuyoruz.",
    coverImage: "/images/tip-kulubu-kapak.jpg",
    avatar: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop",
    members: 156,
    rating: 4.8,
    events: 24,
    category: "Akademik",
    president: "Merve KARASAKAL",
    founded: "2020",
    isJoined: false,
  }

  const clubMembers: ClubMember[] = [
    {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      role: "Başkan",
      joinDate: "15 Eylül 2023",
    },
    {
      id: 2,
      name: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      role: "Yönetici",
      joinDate: "20 Eylül 2023",
    },
    {
      id: 3,
      name: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      role: "Yönetici",
      joinDate: "1 Ekim 2023",
    },
    {
      id: 4,
      name: "Ali Özkan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      role: "Üye",
      joinDate: "5 Ekim 2023",
    },
  ]

  const clubEvents: ClubEvent[] = [
    {
      id: 1,
      title: "Bitkisel İlaçlar Semineri",
      description: "Bitkisel ilaçların etki mekanizmaları ve kullanım alanları hakkında kapsamlı seminer.",
      date: "15 Aralık 2024",
      time: "14:00 - 16:00",
      location: "Amfi 3",
      participants: 45,
      maxParticipants: 100,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Farmakoloji Atölyesi",
      description: "İlaç etkileşimleri ve dozaj hesaplamaları üzerine pratik atölye çalışması.",
      date: "20 Aralık 2024",
      time: "10:00 - 12:30",
      location: "Laboratuvar 2",
      participants: 25,
      maxParticipants: 30,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
    },
  ]

  const clubPosts: ClubPost[] = [
    {
      id: 1,
      author: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      time: "2 saat önce",
      content:
        "🎉 Bitkisel İlaçlar Semineri büyük ilgi gördü! Katılan tüm arkadaşlarımıza teşekkürler. Gelecek hafta farmakoloji atölyemiz var, kaçırmayın! 🌿💊",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
      likes: 47,
      comments: 12,
      views: 234,
    },
    {
      id: 2,
      author: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      time: "1 gün önce",
      content:
        "Farmakoloji dersi notlarını kulüp arşivimize ekledik. Tüm üyelerimiz erişebilir. Sınavlarda başarılar! 📚",
      likes: 23,
      comments: 8,
      views: 156,
    },
  ]

  const handleJoinClub = () => {
    alert("Kulüp başvurunuz alındı! En kısa sürede size dönüş yapılacaktır.")
    setJoinForm({ name: "", email: "", phone: "", reason: "", experience: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Club Header */}
        <Card className="mb-6 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="relative h-64">
            <img
              src={clubData.coverImage || "/placeholder.svg"}
              alt={clubData.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24 -mt-12 ring-4 ring-white shadow-lg">
                <AvatarImage src={clubData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-2xl">
                  {clubData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{clubData.name}</h1>
                    <p className="text-gray-600">Başkan: {clubData.president}</p>
                    <p className="text-sm text-gray-500">{clubData.founded} yılında kuruldu</p>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">{clubData.category}</Badge>
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{clubData.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 leading-relaxed">{clubData.description}</p>

                <div className="flex items-center space-x-6 mt-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{clubData.members} üye</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{clubData.events} etkinlik</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>En Aktif Kulüp</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-6">
                  {clubData.isJoined ? (
                    <Button className="bg-gray-100 text-gray-600" disabled>
                      <Users className="w-4 h-4 mr-2" />
                      Zaten Üyesin
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Kulübe Katıl
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            {clubData.name} - Üyelik Başvurusu
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Ad Soyad *</Label>
                            <Input
                              id="name"
                              value={joinForm.name}
                              onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                              placeholder="Adınız ve soyadınız"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">E-posta *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={joinForm.email}
                              onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                              placeholder="E-posta adresiniz"
                              required
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
                            <Label htmlFor="experience">Deneyim/Beceriler</Label>
                            <Textarea
                              id="experience"
                              value={joinForm.experience}
                              onChange={(e) => setJoinForm({ ...joinForm, experience: e.target.value })}
                              placeholder="Bu alandaki deneyimlerinizi ve becerilerinizi açıklayın..."
                              rows={2}
                            />
                          </div>
                          <div>
                            <Label htmlFor="reason">Neden katılmak istiyorsunuz? *</Label>
                            <Textarea
                              id="reason"
                              value={joinForm.reason}
                              onChange={(e) => setJoinForm({ ...joinForm, reason: e.target.value })}
                              placeholder="Kulübe katılma nedeninizi ve beklentilerinizi açıklayın..."
                              rows={3}
                              required
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
                  <Button variant="outline">
                    <Heart className="w-4 h-4 mr-2" />
                    Takip Et
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Club Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Gönderiler
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Etkinlikler
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Üyeler
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Hakkında
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="space-y-6">
              {clubPosts.map((post) => (
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
                        <div>
                          <p className="font-semibold text-gray-800">{post.author}</p>
                          <p className="text-sm text-gray-500">{post.time}</p>
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

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-teal-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clubEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  {event.image && (
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="space-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {event.participants}/{event.maxParticipants} katılımcı
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                      Etkinliğe Katıl
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubMembers.map((member) => (
                <Card
                  key={member.id}
                  className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-4 ring-2 ring-blue-200">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-gray-800 mb-1">{member.name}</h3>
                    <Badge className="mb-2">{member.role}</Badge>
                    <p className="text-sm text-gray-500">Katılım: {member.joinDate}</p>
                    <Button variant="outline" className="mt-4 w-full bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Mesaj Gönder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Kulüp Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kuruluş Yılı:</span>
                    <span className="font-medium">{clubData.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-medium">{clubData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Üye Sayısı:</span>
                    <span className="font-medium">{clubData.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Etkinlik Sayısı:</span>
                    <span className="font-medium">{clubData.events}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Değerlendirme:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{clubData.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>İstatistikler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-500">Toplam Üye</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">24</div>
                    <div className="text-sm text-gray-500">Düzenlenen Etkinlik</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-600">4.8</div>
                    <div className="text-sm text-gray-500">Kulüp Puanı</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">1,234</div>
                    <div className="text-sm text-gray-500">Toplam Katılımcı</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

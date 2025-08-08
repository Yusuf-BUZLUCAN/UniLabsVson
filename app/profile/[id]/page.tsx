"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileText, Download, Eye, UserPlus, MessageCircle, Heart, Share2, Award } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useParams } from "next/navigation"

interface UserProfile {
  id: number
  name: string
  avatar: string
  department: string
  year: string
  university: string
  bio: string
  clubs: string[]
  achievements: string[]
  stats: {
    posts: number
    followers: number
    following: number
    notesShared: number
  }
}

interface Post {
  id: number
  content: string
  image?: string
  likes: number
  comments: number
  time: string
  isLiked?: boolean
}

interface Note {
  id: number
  course: string
  title: string
  type: string
  uploadDate: string
  downloads: number
  views: number
  description: string
}

export default function UserProfilePage() {
  const params = useParams()
  const userId = Number(params.id)
  const loggedInUserId = 1 // Örnek: Giriş yapan kullanıcı id'si (gerçek projede oturumdan alınmalı)
  const [activeTab, setActiveTab] = useState("posts")
  const [isFollowing, setIsFollowing] = useState(false)

  const users: { [key: number]: UserProfile } = {
    1: {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      department: "Eczacılık Fakültesi",
      year: "3. Sınıf",
      university: "Harran Üniversitesi",
      bio: "Farmakolojiye tutkulu bir öğrenci. Bitkisel ilaçlara özel ilgisi var. Eczacılık Kulübü başkanı olarak aktif etkinlikler düzenliyorum. Gelecekte klinik eczacı olmayı hedefliyorum.",
      clubs: ["Eczacılık Kulübü Başkanı", "Yeşil Kampüs Üyesi"],
      achievements: ["Dean's List 2023", "En İyi Kulüp Başkanı Ödülü", "Bilimsel Makale Yayını"],
      stats: { posts: 45, followers: 234, following: 189, notesShared: 23 },
    },
    2: {
      id: 2,
      name: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      department: "Bilgisayar Mühendisliği",
      year: "4. Sınıf",
      university: "Harran Üniversitesi",
      bio: "Full-stack developer ve yapay zeka meraklısı. Yazılım Kulübü'nde aktif olarak çalışıyorum. React, Node.js ve Python ile projeler geliştiriyorum. Açık kaynak projelere katkıda bulunmayı seviyorum.",
      clubs: ["Yazılım Kulübü Üyesi", "Girişimcilik Kulübü Üyesi"],
      achievements: ["Hackathon 2024 Birincisi", "Google Developer Student Club Lead", "3 Açık Kaynak Projesi"],
      stats: { posts: 67, followers: 456, following: 234, notesShared: 34 },
    },
    3: {
      id: 3,
      name: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      department: "Çevre Mühendisliği",
      year: "2. Sınıf",
      university: "Harran Üniversitesi",
      bio: "Sürdürülebilir çevre için çalışan bir mühendislik öğrencisi. Yeşil Kampüs projesinin kurucusuyum. Çevre bilinci oluşturmak ve doğa koruma projelerinde yer almak en büyük tutkum.",
      clubs: ["Yeşil Kampüs Kurucusu", "Çevre Kulübü Başkanı"],
      achievements: ["Çevre Projesi Ödülü", "Sürdürülebilirlik Sertifikası", "TÜBİTAK Proje Desteği"],
      stats: { posts: 89, followers: 345, following: 167, notesShared: 19 },
    },
    4: {
      id: 4,
      name: "Ali Özkan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      department: "Matematik",
      year: "1. Sınıf",
      university: "Harran Üniversitesi",
      bio: "Matematik ve satranç tutkunu genç öğrenci. Analitik düşünmeyi seven, problem çözme becerilerini geliştirmeye odaklanan biriyim. Satranç turnuvalarında aktif olarak yer alıyorum.",
      clubs: ["Satranç Kulübü Üyesi", "Matematik Kulübü Üyesi"],
      achievements: ["Üniversiteler Arası Satranç 3.lüğü", "Matematik Olimpiyatı Katılımcısı"],
      stats: { posts: 23, followers: 123, following: 89, notesShared: 12 },
    },
  }

  const userPosts: { [key: number]: Post[] } = {
    1: [
      {
        id: 1,
        content:
          "Bugün farmakoloji dersinde öğrendiğimiz kardiyovasküler ilaçlar konusunu detaylı notlarımla paylaşıyorum. Özellikle ACE inhibitörleri ve beta blokerler hakkında kapsamlı bilgiler var. 💊📚",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
        likes: 34,
        comments: 8,
        time: "2 saat önce",
      },
      {
        id: 2,
        content:
          "Eczacılık Kulübü olarak düzenlediğimiz bitkisel ilaçlar semineri harika geçti! 50+ öğrenci katıldı. Gelecek hafta farmakokinetik workshop'umuz var. 🌿",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop",
        likes: 67,
        comments: 15,
        time: "1 gün önce",
      },
      {
        id: 3,
        content:
          "Final sınavlarına hazırlanırken biyokimya notlarımı gözden geçiriyorum. Protein sentezi ve enzim kinetikleri konularında özet çıkardım. Paylaşmak isteyenler mesaj atabilir! 📖",
        likes: 23,
        comments: 5,
        time: "3 gün önce",
      },
    ],
    2: [
      {
        id: 1,
        content:
          "Yeni React projemde TypeScript kullanarak e-ticaret uygulaması geliştiriyorum. State management için Redux Toolkit tercih ettim. Kod kalitesi gerçekten fark yaratıyor! 💻",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=300&fit=crop",
        likes: 89,
        comments: 23,
        time: "4 saat önce",
      },
      {
        id: 2,
        content:
          "Yazılım Kulübü Hackathon'u için hazırlıklar devam ediyor! AI tabanlı öğrenci asistanı projesi üzerinde çalışıyoruz. Machine Learning algoritmaları ile öğrenci sorularını yanıtlayacak. 🤖",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
        likes: 156,
        comments: 34,
        time: "1 gün önce",
      },
      {
        id: 3,
        content:
          "Algoritma ve veri yapıları dersinden notlarımı paylaşıyorum. Sorting algoritmaları, binary search tree ve graph traversal konularını detaylı işledim. 📊",
        likes: 45,
        comments: 12,
        time: "2 gün önce",
      },
    ],
    3: [
      {
        id: 1,
        content:
          "Yeşil Kampüs projesi kapsamında bugün 30 fidan diktik! 🌱 Öğrenci katılımı muhteşemdi. Sürdürülebilir bir gelecek için küçük adımlar büyük değişimler yaratır.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop",
        likes: 234,
        comments: 45,
        time: "6 saat önce",
      },
      {
        id: 2,
        content:
          "Çevre mühendisliği dersinde öğrendiğimiz hava kirliliği kontrolü yöntemlerini pratik örneklerle açıklayan notlarımı hazırladım. Filtrasyon sistemleri ve emisyon kontrolü detayları var. 🌍",
        image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=500&h=300&fit=crop",
        likes: 67,
        comments: 18,
        time: "2 gün önce",
      },
      {
        id: 3,
        content:
          "TÜBİTAK proje başvurumuz kabul edildi! Mikroplastik kirliliğinin deniz ekosistemi üzerindeki etkilerini araştıracağız. Çok heyecanlıyım! 🔬",
        likes: 123,
        comments: 28,
        time: "1 hafta önce",
      },
    ],
    4: [
      {
        id: 1,
        content:
          "Satranç turnuvasında finale kaldım! 🏆 Yarın büyük final maçı var. Açılış teorileri ve son oyun stratejilerimi gözden geçiriyorum. Desteklerinizi bekliyorum!",
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=500&h=300&fit=crop",
        likes: 45,
        comments: 12,
        time: "1 gün önce",
      },
      {
        id: 2,
        content:
          "Matematik analiz dersinden türev ve integral konularında aldığım notları paylaşıyorum. Özellikle limit hesaplamaları ve süreklilik konularında detaylı örnekler var. 📐",
        likes: 23,
        comments: 7,
        time: "3 gün önce",
      },
      {
        id: 3,
        content:
          "Üniversiteye yeni başladım ama matematik kulübündeki arkadaşlarla harika projeler yapıyoruz. Fibonacci dizileri ve altın oran üzerine sunum hazırlıyoruz. ✨",
        likes: 34,
        comments: 9,
        time: "1 hafta önce",
      },
    ],
  }

  const userNotes: { [key: number]: Note[] } = {
    1: [
      {
        id: 1,
        course: "Farmakoloji",
        title: "Kardiyovasküler İlaçlar Detaylı Notları",
        type: "PDF",
        uploadDate: "10 Aralık 2024",
        downloads: 89,
        views: 234,
        description:
          "ACE inhibitörleri, beta blokerler, kalsiyum kanal blokerleri ve diüretikler hakkında kapsamlı notlar",
      },
      {
        id: 2,
        course: "Biyokimya",
        title: "Protein Sentezi ve Enzim Kinetikleri",
        type: "PDF",
        uploadDate: "8 Aralık 2024",
        downloads: 67,
        views: 189,
        description: "Protein sentez mekanizmaları, enzim aktivitesi ve inhibisyon türleri detaylı anlatım",
      },
      {
        id: 3,
        course: "Farmakoloji",
        title: "Bitkisel İlaçlar ve Fitokimyasallar",
        type: "PPT",
        uploadDate: "5 Aralık 2024",
        downloads: 123,
        views: 345,
        description: "Doğal ürünler, aktif bileşenler ve terapötik kullanımları",
      },
      {
        id: 4,
        course: "Anatomi",
        title: "Sinir Sistemi Anatomisi",
        type: "PDF",
        uploadDate: "3 Aralık 2024",
        downloads: 45,
        views: 156,
        description: "Merkezi ve periferik sinir sistemi detaylı anatomik yapılar",
      },
    ],
    2: [
      {
        id: 1,
        course: "Algoritma ve Veri Yapıları",
        title: "Sorting Algoritmaları Karşılaştırması",
        type: "PDF",
        uploadDate: "12 Aralık 2024",
        downloads: 156,
        views: 423,
        description: "Bubble sort, merge sort, quick sort algoritmaları zaman karmaşıklığı analizi ile",
      },
      {
        id: 2,
        course: "Web Programlama",
        title: "React Hooks Kullanım Kılavuzu",
        type: "PDF",
        uploadDate: "9 Aralık 2024",
        downloads: 234,
        views: 567,
        description: "useState, useEffect, useContext ve custom hooks detaylı örneklerle",
      },
      {
        id: 3,
        course: "Veritabanı Yönetimi",
        title: "SQL Sorgu Optimizasyonu",
        type: "PDF",
        uploadDate: "6 Aralık 2024",
        downloads: 89,
        views: 234,
        description: "Index kullanımı, query planning ve performans iyileştirme teknikleri",
      },
      {
        id: 4,
        course: "Yapay Zeka",
        title: "Machine Learning Algoritmaları",
        type: "PPT",
        uploadDate: "4 Aralık 2024",
        downloads: 178,
        views: 456,
        description: "Supervised learning, unsupervised learning ve neural networks giriş",
      },
    ],
    3: [
      {
        id: 1,
        course: "Çevre Mühendisliği",
        title: "Hava Kirliliği Kontrolü Yöntemleri",
        type: "PDF",
        uploadDate: "11 Aralık 2024",
        downloads: 67,
        views: 189,
        description: "Filtrasyon sistemleri, emisyon kontrolü ve hava kalitesi ölçüm teknikleri",
      },
      {
        id: 2,
        course: "Su Kirliliği Kontrolü",
        title: "Atıksu Arıtma Teknolojileri",
        type: "PDF",
        uploadDate: "7 Aralık 2024",
        downloads: 89,
        views: 234,
        description: "Biyolojik, kimyasal ve fiziksel arıtma yöntemleri detaylı anlatım",
      },
      {
        id: 3,
        course: "Çevre Kimyası",
        title: "Mikroplastik Kirliliği Araştırması",
        type: "PDF",
        uploadDate: "2 Aralık 2024",
        downloads: 123,
        views: 345,
        description: "Deniz ekosistemindeki mikroplastik etkilerinin analizi ve çözüm önerileri",
      },
    ],
    4: [
      {
        id: 1,
        course: "Matematik Analiz",
        title: "Türev ve İntegral Hesaplamaları",
        type: "PDF",
        uploadDate: "9 Aralık 2024",
        downloads: 45,
        views: 123,
        description: "Limit, süreklilik, türev kuralları ve integral hesaplama teknikleri",
      },
      {
        id: 2,
        course: "Lineer Cebir",
        title: "Matris İşlemleri ve Determinant",
        type: "PDF",
        uploadDate: "5 Aralık 2024",
        downloads: 34,
        views: 89,
        description: "Matris çarpımı, ters matris ve determinant hesaplama yöntemleri",
      },
      {
        id: 3,
        course: "Matematik Tarihi",
        title: "Fibonacci Dizileri ve Altın Oran",
        type: "PPT",
        uploadDate: "1 Aralık 2024",
        downloads: 67,
        views: 156,
        description: "Fibonacci sayılarının doğadaki uygulamaları ve altın oran ilişkisi",
      },
    ],
  }

  const currentUser = users[userId]
  const posts = userPosts[userId] || []
  const notes = userNotes[userId] || []

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <Navbar />
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Kullanıcı bulunamadı</h1>
        </div>
      </div>
    )
  }

  const handleLike = (postId: number) => {
    // Like functionality would be implemented here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="h-32 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=128&fit=crop"
              alt="Campus background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24 -mt-12 ring-4 ring-white shadow-lg">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-2xl">
                  {currentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{currentUser.name}</h1>
                    <p className="text-gray-600">
                      {currentUser.department} • {currentUser.year}
                    </p>
                    <p className="text-sm text-gray-500">{currentUser.university}</p>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    {currentUser.clubs.map((club, index) => (
                      <Badge key={index} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        <Users className="w-3 h-3 mr-1" />
                        {club}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-gray-700 leading-relaxed">{currentUser.bio}</p>

                {/* Stats */}
                <div className="flex items-center space-x-6 mt-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">{currentUser.stats.posts}</div>
                    <div className="text-gray-500">Gönderi</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">{currentUser.stats.followers}</div>
                    <div className="text-gray-500">Takipçi</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">{currentUser.stats.following}</div>
                    <div className="text-gray-500">Takip</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-800">{currentUser.stats.notesShared}</div>
                    <div className="text-gray-500">Not Paylaşımı</div>
                  </div>
                </div>

                {/* Action Buttons */}
                {userId !== loggedInUserId && (
                  <div className="flex items-center space-x-3 mt-4">
                    <Button
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={
                        isFollowing
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      }
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isFollowing ? "Takip Ediliyor" : "Takip Et"}
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Mesaj Gönder
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <Award className="w-5 h-5 text-blue-500" />
              <span>Başarılar</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentUser.achievements.map((achievement, index) => (
                <Badge key={index} variant="outline" className="bg-indigo-50 text-indigo-800 border-indigo-200">
                  <Award className="w-3 h-3 mr-1" />
                  {achievement}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Gönderiler
            </TabsTrigger>
            <TabsTrigger
              value="notes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Ders Notları
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar>
                        <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                          {currentUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-800">{currentUser.name}</p>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                      >
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span>Paylaşılan Ders Notları</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ders</TableHead>
                      <TableHead>Başlık</TableHead>
                      <TableHead>Tür</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>İstatistikler</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notes.map((note) => (
                      <TableRow key={note.id}>
                        <TableCell className="font-medium">{note.course}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{note.title}</div>
                            <div className="text-sm text-gray-500">{note.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{note.type}</Badge>
                        </TableCell>
                        <TableCell>{note.uploadDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Download className="w-4 h-4" />
                              <span>{note.downloads}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{note.views}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Önizle
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              İndir
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, BookOpen, AlertCircle, Info, CheckCircle, FileText, MapPin } from "lucide-react"
import { Navbar } from "@/components/navbar"

interface Announcement {
  id: number
  title: string
  content: string
  author: string
  authorAvatar: string
  department: string
  category: string
  date: string
  time: string
  location?: string
  isPinned?: boolean
  views: number
  priority: "low" | "medium" | "high" | "urgent"
  attachments?: string[]
}

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Final Sınavları Takvimi Açıklandı",
      content:
        "2024 Güz Dönemi final sınavları 18-29 Aralık tarihleri arasında gerçekleştirilecektir. Sınav programınızı OBS sisteminden kontrol edebilirsiniz. Sınavlara geç kalınması durumunda sınava alınmayacaksınız.",
      author: "Prof. Dr. Yusuf BUZLUCAN",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      department: "Öğrenci İşleri",
      category: "Sınav",
      date: "13 Aralık 2024",
      time: "09:00",
      isPinned: true,
      views: 1247,
      priority: "urgent",
      attachments: ["Final_Takvimi_2024.pdf"],
    },
    {
      id: 2,
      title: "Kütüphane Çalışma Saatleri Güncellendi",
      content:
        "Final sınavları döneminde kütüphanemiz 24 saat açık olacaktır. Gece 00:00-06:00 saatleri arasında güvenlik kartınızla giriş yapabilirsiniz. Sessiz çalışma alanları rezervasyon sistemi aktif edilmiştir.",
      author: "Dr. Ayşe Kaya",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      department: "Kütüphane",
      category: "Hizmet",
      date: "12 Aralık 2024",
      time: "14:30",
      isPinned: true,
      views: 892,
      priority: "high",
    },
    {
      id: 3,
      title: "Burs Başvuruları Başladı",
      content:
        "2025 Bahar Dönemi için başarı bursu başvuruları başlamıştır. Başvuru için gerekli belgeler: transkript, gelir belgesi, nüfus cüzdanı fotokopisi. Son başvuru tarihi: 20 Aralık 2024.",
      author: "Öğrenci İşleri Müdürlüğü",
      authorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop&crop=face",
      department: "Öğrenci İşleri",
      category: "Burs",
      date: "11 Aralık 2024",
      time: "11:15",
      views: 654,
      priority: "medium",
      attachments: ["Burs_Basvuru_Formu.pdf", "Gerekli_Belgeler.pdf"],
    },
    {
      id: 4,
      title: "Yemekhane Menüsü Değişikliği",
      content:
        "Bu hafta yemekhane menüsünde değişiklik yapılmıştır. Vejeteryan seçenekler artırılmış, özel diyet menüleri eklenmiştir. Menüyü mobil uygulamadan görüntüleyebilirsiniz.",
      author: "Beslenme Hizmetleri",
      authorAvatar: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=40&h=40&fit=crop&crop=face",
      department: "Sağlık Kültür Spor",
      category: "Beslenme",
      date: "10 Aralık 2024",
      time: "08:45",
      views: 423,
      priority: "low",
    },
    {
      id: 5,
      title: "Kariyer Günleri Etkinliği",
      content:
        "15-17 Aralık tarihleri arasında Kariyer Günleri etkinliği düzenlenecektir. 50'den fazla şirket standı, CV inceleme workshopları ve mülakat simülasyonları yapılacaktır. Kayıt zorunludur.",
      author: "Kariyer Merkezi",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      department: "Kariyer Merkezi",
      category: "Etkinlik",
      date: "9 Aralık 2024",
      time: "16:20",
      location: "Kültür ve Kongre Merkezi",
      views: 1156,
      priority: "high",
    },
    {
      id: 6,
      title: "Kampüs İçi Ulaşım Değişikliği",
      content:
        "Kampüs içi ring seferleri kış programına geçmiştir. Sefer saatleri güncellendi. Yeni program pazartesi gününden itibaren geçerli olacaktır.",
      author: "Ulaşım Hizmetleri",
      authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
      department: "İdari İşler",
      category: "Ulaşım",
      date: "8 Aralık 2024",
      time: "13:10",
      views: 789,
      priority: "medium",
    },
    {
      id: 7,
      title: "Laboratuvar Güvenlik Eğitimi",
      content:
        "Tüm laboratuvar kullanıcıları için zorunlu güvenlik eğitimi düzenlenecektir. Eğitim tamamlanmadan laboratuvarlara giriş yapılamayacaktır. Online eğitim linki e-posta ile gönderilecektir.",
      author: "Prof. Dr. Fatma Özkan",
      authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face",
      department: "Fen Fakültesi",
      category: "Eğitim",
      date: "7 Aralık 2024",
      time: "10:30",
      views: 567,
      priority: "high",
    },
    {
      id: 8,
      title: "Sosyal Medya Yarışması",
      content:
        "Üniversitemizi tanıtan en yaratıcı sosyal medya içeriği yarışması başladı! Instagram, TikTok ve YouTube kategorilerinde ödüller var. Son katılım tarihi: 25 Aralık 2024.",
      author: "Öğrenci Toplulukları",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      department: "Öğrenci İşleri",
      category: "Yarışma",
      date: "6 Aralık 2024",
      time: "15:45",
      views: 934,
      priority: "low",
    },
  ]

  const categories = ["all", "Sınav", "Hizmet", "Burs", "Beslenme", "Etkinlik", "Ulaşım", "Eğitim", "Yarışma"]
  const departments = [
    "all",
    "Öğrenci İşleri",
    "Kütüphane",
    "Sağlık Kültür Spor",
    "Kariyer Merkezi",
    "İdari İşler",
    "Fen Fakültesi",
  ]

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || announcement.category === selectedCategory
    const matchesDepartment = selectedDepartment === "all" || announcement.department === selectedDepartment
    return matchesSearch && matchesCategory && matchesDepartment
  })

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "high":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case "medium":
        return <Info className="w-4 h-4 text-blue-500" />
      case "low":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Separate pinned and regular announcements
  const pinnedAnnouncements = filteredAnnouncements.filter((a) => a.isPinned)
  const regularAnnouncements = filteredAnnouncements.filter((a) => !a.isPinned)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Duyurular
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Üniversite yönetimi ve akademisyenlerden gelen önemli duyuruları takip edin.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Duyuru ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:border-blue-400 focus:outline-none"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:border-blue-400 focus:outline-none"
            >
              <option value="all">Tüm Birimler</option>
              {departments.slice(1).map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              Önemli Duyurular
            </h2>
            <div className="space-y-4">
              {pinnedAnnouncements.map((announcement) => (
                <Card
                  key={announcement.id}
                  className="border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="mt-1">
                        <AvatarImage src={announcement.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                          {announcement.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-lg text-gray-800 flex items-center">
                            {getPriorityIcon(announcement.priority)}
                            <span className="ml-2">{announcement.title}</span>
                          </h3>
                          <Badge className="bg-red-100 text-red-800 border-red-200">Sabitlenmiş</Badge>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <span className="font-medium mr-2">{announcement.author}</span>
                          <span>•</span>
                          <span className="mx-2">{announcement.department}</span>
                          <span>•</span>
                          <span className="mx-2">
                            {announcement.date}, {announcement.time}
                          </span>
                        </div>

                        <p className="text-gray-700 mb-4">{announcement.content}</p>

                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className={getPriorityColor(announcement.priority)}>{announcement.category}</Badge>

                          {announcement.location && (
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{announcement.location}</span>
                            </div>
                          )}

                          {announcement.attachments && announcement.attachments.length > 0 && (
                            <div className="flex items-center space-x-2">
                              {announcement.attachments.map((attachment, index) => (
                                <Button key={index} variant="outline" size="sm" className="text-xs bg-transparent">
                                  <FileText className="w-3 h-3 mr-1" />
                                  {attachment}
                                </Button>
                              ))}
                            </div>
                          )}

                          <div className="ml-auto flex items-center text-sm text-gray-500">
                            <span>{announcement.views} görüntülenme</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tüm Duyurular</h2>
          <div className="space-y-4">
            {regularAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className="shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="mt-1">
                      <AvatarImage src={announcement.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                        {announcement.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-lg text-gray-800 flex items-center">
                          {getPriorityIcon(announcement.priority)}
                          <span className="ml-2">{announcement.title}</span>
                        </h3>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-medium mr-2">{announcement.author}</span>
                        <span>•</span>
                        <span className="mx-2">{announcement.department}</span>
                        <span>•</span>
                        <span className="mx-2">
                          {announcement.date}, {announcement.time}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">{announcement.content}</p>

                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className={getPriorityColor(announcement.priority)}>{announcement.category}</Badge>

                        {announcement.location && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{announcement.location}</span>
                          </div>
                        )}

                        {announcement.attachments && announcement.attachments.length > 0 && (
                          <div className="flex items-center space-x-2">
                            {announcement.attachments.map((attachment, index) => (
                              <Button key={index} variant="outline" size="sm" className="text-xs bg-transparent">
                                <FileText className="w-3 h-3 mr-1" />
                                {attachment}
                              </Button>
                            ))}
                          </div>
                        )}

                        <div className="ml-auto flex items-center text-sm text-gray-500">
                          <span>{announcement.views} görüntülenme</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Duyuru Bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinize uygun duyuru bulunamadı. Farklı filtreler deneyin.</p>
          </div>
        )}
      </div>
    </div>
  )
}

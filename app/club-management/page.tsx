"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  UserMinus,
  Bell,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"

interface Member {
  id: number
  name: string
  avatar: string
  role: string
  joinDate: string
  status: "active" | "inactive"
  department: string
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  status: "upcoming" | "ongoing" | "completed"
  description: string
}

interface Announcement {
  id: number
  title: string
  content: string
  date: string
  priority: "low" | "medium" | "high"
  views: number
}

interface Budget {
  id: number
  category: string
  allocated: number
  spent: number
  remaining: number
  lastUpdated: string
}

export default function ClubManagementPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentSlide, setCurrentSlide] = useState(0)

  const clubInfo = {
    name: "Eczacılık Kulübü",
    description: "Eczacılık öğrencilerinin akademik ve sosyal gelişimini destekleyen kulüp",
    memberCount: 156,
    foundedDate: "2018",
    category: "Akademik",
    president: "Merve KARASAKAL",
  }

  const members: Member[] = [
    {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      role: "Başkan",
      joinDate: "15 Eylül 2023",
      status: "active",
      department: "Eczacılık",
    },
    {
      id: 2,
      name: "Ahmet YILMAZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      role: "Başkan Yardımcısı",
      joinDate: "20 Eylül 2023",
      status: "active",
      department: "Eczacılık",
    },
    {
      id: 3,
      name: "Fatma ÖZKAN",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      role: "Sekreter",
      joinDate: "25 Eylül 2023",
      status: "active",
      department: "Eczacılık",
    },
    {
      id: 4,
      name: "Can DEMİR",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      role: "Sayman",
      joinDate: "30 Eylül 2023",
      status: "active",
      department: "Eczacılık",
    },
    {
      id: 5,
      name: "Elif KAYA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      role: "Üye",
      joinDate: "5 Ekim 2023",
      status: "active",
      department: "Eczacılık",
    },
  ]

  const events: Event[] = [
    {
      id: 1,
      title: "Farmakoloji Semineri",
      date: "2024-12-20",
      time: "14:00",
      location: "Amfi 1",
      attendees: 45,
      maxAttendees: 60,
      status: "upcoming",
      description: "Kardiyovasküler ilaçlar üzerine detaylı seminer",
    },
    {
      id: 2,
      title: "Bitkisel İlaçlar Workshop'u",
      date: "2024-12-25",
      time: "10:00",
      location: "Lab 3",
      attendees: 30,
      maxAttendees: 40,
      status: "upcoming",
      description: "Bitkisel ilaçların hazırlanması ve kullanımı",
    },
    {
      id: 3,
      title: "Eczacılık Kariyer Günü",
      date: "2024-12-15",
      time: "09:00",
      location: "Konferans Salonu",
      attendees: 120,
      maxAttendees: 150,
      status: "completed",
      description: "Sektör profesyonelleri ile buluşma etkinliği",
    },
  ]

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Yeni Dönem Etkinlik Programı",
      content: "2024 Bahar dönemi etkinlik programımız yayınlandı. Detaylar için kulüp panosunu kontrol edin.",
      date: "2024-12-10",
      priority: "high",
      views: 234,
    },
    {
      id: 2,
      title: "Üyelik Yenileme Hatırlatması",
      content: "Üyelik yenileme işlemleri için son tarih 31 Aralık 2024'tür.",
      date: "2024-12-08",
      priority: "medium",
      views: 156,
    },
    {
      id: 3,
      title: "Laboratuvar Kullanım Kuralları",
      content: "Laboratuvar kullanımı ile ilgili yeni kurallar belirlendi. Lütfen dikkat ediniz.",
      date: "2024-12-05",
      priority: "low",
      views: 89,
    },
  ]

  const budget: Budget[] = [
    {
      id: 1,
      category: "Etkinlikler",
      allocated: 5000,
      spent: 3200,
      remaining: 1800,
      lastUpdated: "2024-12-10",
    },
    {
      id: 2,
      category: "Malzemeler",
      allocated: 2000,
      spent: 1500,
      remaining: 500,
      lastUpdated: "2024-12-08",
    },
    {
      id: 3,
      category: "Tanıtım",
      allocated: 1000,
      spent: 600,
      remaining: 400,
      lastUpdated: "2024-12-05",
    },
    {
      id: 4,
      category: "Diğer",
      allocated: 500,
      spent: 200,
      remaining: 300,
      lastUpdated: "2024-12-01",
    },
  ]

  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop",
      title: "Eczacılık Kulübü",
      subtitle: "Bilim ve İnovasyonun Merkezi",
    },
    {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=400&fit=crop",
      title: "Araştırma ve Geliştirme",
      subtitle: "Geleceğin Eczacıları İçin",
    },
    {
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=400&fit=crop",
      title: "Bitkisel İlaçlar",
      subtitle: "Doğal Çözümler Keşfedin",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ongoing":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Slider */}
        <Card className="mb-6 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="relative h-80">
            <img
              src={sliderImages[currentSlide].url || "/placeholder.svg"}
              alt={sliderImages[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{sliderImages[currentSlide].title}</h1>
                <p className="text-xl drop-shadow-md">{sliderImages[currentSlide].subtitle}</p>
              </div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Club Info Header */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{clubInfo.name}</h1>
                <p className="text-gray-600 mb-4">{clubInfo.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Kuruluş: {clubInfo.foundedDate}</span>
                  <span>•</span>
                  <span>Kategori: {clubInfo.category}</span>
                  <span>•</span>
                  <span>Başkan: {clubInfo.president}</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{clubInfo.memberCount}</div>
                <div className="text-gray-500">Aktif Üye</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Genel Bakış
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Üyeler
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Etkinlikler
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Duyurular
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              Bütçe
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Toplam Üye</p>
                      <p className="text-2xl font-bold text-gray-800">{clubInfo.memberCount}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Aktif Etkinlik</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {events.filter((e) => e.status === "upcoming").length}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Toplam Bütçe</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ₺{budget.reduce((sum, item) => sum + item.allocated, 0).toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Bu Ay Büyüme</p>
                      <p className="text-2xl font-bold text-gray-800">+12%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-cyan-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span>Yaklaşan Etkinlikler</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events
                      .filter((event) => event.status === "upcoming")
                      .slice(0, 3)
                      .map((event) => (
                        <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{event.title}</h4>
                            <p className="text-sm text-gray-500">
                              {event.date} • {event.time} • {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <span>Son Duyurular</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {announcements.slice(0, 3).map((announcement) => (
                      <div key={announcement.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority === "high"
                              ? "Yüksek"
                              : announcement.priority === "medium"
                                ? "Orta"
                                : "Düşük"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                        <p className="text-xs text-gray-500">{announcement.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span>Kulüp Üyeleri</span>
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Yeni Üye Ekle
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yeni Üye Ekle</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="memberName">Ad Soyad</Label>
                          <Input id="memberName" placeholder="Üye adını girin" />
                        </div>
                        <div>
                          <Label htmlFor="memberEmail">E-posta</Label>
                          <Input id="memberEmail" type="email" placeholder="E-posta adresini girin" />
                        </div>
                        <div>
                          <Label htmlFor="memberRole">Rol</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Rol seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">Üye</SelectItem>
                              <SelectItem value="secretary">Sekreter</SelectItem>
                              <SelectItem value="treasurer">Sayman</SelectItem>
                              <SelectItem value="vice-president">Başkan Yardımcısı</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                          Üye Ekle
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Üye</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Katılım Tarihi</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-800">{member.name}</p>
                              <p className="text-sm text-gray-500">{member.department}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              member.status === "active"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {member.status === "active" ? "Aktif" : "Pasif"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <UserMinus className="w-4 h-4" />
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

          {/* Events Tab */}
          <TabsContent value="events">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span>Etkinlik Yönetimi</span>
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Etkinlik
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yeni Etkinlik Oluştur</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="eventTitle">Etkinlik Başlığı</Label>
                          <Input id="eventTitle" placeholder="Etkinlik başlığını girin" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="eventDate">Tarih</Label>
                            <Input id="eventDate" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="eventTime">Saat</Label>
                            <Input id="eventTime" type="time" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="eventLocation">Konum</Label>
                          <Input id="eventLocation" placeholder="Etkinlik konumunu girin" />
                        </div>
                        <div>
                          <Label htmlFor="maxAttendees">Maksimum Katılımcı</Label>
                          <Input id="maxAttendees" type="number" placeholder="Maksimum katılımcı sayısı" />
                        </div>
                        <div>
                          <Label htmlFor="eventDescription">Açıklama</Label>
                          <Textarea id="eventDescription" placeholder="Etkinlik açıklamasını girin" />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                          Etkinlik Oluştur
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Etkinlik</TableHead>
                      <TableHead>Tarih & Saat</TableHead>
                      <TableHead>Konum</TableHead>
                      <TableHead>Katılımcı</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-800">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{event.date}</p>
                            <p className="text-sm text-gray-500">{event.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">
                              {event.attendees}/{event.maxAttendees}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status === "upcoming"
                              ? "Yaklaşan"
                              : event.status === "ongoing"
                                ? "Devam Ediyor"
                                : "Tamamlandı"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
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

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <span>Duyuru Yönetimi</span>
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Duyuru
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Yeni Duyuru Oluştur</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="announcementTitle">Duyuru Başlığı</Label>
                          <Input id="announcementTitle" placeholder="Duyuru başlığını girin" />
                        </div>
                        <div>
                          <Label htmlFor="announcementPriority">Öncelik</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Öncelik seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Düşük</SelectItem>
                              <SelectItem value="medium">Orta</SelectItem>
                              <SelectItem value="high">Yüksek</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="announcementContent">İçerik</Label>
                          <Textarea id="announcementContent" placeholder="Duyuru içeriğini girin" rows={4} />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                          Duyuru Yayınla
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Başlık</TableHead>
                      <TableHead>İçerik</TableHead>
                      <TableHead>Öncelik</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>Görüntülenme</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {announcements.map((announcement) => (
                      <TableRow key={announcement.id}>
                        <TableCell className="font-medium">{announcement.title}</TableCell>
                        <TableCell>
                          <p className="text-sm text-gray-600 max-w-xs truncate">{announcement.content}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority === "high"
                              ? "Yüksek"
                              : announcement.priority === "medium"
                                ? "Orta"
                                : "Düşük"}
                          </Badge>
                        </TableCell>
                        <TableCell>{announcement.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{announcement.views}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
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

          {/* Budget Tab */}
          <TabsContent value="budget">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Toplam Bütçe</p>
                        <p className="text-2xl font-bold text-gray-800">
                          ₺{budget.reduce((sum, item) => sum + item.allocated, 0).toLocaleString()}
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Harcanan</p>
                        <p className="text-2xl font-bold text-gray-800">
                          ₺{budget.reduce((sum, item) => sum + item.spent, 0).toLocaleString()}
                        </p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-red-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Kalan</p>
                        <p className="text-2xl font-bold text-gray-800">
                          ₺{budget.reduce((sum, item) => sum + item.remaining, 0).toLocaleString()}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                    <span>Bütçe Detayları</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Ayrılan</TableHead>
                        <TableHead>Harcanan</TableHead>
                        <TableHead>Kalan</TableHead>
                        <TableHead>Kullanım Oranı</TableHead>
                        <TableHead>Son Güncelleme</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {budget.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.category}</TableCell>
                          <TableCell>₺{item.allocated.toLocaleString()}</TableCell>
                          <TableCell>₺{item.spent.toLocaleString()}</TableCell>
                          <TableCell>₺{item.remaining.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                  style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">
                                {Math.round((item.spent / item.allocated) * 100)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

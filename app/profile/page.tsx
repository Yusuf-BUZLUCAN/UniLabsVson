"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  Users,
  UserPlus,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  FileText,
  Download,
  Eye,
  Settings,
  Bell,
  User,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser"
import { useEffect } from "react"
import Link from "next/link"

interface Grade {
  course: string
  midterm: number
  final: number
  weight: { midterm: number; final: number }
  required: number
  status: string
}

interface Schedule {
  day: string
  time: string
  course: string
  room: string
  instructor: string
  instructorId: number
}

interface Attendance {
  course: string
  total: number
  attended: number
  percentage: number
  status: string
}

interface Note {
  id: number
  course: string
  title: string
  type: string
  uploadDate: string
  downloads: number
  views: number
}

interface SavedPost {
  id: number
  author: string
  avatar: string
  content: string
  time: string
  likes: number
  comments: number
  clubName?: string
  isNote?: boolean
  noteFile?: string
}

export default function ProfilePage() {
  const supabase = getSupabaseBrowserClient()
  const [email, setEmail] = useState<string>("")
  const [displayName, setDisplayName] = useState<string>("")
  const [department, setDepartment] = useState<string>("")
  const [year, setYear] = useState<string>("")

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession()
      const user = data.session?.user
      if (user) {
        setEmail(user.email || "")
        const fn = (user.user_metadata as any)?.firstName || ""
        const ln = (user.user_metadata as any)?.lastName || ""
        setDisplayName(`${fn} ${ln}`.trim())
        setDepartment((user.user_metadata as any)?.department || "")
        setYear((user.user_metadata as any)?.year || "")
      }
    }
    load()
    const { data: sub } = supabase.auth.onAuthStateChange(() => load())
    return () => sub.subscription.unsubscribe()
  }, [])
  const [activeTab, setActiveTab] = useState("info")

  const grades: Grade[] = [
    {
      course: "Farmakoloji",
      midterm: 58,
      final: 0,
      weight: { midterm: 40, final: 60 },
      required: 61,
      status: "Final Gerekli",
    },
    {
      course: "Biyokimya",
      midterm: 75,
      final: 82,
      weight: { midterm: 40, final: 60 },
      required: 0,
      status: "Geçti",
    },
    {
      course: "Anatomi",
      midterm: 68,
      final: 71,
      weight: { midterm: 50, final: 50 },
      required: 0,
      status: "Geçti",
    },
    {
      course: "Fizyoloji",
      midterm: 45,
      final: 0,
      weight: { midterm: 30, final: 70 },
      required: 72,
      status: "Final Gerekli",
    },
  ]

  const schedule: Schedule[] = [
    {
      day: "Pazartesi",
      time: "09:00-10:50",
      course: "Farmakoloji",
      room: "Amfi 1",
      instructor: "Prof. Dr. Mehmet Ak",
      instructorId: 1,
    },
    {
      day: "Pazartesi",
      time: "11:00-12:50",
      course: "Biyokimya",
      room: "Lab 2",
      instructor: "Doç. Dr. Ayşe Kaya",
      instructorId: 2,
    },
    {
      day: "Salı",
      time: "10:00-11:50",
      course: "Anatomi",
      room: "Amfi 3",
      instructor: "Prof. Dr. Ali Demir",
      instructorId: 3,
    },
    {
      day: "Salı",
      time: "14:00-15:50",
      course: "Fizyoloji",
      room: "Derslik 5",
      instructor: "Dr. Fatma Yılmaz",
      instructorId: 4,
    },
    {
      day: "Çarşamba",
      time: "09:00-10:50",
      course: "Farmakoloji Lab",
      room: "Lab 1",
      instructor: "Arş. Gör. Can Özkan",
      instructorId: 5,
    },
    {
      day: "Perşembe",
      time: "11:00-12:50",
      course: "Biyokimya Lab",
      room: "Lab 3",
      instructor: "Dr. Zeynep Şen",
      instructorId: 6,
    },
    {
      day: "Cuma",
      time: "13:00-14:50",
      course: "Anatomi Lab",
      room: "Lab 4",
      instructor: "Arş. Gör. Burak Kara",
      instructorId: 7,
    },
  ]

  const attendance: Attendance[] = [
    { course: "Farmakoloji", total: 14, attended: 12, percentage: 86, status: "İyi" },
    { course: "Biyokimya", total: 14, attended: 13, percentage: 93, status: "Mükemmel" },
    { course: "Anatomi", total: 14, attended: 11, percentage: 79, status: "Dikkat" },
    { course: "Fizyoloji", total: 14, attended: 14, percentage: 100, status: "Mükemmel" },
  ]

  const notes: Note[] = [
    {
      id: 1,
      course: "Farmakoloji",
      title: "Kardiyovasküler İlaçlar",
      type: "PDF",
      uploadDate: "10 Aralık 2024",
      downloads: 45,
      views: 128,
    },
    {
      id: 2,
      course: "Farmakoloji",
      title: "Antibiyotikler Özeti",
      type: "PDF",
      uploadDate: "8 Aralık 2024",
      downloads: 67,
      views: 189,
    },
    {
      id: 3,
      course: "Biyokimya",
      title: "Protein Sentezi Slaytları",
      type: "PPT",
      uploadDate: "5 Aralık 2024",
      downloads: 34,
      views: 92,
    },
    {
      id: 4,
      course: "Anatomi",
      title: "Sinir Sistemi Notları",
      type: "PDF",
      uploadDate: "3 Aralık 2024",
      downloads: 78,
      views: 156,
    },
    {
      id: 5,
      course: "Fizyoloji",
      title: "Solunum Sistemi",
      type: "PDF",
      uploadDate: "1 Aralık 2024",
      downloads: 23,
      views: 67,
    },
  ]

  const savedPosts: SavedPost[] = [
    {
      id: 1,
      author: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      content:
        "Yazılım Kulübü Hackathon'u için kayıtlar başladı! 48 saatte harika projeler geliştireceğiz. Ödül havuzu 15.000 TL! 💻🚀",
      time: "4 saat önce",
      likes: 89,
      comments: 23,
      clubName: "Yazılım Kulübü",
    },
    {
      id: 2,
      author: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      content:
        "Yeşil Kampüs projesi kapsamında bugün 50 fidan diktik! 🌱 Doğa için küçük adımlar, büyük değişimler yaratır.",
      time: "6 saat önce",
      likes: 156,
      comments: 34,
      clubName: "Yeşil Kampüs",
    },
    {
      id: 3,
      author: "Fatma Yıldız",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      content:
        "Farmakoloji dersi için hazırladığım kardiyovasküler ilaçlar notlarını paylaşıyorum. ACE inhibitörleri, beta blokerler ve kalsiyum kanal blokerleri detaylı anlatım. 📚",
      time: "1 gün önce",
      likes: 34,
      comments: 8,
      isNote: true,
      noteFile: "Kardiyovasküler_İlaçlar.pdf",
    },
    {
      id: 4,
      author: "Can Yılmaz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      content:
        "Biyokimya dersi protein sentezi konusu notlarım. Transkripsiyon ve translasyon süreçleri detaylı şemalarla anlatılmış. Sınavda çok işinize yarayacak! 🧬",
      time: "2 gün önce",
      likes: 67,
      comments: 15,
      isNote: true,
      noteFile: "Protein_Sentezi_Notları.pdf",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Geçti":
        return "bg-green-100 text-green-800"
      case "Final Gerekli":
        return "bg-yellow-100 text-yellow-800"
      case "Kaldı":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case "Mükemmel":
        return "bg-green-100 text-green-800"
      case "İyi":
        return "bg-blue-100 text-blue-800"
      case "Dikkat":
        return "bg-yellow-100 text-yellow-800"
      case "Tehlike":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <Navbar />

      <div className="container mx-auto px-4 py-4 sm:py-6 max-w-6xl">
        {/* Profile Header - defaults for new users */}
        <Card className="mb-4 sm:mb-6 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="h-24 sm:h-32 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=128&fit=crop"
              alt="Campus background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <CardContent className="relative pt-0 pb-4 sm:pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-3 sm:space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 -mt-10 sm:-mt-12 ring-4 ring-white shadow-lg">
                <AvatarImage src="/images/merve-profile.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xl sm:text-2xl">
                  MK
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Merve KARASAKAL</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Eczacılık Fakültesi • 3. Sınıf</p>
                    <p className="text-xs sm:text-sm text-gray-500">Harran Üniversitesi</p>
                  </div>

                  <div className="flex items-center space-x-2 mt-3 sm:mt-4 md:mt-0">
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs sm:text-sm">
                      <Users className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Eczacılık Kulübü Başkanı</span>
                      <span className="sm:hidden">Kulüp Başkanı</span>
                    </Badge>
                  </div>
                </div>

                <p className="mt-2 sm:mt-3 text-gray-700 leading-relaxed text-sm sm:text-base">
                  Farmakolojiye tutkulu bir öğrenci. Bitkisel ilaçlara özel ilgisi var. Eczacılık Kulübü başkanı olarak
                  aktif etkinlikler düzenliyorum. Gelecekte klinik eczacı olmayı hedefliyorum.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
            <TabsList className="flex w-max min-w-full whitespace-nowrap mb-4 sm:mb-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-100">
              <TabsTrigger
                value="info"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm px-4 py-2"
              >
                Bilgiler
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm px-4 py-2"
              >
                Program
              </TabsTrigger>
              <TabsTrigger
                value="grades"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm px-4 py-2"
              >
                Notlar
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm px-4 py-2"
              >
                Devam
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm px-4 py-2"
              >
                Ders Notları
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm px-4 py-2"
              >
                Kayıtlar
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white text-xs sm:text-sm px-4 py-2"
              >
                Ayarlar
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800 text-base sm:text-lg">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span>Akademik Bilgiler</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Öğrenci No:</span>
                    <span className="font-medium">20210345</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">GPA:</span>
                    <span className="font-medium text-green-600">3.42</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Toplam Kredi:</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Mezuniyet Durumu:</span>
                    <span className="font-medium text-blue-600">%68 Tamamlandı</span>
                  </div>
                  <Progress value={68} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800 text-base sm:text-lg">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span>Kulüp Faaliyetleri</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Aktif Kulüp:</span>
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">Eczacılık Kulübü</Badge>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Pozisyon:</span>
                    <span className="font-medium">Başkan</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Üyelik Süresi:</span>
                    <span className="font-medium">2 Yıl</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-600">Düzenlenen Etkinlik:</span>
                    <span className="font-medium text-green-600">12</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grades">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 text-base sm:text-lg">Vize ve Final Notları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Ders</TableHead>
                        <TableHead className="text-xs sm:text-sm">Vize</TableHead>
                        <TableHead className="text-xs sm:text-sm">Final</TableHead>
                        <TableHead className="text-xs sm:text-sm">Ağırlık</TableHead>
                        <TableHead className="text-xs sm:text-sm">Gerekli</TableHead>
                        <TableHead className="text-xs sm:text-sm">Durum</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades.map((grade, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-xs sm:text-sm">{grade.course}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{grade.midterm}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{grade.final || "-"}</TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            %{grade.weight.midterm} - %{grade.weight.final}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">{grade.required || "-"}</TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            <Badge className={getStatusColor(grade.status)}>{grade.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 text-base sm:text-lg">Haftalık Ders Programı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Gün</TableHead>
                        <TableHead className="text-xs sm:text-sm">Saat</TableHead>
                        <TableHead className="text-xs sm:text-sm">Ders</TableHead>
                        <TableHead className="text-xs sm:text-sm">Derslik</TableHead>
                        <TableHead className="text-xs sm:text-sm">Öğretim Görevlisi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedule.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium text-xs sm:text-sm">{item.day}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{item.time}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{item.course}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{item.room}</TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            <Link
                              href={`/profile/instructor/${item.instructorId}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            >
                              {item.instructor}
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 text-base sm:text-lg">Devamsızlık Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  {attendance.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800 text-sm sm:text-base">{item.course}</h3>
                        <Badge className={getAttendanceColor(item.status)}>{item.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                        <span>
                          {item.attended}/{item.total} ders
                        </span>
                        <span>%{item.percentage}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 text-base sm:text-lg">Paylaştığım Ders Notları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">{note.title}</h3>
                          <div className="flex flex-wrap items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500">
                            <span>{note.course}</span>
                            <span>•</span>
                            <span>{note.type}</span>
                            <span>•</span>
                            <span>{note.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{note.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{note.views}</span>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          İndir
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 text-base sm:text-lg">Kaydettiğim Gönderiler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 sm:space-y-6">
                  {savedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-xs sm:text-sm">
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">{post.author}</p>
                            <span className="text-xs sm:text-sm text-gray-500">{post.time}</span>
                            {post.clubName && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                {post.clubName}
                              </Badge>
                            )}
                            {post.isNote && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                Ders Notu
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-700 mb-3 text-sm sm:text-base break-words">{post.content}</p>

                          {post.isNote && post.noteFile && (
                            <div className="bg-white rounded-lg p-3 mb-3 border border-green-200">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-800 text-sm sm:text-base truncate">{post.noteFile}</h4>
                                  <p className="text-xs sm:text-sm text-gray-600">Ders notu • PDF dosyası</p>
                                </div>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">
                                  İndir
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{post.comments}</span>
                            </div>
                            <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Paylaş</span>
                            </button>
                            <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors">
                              <Bookmark className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                              <span>Kayıtlı</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800 text-base sm:text-lg">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span>Hesap Ayarları</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                      <input
                        type="text"
                        defaultValue="Merve KARASAKAL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                      <input
                        type="email"
                        defaultValue="merve.karasakal@harran.edu.tr"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <input
                        type="tel"
                        defaultValue="+90 555 123 45 67"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      Değişiklikleri Kaydet
                    </Button>
                    <Button variant="outline">İptal</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800 text-base sm:text-lg">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span>Bildirim Ayarları</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">E-posta Bildirimleri</p>
                        <p className="text-xs text-gray-500">Önemli güncellemeler için e-posta al</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Push Bildirimleri</p>
                        <p className="text-xs text-gray-500">Anlık bildirimler al</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Kulüp Duyuruları</p>
                        <p className="text-xs text-gray-500">Kulüp etkinliklerinden haberdar ol</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Ders Hatırlatıcıları</p>
                        <p className="text-xs text-gray-500">Ders programı hatırlatıcıları</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800 text-base sm:text-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    <span>Hesap İşlemleri</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-red-800 mb-2">Dikkatli Olun</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Bu işlemler geri alınamaz. Hesabınızı silmeden önce tüm verilerinizi yedeklediğinizden emin olun.
                    </p>
                    <div className="flex space-x-3">
                      <Button 
                        variant="destructive" 
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => {
                          if (confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
                            // Logout işlemi
                            window.location.href = '/login'
                          }
                        }}
                      >
                        Hesabı Sil
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => {
                          if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                            // Logout işlemi
                            window.location.href = '/login'
                          }
                        }}
                      >
                        Çıkış Yap
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Alt bar ile çakışmayı önle */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}

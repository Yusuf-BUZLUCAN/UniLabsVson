"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  GraduationCap,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  FileText,
  Clock,
} from "lucide-react"
import { Navbar } from "@/components/navbar"

interface Course {
  code: string
  name: string
  credits: number
  semester: string
  students: number
}

interface Publication {
  id: number
  title: string
  journal: string
  year: number
  type: string
  citations: number
}

interface OfficeHour {
  day: string
  time: string
  location: string
}

export default function InstructorProfilePage() {
  const [activeTab, setActiveTab] = useState("info")

  const courses: Course[] = [
    { code: "ECZ301", name: "Farmakoloji I", credits: 4, semester: "Güz 2024", students: 45 },
    { code: "ECZ302", name: "Farmakoloji II", credits: 4, semester: "Bahar 2024", students: 42 },
    { code: "ECZ401", name: "Klinik Farmakoloji", credits: 3, semester: "Güz 2024", students: 38 },
    { code: "ECZ501", name: "İleri Farmakoloji", credits: 3, semester: "Güz 2024", students: 15 },
  ]

  const publications: Publication[] = [
    {
      id: 1,
      title: "Cardiovascular Effects of Novel ACE Inhibitors in Hypertensive Patients",
      journal: "Journal of Cardiovascular Pharmacology",
      year: 2024,
      type: "Araştırma Makalesi",
      citations: 23,
    },
    {
      id: 2,
      title: "Pharmacokinetic Interactions of Antidiabetic Drugs: A Comprehensive Review",
      journal: "Clinical Pharmacokinetics",
      year: 2023,
      type: "Derleme",
      citations: 45,
    },
    {
      id: 3,
      title: "Novel Approaches in Cancer Chemotherapy: Targeted Drug Delivery Systems",
      journal: "Drug Delivery and Translational Research",
      year: 2023,
      type: "Araştırma Makalesi",
      citations: 67,
    },
    {
      id: 4,
      title: "Personalized Medicine in Pharmacotherapy: Current Trends and Future Perspectives",
      journal: "Personalized Medicine",
      year: 2022,
      type: "Derleme",
      citations: 89,
    },
  ]

  const officeHours: OfficeHour[] = [
    { day: "Pazartesi", time: "14:00-16:00", location: "Eczacılık Fakültesi, Oda 205" },
    { day: "Çarşamba", time: "10:00-12:00", location: "Eczacılık Fakültesi, Oda 205" },
    { day: "Cuma", time: "13:00-15:00", location: "Eczacılık Fakültesi, Oda 205" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="h-32 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=128&fit=crop"
              alt="Academic background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24 -mt-12 ring-4 ring-white shadow-lg">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face" />
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-2xl">
                  MA
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Prof. Dr. Mehmet AK</h1>
                    <p className="text-gray-600">Farmakoloji Anabilim Dalı Başkanı</p>
                    <p className="text-sm text-gray-500">Eczacılık Fakültesi • Harran Üniversitesi</p>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 md:mt-0">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Award className="w-3 h-3 mr-1" />
                      Profesör
                    </Badge>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Mesaj Gönder
                    </Button>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 leading-relaxed">
                  Farmakoloji alanında 20 yılı aşkın deneyime sahip. Kardiyovasküler farmakoloji ve klinik farmakoloji
                  konularında uzman. 100'den fazla uluslararası yayını bulunmakta. Doktora ve yüksek lisans
                  öğrencilerine danışmanlık yapmaktadır.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger
              value="info"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Genel Bilgiler
            </TabsTrigger>
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Dersler
            </TabsTrigger>
            <TabsTrigger
              value="publications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Yayınlar
            </TabsTrigger>
            <TabsTrigger
              value="office-hours"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Ofis Saatleri
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              İletişim
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <span>Akademik Bilgiler</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Unvan:</span>
                    <span className="font-medium">Profesör Doktor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Anabilim Dalı:</span>
                    <span className="font-medium">Farmakoloji</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fakülte:</span>
                    <span className="font-medium">Eczacılık Fakültesi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deneyim:</span>
                    <span className="font-medium">22 Yıl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uzmanlık Alanı:</span>
                    <span className="font-medium">Kardiyovasküler Farmakoloji</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <Award className="w-5 h-5 text-blue-500" />
                    <span>Başarılar ve Ödüller</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam Yayın:</span>
                    <span className="font-medium text-green-600">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">H-Index:</span>
                    <span className="font-medium text-blue-600">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam Atıf:</span>
                    <span className="font-medium text-purple-600">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Danışmanlık:</span>
                    <span className="font-medium">15 Doktora, 28 Yüksek Lisans</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Verdiği Dersler</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ders Kodu</TableHead>
                      <TableHead>Ders Adı</TableHead>
                      <TableHead>Kredi</TableHead>
                      <TableHead>Dönem</TableHead>
                      <TableHead>Öğrenci Sayısı</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.semester}</TableCell>
                        <TableCell>{course.students}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Son Yayınlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publications.map((pub) => (
                    <div
                      key={pub.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 mb-2">{pub.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{pub.journal}</span>
                            </span>
                            <span>{pub.year}</span>
                            <Badge variant="secondary">{pub.type}</Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div className="font-medium">{pub.citations} atıf</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="office-hours">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Ofis Saatleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {officeHours.map((hour, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{hour.day}</h3>
                          <p className="text-sm text-gray-600">{hour.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{hour.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Not:</strong> Ofis saatleri dışında randevu almak için lütfen e-posta ile iletişime geçiniz.
                    Acil durumlar için telefon ile ulaşabilirsiniz.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">E-posta</p>
                        <p className="font-medium text-gray-800">mehmet.ak@harran.edu.tr</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Telefon</p>
                        <p className="font-medium text-gray-800">+90 414 318 3000 / 1205</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ofis</p>
                        <p className="font-medium text-gray-800">Eczacılık Fakültesi, Oda 205</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Çalışma Saatleri</p>
                        <p className="font-medium text-gray-800">Pazartesi - Cuma, 08:00 - 17:00</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ORCID ID</p>
                        <p className="font-medium text-gray-800">0000-0002-1234-5678</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

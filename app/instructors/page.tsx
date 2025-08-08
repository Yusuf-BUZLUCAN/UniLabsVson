"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, MessageCircle, GraduationCap, Award, BookOpen, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

interface Instructor {
  id: number
  name: string
  title: string
  avatar: string
  department: string
  specialization: string
  courses: string[]
  publications: number
  experience: number
  email: string
  officeHours: string
  rating: number
}

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const instructors: Instructor[] = [
    {
      id: 1,
      name: "Prof. Dr. Mehmet AK",
      title: "Profesör",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      specialization: "Farmakoloji",
      courses: ["Farmakoloji I", "Farmakoloji II", "Klinik Farmakoloji"],
      publications: 127,
      experience: 22,
      email: "mehmet.ak@harran.edu.tr",
      officeHours: "Pazartesi, Çarşamba 14:00-16:00",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Doç. Dr. Ayşe KAYA",
      title: "Doçent",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      specialization: "Biyokimya",
      courses: ["Biyokimya", "Biyokimya Lab", "Moleküler Biyoloji"],
      publications: 89,
      experience: 15,
      email: "ayse.kaya@harran.edu.tr",
      officeHours: "Salı, Perşembe 10:00-12:00",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Prof. Dr. Ali DEMİR",
      title: "Profesör",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      specialization: "Anatomi",
      courses: ["Anatomi", "Anatomi Lab", "Histoloji"],
      publications: 156,
      experience: 28,
      email: "ali.demir@harran.edu.tr",
      officeHours: "Pazartesi, Cuma 13:00-15:00",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Dr. Fatma YILMAZ",
      title: "Doktor Öğretim Üyesi",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      specialization: "Fizyoloji",
      courses: ["Fizyoloji", "Fizyoloji Lab"],
      publications: 45,
      experience: 8,
      email: "fatma.yilmaz@harran.edu.tr",
      officeHours: "Çarşamba, Cuma 14:00-16:00",
      rating: 4.4,
    },
    {
      id: 5,
      name: "Arş. Gör. Can ÖZKAN",
      title: "Araştırma Görevlisi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      specialization: "Farmakoloji",
      courses: ["Farmakoloji Lab"],
      publications: 12,
      experience: 3,
      email: "can.ozkan@harran.edu.tr",
      officeHours: "Salı, Perşembe 15:00-17:00",
      rating: 4.2,
    },
    {
      id: 6,
      name: "Dr. Zeynep ŞEN",
      title: "Doktor Öğretim Üyesi",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      specialization: "Biyokimya",
      courses: ["Biyokimya Lab", "Klinik Biyokimya"],
      publications: 34,
      experience: 6,
      email: "zeynep.sen@harran.edu.tr",
      officeHours: "Pazartesi, Çarşamba 11:00-13:00",
      rating: 4.5,
    },
    {
      id: 7,
      name: "Arş. Gör. Burak KARA",
      title: "Araştırma Görevlisi",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      specialization: "Anatomi",
      courses: ["Anatomi Lab"],
      publications: 8,
      experience: 2,
      email: "burak.kara@harran.edu.tr",
      officeHours: "Salı, Cuma 16:00-18:00",
      rating: 4.1,
    },
  ]

  const departments = ["all", "Eczacılık Fakültesi", "Tıp Fakültesi", "Mühendislik Fakültesi", "Fen Fakültesi"]

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.courses.some((course) => course.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDepartment = selectedDepartment === "all" || instructor.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const getTitleColor = (title: string) => {
    switch (title) {
      case "Profesör":
        return "bg-purple-100 text-purple-800"
      case "Doçent":
        return "bg-blue-100 text-blue-800"
      case "Doktor Öğretim Üyesi":
        return "bg-green-100 text-green-800"
      case "Araştırma Görevlisi":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Öğretim Görevlileri
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Üniversitemizdeki öğretim görevlilerini keşfedin, iletişime geçin ve akademik danışmanlık alın.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Öğretim görevlisi ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:border-blue-400 focus:outline-none"
            >
              <option value="all">Tüm Fakülteler</option>
              {departments.slice(1).map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredInstructors.map((instructor) => (
            <Card
              key={instructor.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
            >
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-3 ring-2 ring-blue-200">
                    <AvatarImage src={instructor.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-lg">
                      {instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg text-gray-800">{instructor.name}</h3>
                  <Badge className={getTitleColor(instructor.title)}>{instructor.title}</Badge>
                  <p className="text-gray-600 text-sm mt-1">{instructor.specialization}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{instructor.experience} yıl deneyim</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">{instructor.publications} yayın</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">⭐ {instructor.rating}</span>
                  </div>
                </div>

                {/* Courses */}
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Verdiği Dersler:</p>
                  <div className="flex flex-wrap gap-1">
                    {instructor.courses.slice(0, 2).map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {course}
                      </Badge>
                    ))}
                    {instructor.courses.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                        +{instructor.courses.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Office Hours */}
                <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Ofis Saatleri:</strong> {instructor.officeHours}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 mt-4">
                  <Link href={`/profile/instructor/${instructor.id}`} className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Profili Görüntüle
                    </Button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Mesaj
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="w-4 h-4 mr-1" />
                      E-posta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInstructors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Öğretim Görevlisi Bulunamadı</h3>
            <p className="text-gray-500">
              Arama kriterlerinize uygun öğretim görevlisi bulunamadı. Farklı anahtar kelimeler deneyin.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

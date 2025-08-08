"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"

interface User {
  id: number
  name: string
  avatar: string
  department: string
  year: string
  bio: string
  clubs: string[]
  stats: {
    posts: number
    followers: number
    notesShared: number
  }
  achievements: number
}

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const users: User[] = [
    {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      department: "Eczacılık Fakültesi",
      year: "3. Sınıf",
      bio: "Farmakolojiye tutkulu bir öğrenci. Eczacılık Kulübü başkanı.",
      clubs: ["Eczacılık Kulübü Başkanı"],
      stats: { posts: 45, followers: 234, notesShared: 23 },
      achievements: 3,
    },
    {
      id: 2,
      name: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      department: "Bilgisayar Mühendisliği",
      year: "4. Sınıf",
      bio: "Full-stack developer ve yapay zeka meraklısı. Yazılım Kulübü üyesi.",
      clubs: ["Yazılım Kulübü"],
      stats: { posts: 67, followers: 456, notesShared: 34 },
      achievements: 3,
    },
    {
      id: 3,
      name: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      department: "Çevre Mühendisliği",
      year: "2. Sınıf",
      bio: "Sürdürülebilir çevre için çalışan mühendislik öğrencisi.",
      clubs: ["Yeşil Kampüs Kurucusu"],
      stats: { posts: 89, followers: 345, notesShared: 19 },
      achievements: 3,
    },
    {
      id: 4,
      name: "Ali Özkan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      department: "Matematik",
      year: "1. Sınıf",
      bio: "Matematik ve satranç tutkunu genç öğrenci.",
      clubs: ["Satranç Kulübü"],
      stats: { posts: 23, followers: 123, notesShared: 12 },
      achievements: 2,
    },
    {
      id: 5,
      name: "Fatma Yıldız",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      department: "Tıp Fakültesi",
      year: "5. Sınıf",
      bio: "Tıp öğrencisi ve Tıp Kulübü başkanı. İlk yardım eğitmeni.",
      clubs: ["Tıp Kulübü Başkanı"],
      stats: { posts: 78, followers: 567, notesShared: 45 },
      achievements: 4,
    },
    {
      id: 6,
      name: "Burak Şen",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      department: "Müzik Bölümü",
      year: "2. Sınıf",
      bio: "Müzisyen ve Müzik Kulübü üyesi. Piyano ve gitar çalıyor.",
      clubs: ["Müzik Kulübü"],
      stats: { posts: 34, followers: 234, notesShared: 8 },
      achievements: 2,
    },
    {
      id: 7,
      name: "Selin Kara",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      department: "Güzel Sanatlar",
      year: "3. Sınıf",
      bio: "Fotoğrafçı ve Fotoğrafçılık Kulübü başkanı.",
      clubs: ["Fotoğrafçılık Kulübü Başkanı"],
      stats: { posts: 56, followers: 345, notesShared: 15 },
      achievements: 3,
    },
    {
      id: 8,
      name: "Emre Yılmaz",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      department: "İşletme",
      year: "4. Sınıf",
      bio: "Girişimci ve Girişimcilik Kulübü başkanı.",
      clubs: ["Girişimcilik Kulübü Başkanı"],
      stats: { posts: 43, followers: 289, notesShared: 21 },
      achievements: 3,
    },
  ]

  const departments = [
    "all",
    "Eczacılık Fakültesi",
    "Bilgisayar Mühendisliği",
    "Çevre Mühendisliği",
    "Matematik",
    "Tıp Fakültesi",
    "Müzik Bölümü",
    "Güzel Sanatlar",
    "İşletme",
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Öğrenci Topluluğu
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Üniversitemizdeki aktif öğrencileri keşfedin, yeni arkadaşlıklar kurun ve ortak ilgi alanlarınızı paylaşın.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="İsim veya bölüm ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-64">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "Tüm Bölümler" : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.department}</p>
                    <p className="text-gray-500 text-xs">{user.year}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{user.bio}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {user.clubs.map((club, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {club}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                  <div>
                    <div className="font-bold text-gray-800">{user.stats.posts}</div>
                    <div className="text-gray-500">Gönderi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{user.stats.followers}</div>
                    <div className="text-gray-500">Takipçi</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{user.stats.notesShared}</div>
                    <div className="text-gray-500">Not</div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium">
                    Profili Gör
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Arama kriterlerinize uygun öğrenci bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}

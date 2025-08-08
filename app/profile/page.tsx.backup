"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Calendar, MapPin, Mail, Phone, Users, BookOpen, Award, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"

const user = {
  name: "Merve KARASAKAL",
  username: "mervekrskl",
  bio: "Gelecek vadeden bir yazılımcı. Yeni teknolojilere meraklı ve sürekli öğrenme çabasında.",
  location: "İstanbul, Türkiye",
  website: "https://mervekarasakal.com",
  email: "merve.karasakal@example.com",
  phone: "+90 555 555 55 55",
  birthDate: "1995-01-01",
  joinDate: "2020-01-01",
  followers: 1500,
  following: 750,
  courses: 25,
  achievements: 12,
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />
      <div className="container py-10">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/images/merve-profile.jpg" alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-semibold">{user.name}</h1>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-gray-700">{user.bio}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(user.birthDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                      {user.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>
                      {user.followers} Takipçi - {user.following} Takip Edilen
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span>{user.courses} Ders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span>{user.achievements} Başarı</span>
                  </div>
                </div>
              </div>

              <div>
                {/* Edit Profile Button - Only show for own profile */}
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Profili Düzenle
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="posts" className="data-[state=active]:bg-blue-100">
              Gönderiler
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-blue-100">
              Ders Notları
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:bg-blue-100">
              Kaydedilenler
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="space-y-4">
            <p>Gönderiler içerikleri burada olacak.</p>
          </TabsContent>
          <TabsContent value="notes" className="space-y-4">
            <p>Ders notları içerikleri burada olacak.</p>
          </TabsContent>
          <TabsContent value="saved" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white fill-current" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Makine Öğrenmesi Temelleri</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Yapay zeka ve makine öğrenmesi algoritmalarına giriş...
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Ahmet Yılmaz tarafından paylaşıldı</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white fill-current" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">Veri Yapıları Özet</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Stack, Queue, Tree ve Graph yapıları detaylı açıklama...
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Elif Demir tarafından paylaşıldı</span>
                      </div>
                    </div>
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

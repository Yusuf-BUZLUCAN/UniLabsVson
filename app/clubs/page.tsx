"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Users, Calendar, Star, Search, Filter } from "lucide-react"
import { Navbar } from "@/components/navbar"

interface Club {
  id: number
  name: string
  description: string
  members: number
  image: string
  category: string
  president: string
  rating: number
  events: number
  isJoined?: boolean
}

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [joinForm, setJoinForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    experience: "",
  })

  const clubs: Club[] = [
    {
      id: 1,
      name: "Eczacılık Kulübü",
      description:
        "Eczacılık alanında bilimsel etkinlikler, seminerler ve sosyal aktiviteler düzenliyoruz. Bitkisel ilaçlar, farmakoloji ve klinik eczacılık konularında uzmanlaşma fırsatı.",
      members: 156,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop",
      category: "Akademik",
      president: "Ayşe Yılmaz",
      rating: 4.8,
      events: 24,
      isJoined: true,
    },
    {
      id: 2,
      name: "Yazılım Kulübü",
      description:
        "Programlama, web geliştirme, mobil uygulama ve yapay zeka projelerinde çalışıyoruz. Hackathon'lar ve teknik workshoplar düzenliyoruz.",
      members: 234,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=200&fit=crop",
      category: "Teknoloji",
      president: "Yusuf BUZLUCAN",
      rating: 4.9,
      events: 18,
    },
    {
      id: 3,
      name: "Yeşil Kampüs",
      description:
        "Çevre bilinci oluşturmak, sürdürülebilirlik projeleri geliştirmek ve doğa koruma faaliyetleri yürütmek için bir araya geliyoruz.",
      members: 189,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop",
      category: "Çevre",
      president: "Zeynep Demir",
      rating: 4.7,
      events: 32,
    },
    {
      id: 4,
      name: "Satranç Kulübü",
      description:
        "Satranç turnuvaları, eğitim seansları ve strateji geliştirme çalışmaları yapıyoruz. Her seviyeden oyuncuya açığız.",
      members: 78,
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
      category: "Spor",
      president: "Ali Özkan",
      rating: 4.5,
      events: 15,
    },
    {
      id: 5,
      name: "Tıp Kulübü",
      description:
        "Tıp öğrencileri için bilimsel konferanslar, hasta ziyaretleri ve sağlık taramaları organize ediyoruz. İlk yardım eğitimleri veriyoruz.",
      members: 298,
      image: "/images/tip-kulubu-kapak.jpg",
      category: "Akademik",
      president: "Fatma Yıldız",
      rating: 4.9,
      events: 28,
    },
    {
      id: 6,
      name: "Müzik Kulübü",
      description:
        "Müzik severlerin buluşma noktası. Konserler, müzik workshopları ve enstrüman eğitimleri düzenliyoruz.",
      members: 145,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
      category: "Sanat",
      president: "Burak Şen",
      rating: 4.6,
      events: 21,
    },
    {
      id: 7,
      name: "Fotoğrafçılık Kulübü",
      description: "Fotoğraf tutkunları için teknik eğitimler, fotoğraf gezileri ve sergi organizasyonları yapıyoruz.",
      members: 92,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop",
      category: "Sanat",
      president: "Selin Kara",
      rating: 4.4,
      events: 19,
    },
    {
      id: 8,
      name: "Girişimcilik Kulübü",
      description:
        "Startup fikirlerini hayata geçirmek, iş planları geliştirmek ve girişimcilik ekosistemi oluşturmak için çalışıyoruz.",
      members: 167,
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=200&fit=crop",
      category: "İş",
      president: "Emre Yılmaz",
      rating: 4.7,
      events: 16,
    },
    {
      id: 9,
      name: "Robotik Kulübü",
      description:
        "Robot tasarımı, Arduino ve Raspberry Pi projeleri, otomasyon sistemleri geliştiriyoruz. Ulusal robotik yarışmalara katılıyoruz.",
      members: 87,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
      category: "Teknoloji",
      president: "Ahmet Kılıç",
      rating: 4.6,
      events: 12,
    },
    {
      id: 10,
      name: "Tiyatro Kulübü",
      description:
        "Oyunculuk eğitimleri, tiyatro oyunları ve performans sanatları üzerine çalışıyoruz. Yılda 3-4 oyun sahneliyoruz.",
      members: 124,
      image: "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=300&h=200&fit=crop",
      category: "Sanat",
      president: "Elif Arslan",
      rating: 4.5,
      events: 22,
    },
    {
      id: 11,
      name: "Hukuk Kulübü",
      description:
        "Hukuki seminerler, moot court yarışmaları ve adalet sistemi üzerine tartışmalar düzenliyoruz. Staj imkanları sağlıyoruz.",
      members: 203,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
      category: "Akademik",
      president: "Murat Özdemir",
      rating: 4.7,
      events: 26,
    },
    {
      id: 12,
      name: "Gastronomi Kulübü",
      description:
        "Yemek pişirme workshopları, mutfak kültürleri keşfi ve gastronomi etkinlikleri organize ediyoruz. Şef eğitimleri veriyoruz.",
      members: 156,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
      category: "Sosyal",
      president: "Aylin Çelik",
      rating: 4.8,
      events: 30,
    },
    {
      id: 13,
      name: "Basketbol Kulübü",
      description:
        "Basketbol antrenmanları, turnuvalar ve spor etkinlikleri düzenliyoruz. Üniversiteler arası maçlara katılıyoruz.",
      members: 89,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop",
      category: "Spor",
      president: "Kerem Yıldırım",
      rating: 4.4,
      events: 18,
    },
    {
      id: 14,
      name: "Psikoloji Kulübü",
      description:
        "Psikoloji alanında seminerler, grup terapileri ve farkındalık etkinlikleri düzenliyoruz. Ruh sağlığı konularında bilinçlendirme yapıyoruz.",
      members: 178,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
      category: "Akademik",
      president: "Seda Kaya",
      rating: 4.9,
      events: 24,
    },
    {
      id: 15,
      name: "Gönüllülük Kulübü",
      description:
        "Sosyal sorumluluk projeleri, yardım kampanyaları ve toplum hizmeti faaliyetleri organize ediyoruz. Hayırseverlik projelerinde yer alıyoruz.",
      members: 267,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop",
      category: "Sosyal",
      president: "Deniz Aktaş",
      rating: 4.8,
      events: 35,
    },
  ]

  const categories = ["all", "Akademik", "Teknoloji", "Çevre", "Spor", "Sanat", "İş", "Sosyal"]

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.president.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || club.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleJoinClub = (clubName: string) => {
    alert(`${clubName} kulübüne başvurunuz alındı! En kısa sürede size dönüş yapılacaktır.`)
    setJoinForm({ name: "", email: "", phone: "", reason: "", experience: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            Üniversite Kulüpleri
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            İlgi alanlarınıza uygun kulüpleri keşfedin, yeni arkadaşlıklar kurun ve üniversite hayatınızı renklendirin.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Kulüp ara..."
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
              className="px-4 py-2 rounded-lg border border-blue-200 bg-white/80 backdrop-blur-sm focus:border-blue-400 focus:outline-none"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.slice(1).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <Card
              key={club.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
            >
              <div className="relative">
                <img
                  src={club.image || "/placeholder.svg"}
                  alt={club.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">{club.category}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{club.rating}</span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-gray-800">{club.name}</CardTitle>
                  {club.isJoined && <Badge className="bg-green-100 text-green-800">Üyesin</Badge>}
                </div>
                <p className="text-sm text-gray-600">Başkan: {club.president}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">{club.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{club.members} üye</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{club.events} etkinlik</span>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-full ${
                        club.isJoined
                          ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      }`}
                      disabled={club.isJoined}
                    >
                      {club.isJoined ? "Zaten Üyesin" : "Kulübe Katıl"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        {club.name} - Üyelik Başvurusu
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
                        onClick={() => handleJoinClub(club.name)}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        Başvuru Gönder
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Kulüp Bulunamadı</h3>
            <p className="text-gray-500">
              Arama kriterlerinize uygun kulüp bulunamadı. Farklı anahtar kelimeler deneyin.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Activity,
  Bell,
  Users,
  ShoppingBag,
  MessageCircle,
  Search,
  Settings,
  User,
  Star,
  Building2,
  GraduationCap,
  Home,
  Heart,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser"

interface Notification {
  id: number
  type: string
  message: string
  time: string
  read: boolean
}

interface SearchResult {
  id: number
  name: string
  avatar: string
  department?: string
  year?: string
  type: "user" | "club" | "instructor"
  category?: string
  members?: number
  rating?: number
  title?: string
  specialization?: string
}

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "like",
      message: "Yusuf BUZLUCAN gönderinizi beğendi",
      time: "5 dakika önce",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      message: "Zeynep Demir gönderinize yorum yaptı",
      time: "1 saat önce",
      read: false,
    },
    {
      id: 3,
      type: "club",
      message: "Yazılım Kulübü etkinlik duyurusu",
      time: "2 saat önce",
      read: true,
    },
    {
      id: 4,
      type: "friend",
      message: "Ali Özkan arkadaşlık isteği gönderdi",
      time: "1 gün önce",
      read: false,
    },
  ])

  const mockUsers: SearchResult[] = [
    {
      id: 1,
      name: "Merve KARASAKAL",
      avatar: "/images/merve-profile.jpg",
      department: "Eczacılık",
      year: "3. Sınıf",
      type: "user",
    },
    {
      id: 2,
      name: "Yusuf BUZLUCAN",
      avatar: "/images/yusuf-profile.jpg",
      department: "Bilgisayar Mühendisliği",
      year: "4. Sınıf",
      type: "user",
    },
    {
      id: 3,
      name: "Zeynep Demir",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      department: "Çevre Mühendisliği",
      year: "2. Sınıf",
      type: "user",
    },
    {
      id: 4,
      name: "Ali Özkan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      department: "Matematik",
      year: "1. Sınıf",
      type: "user",
    },
  ]

  const mockClubs: SearchResult[] = [
    {
      id: 1,
      name: "Eczacılık Kulübü",
      avatar: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=40&h=40&fit=crop",
      category: "Akademik",
      members: 156,
      rating: 4.8,
      type: "club",
    },
    {
      id: 2,
      name: "Yazılım Kulübü",
      avatar: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=40&h=40&fit=crop",
      category: "Teknoloji",
      members: 234,
      rating: 4.9,
      type: "club",
    },
    {
      id: 3,
      name: "Yeşil Kampüs",
      avatar: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=40&h=40&fit=crop",
      category: "Çevre",
      members: 189,
      rating: 4.7,
      type: "club",
    },
    {
      id: 4,
      name: "Satranç Kulübü",
      avatar: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=40&h=40&fit=crop",
      category: "Spor",
      members: 78,
      rating: 4.5,
      type: "club",
    },
  ]

  const mockInstructors: SearchResult[] = [
    {
      id: 1,
      name: "Prof. Dr. Mehmet AK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      title: "Profesör",
      specialization: "Farmakoloji",
      type: "instructor",
    },
    {
      id: 2,
      name: "Doç. Dr. Ayşe KAYA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      title: "Doçent",
      specialization: "Biyokimya",
      type: "instructor",
    },
    {
      id: 3,
      name: "Prof. Dr. Ali DEMİR",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      department: "Eczacılık Fakültesi",
      title: "Profesör",
      specialization: "Anatomi",
      type: "instructor",
    },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filteredUsers = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.department?.toLowerCase().includes(query.toLowerCase()),
      )
      const filteredClubs = mockClubs.filter(
        (club) =>
          club.name.toLowerCase().includes(query.toLowerCase()) ||
          club.category?.toLowerCase().includes(query.toLowerCase()),
      )
      const filteredInstructors = mockInstructors.filter(
        (instructor) =>
          instructor.name.toLowerCase().includes(query.toLowerCase()) ||
          instructor.specialization?.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults([...filteredUsers, ...filteredClubs, ...filteredInstructors])
    } else {
      setSearchResults([])
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [userSubtext, setUserSubtext] = useState<string>("")
  const [avatarUrl, setAvatarUrl] = useState<string>("")

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    const load = async () => {
      const { data } = await supabase.auth.getSession()
      const session = data.session
      const user = session?.user
      setIsLoggedIn(Boolean(user))
      if (user) {
        const firstName = (user.user_metadata as any)?.firstName || ""
        const lastName = (user.user_metadata as any)?.lastName || ""
        const department = (user.user_metadata as any)?.department || ""
        const year = (user.user_metadata as any)?.year || ""
        setUserName(`${firstName} ${lastName}`.trim() || user.email || "Kullanıcı")
        setUserSubtext([department, year].filter(Boolean).join(" • "))
        setAvatarUrl((user.user_metadata as any)?.avatar_url || "")
      }
    }
    load()

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load()
    })
    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const getSearchResultLink = (result: SearchResult) => {
    switch (result.type) {
      case "user":
        return `/profile/${result.id}`
      case "club":
        return `/clubs/${result.id}`
      case "instructor":
        return `/profile/instructor/${result.id}`
      default:
        return "/"
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`sticky top-0 z-50 border-b border-slate-200 shadow-sm transition-all duration-300 hidden lg:block ${
        isScrolled 
          ? "bg-white/60 backdrop-blur-md shadow-lg" 
          : "bg-white/80 backdrop-blur-sm shadow-sm"
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                UniLabs.
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <Activity className="w-5 h-5" />
                <span>Akış</span>
              </Link>
              <Link
                href="/announcements"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span>Duyurular</span>
              </Link>
              <Link
                href="/clubs"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Kulüpler</span>
              </Link>
              <Link
                href="/instructors"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Hocalar</span>
              </Link>
              <Link
                href="/club-management"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                <span>Kulüp Yönetimi</span>
              </Link>
              <Link
                href="/store"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Mağaza</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Sohbet</span>
              </Link>
            </div>

            {/* Desktop Search, Notifications, Profile */}
            <div className="flex items-center space-x-4">
              {/* Search - sadece giriş yapmış kullanıcılar için */}
              {isLoggedIn && (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Ara..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 w-64 bg-gray-50 border-gray-200 focus:border-blue-300"
                      />
                    </div>
                  </PopoverTrigger>
                  {searchResults.length > 0 && (
                    <PopoverContent className="w-80 p-2">
                      <div className="space-y-2">
                        {searchResults.map((result) => (
                          <Link
                            key={`${result.type}-${result.id}`}
                            href={getSearchResultLink(result)}
                            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={result.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                                {result.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-gray-800">{result.name}</p>
                                {result.type === "club" && (
                                  <Badge variant="secondary" className="text-xs">
                                    Kulüp
                                  </Badge>
                                )}
                                {result.type === "instructor" && (
                                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                    Hoca
                                  </Badge>
                                )}
                              </div>
                              {result.type === "user" ? (
                                <p className="text-sm text-gray-500">
                                  {result.department} - {result.year}
                                </p>
                              ) : result.type === "club" ? (
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <span>{result.category}</span>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Users className="w-3 h-3" />
                                    <span>{result.members}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span>{result.rating}</span>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <span>{result.title}</span>
                                  <span>•</span>
                                  <span>{result.specialization}</span>
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </PopoverContent>
                  )}
                </Popover>
              )}

              {isLoggedIn ? (
                <>
                  {/* Chat/DM */}
                  <Link href="/chat">
                    <Button variant="ghost" size="sm" className="relative">
                      <MessageCircle className="w-5 h-5" />
                    </Button>
                  </Link>

                  {/* Notifications */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 mr-6">
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-800">Bildirimler</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => {
                          let borderColor = "";
                          let icon = null;
                          if (notification.type === "like") {
                            borderColor = "border-pink-500";
                            icon = <span className="mr-2 text-pink-500">❤</span>;
                          } else if (notification.type === "comment") {
                            borderColor = "border-blue-500";
                            icon = <span className="mr-2 text-blue-500">💬</span>;
                          } else if (notification.type === "club") {
                            borderColor = "border-green-500";
                            icon = <span className="mr-2 text-green-500">🎉</span>;
                          } else if (notification.type === "friend") {
                            borderColor = "border-yellow-500";
                            icon = <span className="mr-2 text-yellow-500">👤</span>;
                          }

                          return (
                            <div
                              key={notification.id}
                              className={`p-3 border-l-4 ${borderColor} ${
                                !notification.read ? "bg-blue-50" : "bg-white"
                              } hover:bg-gray-50 transition-colors cursor-pointer`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">{icon}</div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-800">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Profile Menu */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={avatarUrl || "/placeholder-user.jpg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-sm">
                            {userName
                              ? userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0 mr-6">
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={avatarUrl || "/placeholder-user.jpg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                              {userName
                                ? userName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-800">{userName || "Kullanıcı"}</p>
                            {userSubtext && <p className="text-sm text-gray-500">{userSubtext}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link href="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <User className="w-4 h-4" />
                          <span>Profil</span>
                        </Link>
                        <Link href="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Ayarlar</span>
                        </Link>
                        <button
                          onClick={async () => {
                            const supabase = getSupabaseBrowserClient()
                            await supabase.auth.signOut()
                            router.push("/login")
                          }}
                          className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-700"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      Kaydol
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar - Instagram Style */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around py-2">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              isActive("/") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <Home className={`w-6 h-6 ${isActive("/") ? "text-blue-600" : "text-gray-600"}`} />
            <span className="text-xs font-medium">Ana Sayfa</span>
          </Link>

          {/* Search */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors text-gray-600"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Ara</span>
          </button>

          {/* Clubs */}
          <Link
            href="/clubs"
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              isActive("/clubs") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <Users className={`w-6 h-6 ${isActive("/clubs") ? "text-blue-600" : "text-gray-600"}`} />
            <span className="text-xs font-medium">Kulüpler</span>
          </Link>

          {/* Store */}
          <Link
            href="/store"
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              isActive("/store") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <ShoppingBag className={`w-6 h-6 ${isActive("/store") ? "text-blue-600" : "text-gray-600"}`} />
            <span className="text-xs font-medium">Mağaza</span>
          </Link>

          {/* Club Management */}
          <Link
            href="/club-management"
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              isActive("/club-management") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <Building2 className={`w-6 h-6 ${isActive("/club-management") ? "text-blue-600" : "text-gray-600"}`} />
            <span className="text-xs font-medium">Yönetim</span>
          </Link>

          {/* Profile */}
          <Link
            href="/profile"
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
              isActive("/profile") ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <User className={`w-6 h-6 ${isActive("/profile") ? "text-blue-600" : "text-gray-600"}`} />
            <span className="text-xs font-medium">Profil</span>
          </Link>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && isLoggedIn && (
          <div className="border-t border-gray-100 bg-white">
            <div className="p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-full bg-gray-50 border-gray-200 focus:border-blue-300"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {searchResults.map((result) => (
                      <Link
                        key={`${result.type}-${result.id}`}
                        href={getSearchResultLink(result)}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileSearchOpen(false)}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={result.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                            {result.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-800 truncate">{result.name}</p>
                            {result.type === "club" && (
                              <Badge variant="secondary" className="text-xs flex-shrink-0">
                                Kulüp
                              </Badge>
                            )}
                            {result.type === "instructor" && (
                              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 flex-shrink-0">
                                Hoca
                              </Badge>
                            )}
                          </div>
                          {result.type === "user" ? (
                            <p className="text-sm text-gray-500 truncate">
                              {result.department} - {result.year}
                            </p>
                          ) : result.type === "club" ? (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span className="truncate">{result.category}</span>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{result.members}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span>{result.rating}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span className="truncate">{result.title}</span>
                              <span>•</span>
                              <span className="truncate">{result.specialization}</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Top Bar - Logo, Chat, and Notifications */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              UniLabs.
            </span>
          </Link>

          {/* Chat and Notifications */}
          {isLoggedIn && (
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-800">Bildirimler</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => {
                      let borderColor = "";
                      let icon = null;
                      if (notification.type === "like") {
                        borderColor = "border-pink-500";
                        icon = <span className="mr-2 text-pink-500">❤</span>;
                      } else if (notification.type === "comment") {
                        borderColor = "border-blue-500";
                        icon = <span className="mr-2 text-blue-500">💬</span>;
                      } else if (notification.type === "club") {
                        borderColor = "border-green-500";
                        icon = <span className="mr-2 text-green-500">🎉</span>;
                      } else if (notification.type === "friend") {
                        borderColor = "border-yellow-500";
                        icon = <span className="mr-2 text-yellow-500">👤</span>;
                      }

                      return (
                        <div
                          key={notification.id}
                          className={`p-3 border-l-4 ${borderColor} ${
                            !notification.read ? "bg-blue-50" : "bg-white"
                          } hover:bg-gray-50 transition-colors cursor-pointer`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">{icon}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>

              {/* Chat/DM */}
              <Link href="/chat">
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom padding for mobile to account for bottom navigation */}
      <div className="lg:hidden h-20"></div>
    </>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Users, UserPlus, MessageCircle, Hash, Mic, MicOff, Volume2, Send, Menu, X, Search } from "lucide-react"

const mockUsers: Record<string, { name: string; avatar: string; department: string; year: string; online: boolean; lastSeen?: string }> = {
  merve: { name: "Merve KARASAKAL", avatar: "/images/merve-profile.jpg", department: "Eczacılık", year: "3. Sınıf", online: true },
  yusuf: { name: "Yusuf BUZLUCAN", avatar: "/images/yusuf-profile.jpg", department: "Bilgisayar Mühendisliği", year: "4. Sınıf", online: true },
  ali: { name: "Ali Özkan", avatar: "/placeholder.svg", department: "Matematik", year: "1. Sınıf", online: false, lastSeen: "2 saat önce" },
  zeynep: { name: "Zeynep Demir", avatar: "/placeholder.svg", department: "Çevre Mühendisliği", year: "2. Sınıf", online: true },
  fatma: { name: "Fatma Yıldız", avatar: "/placeholder.svg", department: "Eczacılık", year: "3. Sınıf", online: false, lastSeen: "1 gün önce" },
  can: { name: "Can Yılmaz", avatar: "/placeholder.svg", department: "Biyokimya", year: "2. Sınıf", online: true },
  ayse: { name: "Ayşe T.", avatar: "/placeholder.svg", department: "Eczacılık", year: "3. Sınıf", online: false, lastSeen: "30 dakika önce" },
  burak: { name: "Burak Kara", avatar: "/placeholder.svg", department: "Bilgisayar Mühendisliği", year: "4. Sınıf", online: true },
  mehmet: { name: "Mehmet Ak", avatar: "/placeholder.svg", department: "Eczacılık", year: "3. Sınıf", online: false, lastSeen: "5 saat önce" },
  elif: { name: "Elif Şen", avatar: "/placeholder.svg", department: "Çevre Mühendisliği", year: "2. Sınıf", online: true },
}

interface MessageType {
  userId: string;
  text: string;
  time: string;
  type?: string;
}

const mockMessages: Record<string, MessageType[]> = {
  "yusuf": [
    { userId: "yusuf", text: "Merhaba Merve! Yarınki farmakoloji sınavı için kimya notlarını paylaşabilir misin?", time: "09:15" },
    { userId: "merve", text: "Elbette Yusuf! Hemen gönderiyorum.", time: "09:16", type: "sent" },
    { userId: "yusuf", text: "Çok teşekkürler!", time: "09:17" },
  ],
  "zeynep": [
    { userId: "zeynep", text: "Yeşil Kampüs projesi için toplantı yapalım mı?", time: "Dün 18:30" },
    { userId: "merve", text: "Tabii ki! Ne zaman uygun?", time: "Dün 18:32", type: "sent" },
  ],
  "can": [
    { userId: "can", text: "Biyokimya dersi için yardım edebilir misin?", time: "2 saat önce" },
    { userId: "merve", text: "Elbette! Hangi konuda?", time: "2 saat önce", type: "sent" },
  ],
}

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<MessageType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (activeChat && mockMessages[activeChat]) {
      setMessages(mockMessages[activeChat])
    } else {
      setMessages([])
    }
  }, [activeChat])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim() || !activeChat) return
    
    const newMsg: MessageType = { 
      userId: "merve", 
      text: message, 
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), 
      type: "sent" 
    }
    
    setMessages((msgs) => [...msgs, newMsg])
    setMessage("")
  }

  const handleChatSelect = (userId: string) => {
    setActiveChat(userId)
    setSidebarOpen(false) // Mobilde sidebar'ı kapat
  }

  const filteredUsers = Object.entries(mockUsers).filter(([id, user]) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-6xl h-[95vh] max-h-[900px] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Sidebar - Friends List */}
          <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 absolute lg:relative z-40 w-80 lg:w-1/3 lg:max-w-xs bg-slate-50 border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out h-full`}>
            <div className="p-6 border-b border-slate-200">
              <h1 className="text-2xl font-bold text-slate-800">Sohbetler</h1>
              <p className="text-sm text-slate-600 mt-1">Arkadaşlarınızla sohbet edin</p>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Arkadaş ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Friends List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <nav className="p-4 space-y-2">
                {filteredUsers.map(([userId, user]) => (
                  <button
                    key={userId}
                    onClick={() => handleChatSelect(userId)}
                    className={`w-full flex items-center p-3 rounded-xl hover:bg-slate-100 transition-colors ${
                      activeChat === userId ? "bg-blue-100 text-blue-800" : ""
                    }`}
                  >
                    <div className="relative">
                      <img 
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0" 
                        src={user.avatar} 
                        alt={user.name} 
                      />
                      {user.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden min-w-0 ml-3 text-left">
                      <h3 className="font-semibold truncate">{user.name}</h3>
                      <p className="text-sm text-slate-500 truncate">
                        {user.online ? "Çevrimiçi" : user.lastSeen || "Çevrimdışı"}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.department} - {user.year}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Current User */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center">
                <div className="relative">
                  <img className="w-10 h-10 rounded-full object-cover flex-shrink-0" src="/images/merve-profile.jpg" alt="Merve KARASAKAL" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="ml-3 min-w-0 flex-1">
                  <h4 className="font-semibold text-slate-800 truncate">Merve KARASAKAL</h4>
                  <p className="text-sm text-slate-500">Çevrimiçi</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {activeChat ? (
              <main className="flex-1 flex flex-col bg-white">
                <header className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="relative">
                      <img 
                        className="w-10 h-10 rounded-full object-cover" 
                        src={mockUsers[activeChat].avatar} 
                        alt={mockUsers[activeChat].name} 
                      />
                      {mockUsers[activeChat].online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="ml-3 min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-bold text-slate-800 truncate">{mockUsers[activeChat].name}</h2>
                      <p className="text-sm text-slate-500 truncate">
                        {mockUsers[activeChat].online ? "Çevrimiçi" : mockUsers[activeChat].lastSeen || "Çevrimdışı"}
                      </p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 ml-2 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </header>

                <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto custom-scrollbar" style={{ minHeight: 0, maxHeight: 'calc(100vh - 200px)' }}>
                  {messages.map((msg, i) => {
                    const user = mockUsers[msg.userId]
                    const isSent = msg.type === "sent"
                    return (
                      <div key={i} className={`flex items-start gap-3 sm:gap-4 ${isSent ? "justify-end" : ""}`}>
                        {!isSent && (
                          <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer user-avatar flex-shrink-0" src={user.avatar} alt={user.name} />
                        )}
                        <div className={`flex flex-col ${isSent ? "items-end" : "items-start"} min-w-0 flex-1`}>
                          <span className="text-sm font-semibold text-slate-700 mb-1">{isSent ? "Siz" : user.name}</span>
                          <div className={`${isSent ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-800"} p-3 sm:p-4 rounded-2xl ${isSent ? "rounded-br-none" : "rounded-tl-none"} max-w-xs sm:max-w-md shadow-sm break-words`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <span className="text-xs text-slate-400 mt-1">{msg.time}</span>
                        </div>
                        {isSent && (
                          <img className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover cursor-pointer user-avatar flex-shrink-0" src="/images/merve-profile.jpg" alt="Siz" />
                        )}
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="p-4 sm:p-6 border-t border-slate-200 flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      className="flex-1 px-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </main>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-center px-4">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-6 mb-4 animate-bounce-slow">
                    <MessageCircle className="w-16 h-16 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">Henüz sohbet başlatmadın</h3>
                  <p className="text-slate-600 mb-6">Arkadaşlarından birini seçerek mesajlaşmaya başlayabilirsin.<br/>Dilersen yeni arkadaşlarını da davet edebilirsin!</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold shadow hover:from-blue-600 hover:to-cyan-600 transition">Arkadaş Davet Et</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

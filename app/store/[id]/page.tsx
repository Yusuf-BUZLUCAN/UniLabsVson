"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, use } from "react"
import { Star, Heart, ShoppingCart, Share2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const products = [
  {
    id: 1,
    name: "Harvard University Sweatshirt",
    price: 299,
    originalPrice: 399,
    image: "/images/harvard-sweatshirt.jpg",
    rating: 4.8,
    reviews: 124,
    seller: "Harvard Official Store",
    category: "sweatshirt",
    discount: 25,
    description:
      "Harvard Üniversitesi'nin resmi ve lisanslı sweatshirt'ü. Yumuşak pamuklu kumaş, modern kesim ve dayanıklı baskı.",
    features: [
      "%100 Pamuk",
      "Unisex kesim",
      "Makinede yıkanabilir",
      "Resmi lisanslı ürün",
    ],
    comments: [
      {
        user: "Merve K.",
        rating: 5,
        text: "Çok kaliteli ve rahat, tavsiye ederim!",
      },
      {
        user: "Yusuf B.",
        rating: 4,
        text: "Beden tam oldu, kumaşı güzel.",
      },
    ],
  },
  {
    id: 2,
    name: "Chicago Illinois T-Shirt",
    price: 149,
    image: "/images/chicago-tshirt.jpg",
    rating: 4.6,
    reviews: 89,
    seller: "University Apparel Co.",
    category: "tshirt",
    description: "Chicago Üniversitesi'nin pamuklu t-shirt'ü. Hafif ve nefes alabilir.",
    features: ["%100 Pamuk", "Unisex", "Makinede yıkanabilir"],
    comments: [
      { user: "Ayşe T.", rating: 5, text: "Çok rahat ve şık!" },
    ],
  },
  {
    id: 3,
    name: "Yale University Sweatshirt",
    price: 279,
    originalPrice: 349,
    image: "/images/yale-sweatshirt.jpg",
    rating: 4.9,
    reviews: 156,
    seller: "Yale Bookstore",
    category: "sweatshirt",
    discount: 20,
    description: "Yale Üniversitesi'nin klasik sweatshirt'ü. Sıcak tutar, yumuşak kumaş.",
    features: ["%100 Pamuk", "Unisex", "Makinede yıkanabilir"],
    comments: [
      { user: "Ali V.", rating: 5, text: "Çok kaliteli!" },
    ],
  },
  {
    id: 4,
    name: "Notre Dame Fighting Irish Sweatshirt",
    price: 259,
    image: "/images/notre-dame-sweatshirt.jpg",
    rating: 4.7,
    reviews: 78,
    seller: "Notre Dame Shop",
    category: "sweatshirt",
    description: "Notre Dame logolu sweatshirt. Spor ve günlük kullanım için ideal.",
    features: ["%100 Pamuk", "Unisex", "Makinede yıkanabilir"],
    comments: [],
  },
  {
    id: 5,
    name: "Oxford University Hoodie - Grey",
    price: 329,
    originalPrice: 429,
    image: "/images/oxford-hoodie-grey.jpg",
    rating: 4.8,
    reviews: 203,
    seller: "Oxford Official",
    category: "hoodie",
    discount: 23,
    description: "Oxford Üniversitesi'nin gri hoodie modeli. Modern ve rahat kesim.",
    features: ["%80 Pamuk, %20 Polyester", "Unisex", "Makinede yıkanabilir"],
    comments: [
      { user: "Zeynep D.", rating: 5, text: "Çok beğendim!" },
    ],
  },
  {
    id: 6,
    name: "Oxford University Hoodie - Navy",
    price: 329,
    image: "/images/oxford-hoodie-navy.jpg",
    rating: 4.8,
    reviews: 167,
    seller: "Oxford Official",
    category: "hoodie",
    description: "Oxford Üniversitesi'nin lacivert hoodie modeli.",
    features: ["%80 Pamuk, %20 Polyester", "Unisex", "Makinede yıkanabilir"],
    comments: [],
  },
  {
    id: 7,
    name: "Cambridge University Sweatshirt",
    price: 289,
    image: "/images/cambridge-sweatshirt.jpg",
    rating: 4.7,
    reviews: 134,
    seller: "Cambridge Store",
    category: "sweatshirt",
    description: "Cambridge Üniversitesi'nin klasik sweatshirt'ü.",
    features: ["%100 Pamuk", "Unisex", "Makinede yıkanabilir"],
    comments: [],
  },
  {
    id: 8,
    name: "Michigan Wolverines Sweatshirt Set",
    price: 399,
    originalPrice: 499,
    image: "/images/michigan-sweatshirts.jpg",
    rating: 4.9,
    reviews: 245,
    seller: "University of Michigan",
    category: "sweatshirt",
    discount: 20,
    description: "Michigan Wolverines seti. Takım ruhunu yansıt!",
    features: ["%100 Pamuk", "Unisex", "Makinede yıkanabilir"],
    comments: [],
  },
  {
    id: 9,
    name: "Yale University T-Shirt - Vintage",
    price: 179,
    image: "/images/yale-tshirt.jpg",
    rating: 4.5,
    reviews: 92,
    seller: "Yale Heritage Collection",
    category: "tshirt",
    description: "Yale Üniversitesi'nin vintage t-shirt modeli.",
    features: ["%100 Pamuk", "Unisex", "Makinede yıkanabilir"],
    comments: [],
  },
  {
    id: 10,
    name: "Oxford University Hoodie - Patches",
    price: 359,
    originalPrice: 449,
    image: "/images/oxford-hoodie-patches.jpg",
    rating: 4.8,
    reviews: 178,
    seller: "Oxford Premium",
    category: "hoodie",
    discount: 20,
    description: "Oxford Üniversitesi'nin patch detaylı hoodie modeli.",
    features: ["%80 Pamuk, %20 Polyester", "Unisex", "Makinede yıkanabilir"],
    comments: [],
  },
]

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const product = products.find((p) => p.id === Number(id))

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(t)
    }
  }, [copied])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-2xl text-gray-500">Ürün bulunamadı.</p>
        <Button className="mt-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
        <Button variant="ghost" className="mb-4 sm:mb-6" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri
        </Button>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 bg-white/90 rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex-1 flex flex-col items-center">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl w-full max-w-xs object-cover shadow-lg border"
              />
              {product.discount && (
                <Badge className="absolute top-2 left-2 sm:top-6 sm:left-6 bg-red-500 text-white text-xs sm:text-sm">%{product.discount} İndirim</Badge>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-gray-700 font-medium text-sm sm:text-base">{product.rating}</span>
              <span className="text-gray-500 text-xs sm:text-sm">({product.reviews} değerlendirme)</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <span className="text-xl sm:text-2xl font-bold text-blue-700">₺{product.price}</span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-gray-400 line-through">₺{product.originalPrice}</span>
              )}
              {product.discount && (
                <Badge className="bg-red-500 text-white text-xs sm:text-sm">%{product.discount} İndirim</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xs sm:text-sm">
                  {product.seller.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-gray-700 text-sm sm:text-base">{product.seller}</span>
            </div>
            <p className="text-gray-700 mb-2 text-sm sm:text-base">{product.description}</p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-4 text-sm sm:text-base">
              {product.features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
              <Button
                variant={liked ? "secondary" : "outline"}
                onClick={() => setLiked((v) => !v)}
                className={liked ? "border-pink-500 text-pink-600" : ""}
                size="sm"
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${liked ? "fill-pink-500 text-pink-500" : ""}`} />
                <span className="text-sm sm:text-base">{liked ? "Favorilerde" : "Favorilere Ekle"}</span>
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
                <span className="text-sm sm:text-base">Sepete Ekle</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setCopied(true)
                }}
                size="sm"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-sm sm:text-base">{copied ? "Kopyalandı!" : "Paylaş"}</span>
              </Button>
            </div>
            <div className="mt-4">
              <h2 className="font-semibold text-base sm:text-lg mb-2">Yorumlar</h2>
              <div className="space-y-3">
                {product.comments?.map((c, i) => (
                  <div key={i} className="bg-slate-100 rounded-lg p-3 flex items-start gap-3">
                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                      <AvatarFallback className="bg-cyan-200 text-cyan-700 font-bold text-xs sm:text-sm">
                        {c.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">{c.user}</span>
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${j < c.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm mt-1 break-words">{c.text}</p>
                    </div>
                  </div>
                ))}
                {(!product.comments || product.comments.length === 0) && (
                  <p className="text-gray-500 text-sm sm:text-base">Henüz yorum yok.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
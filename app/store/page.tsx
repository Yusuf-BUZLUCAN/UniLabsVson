"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, Heart, ShoppingCart, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  seller: string
  category: string
  isLiked?: boolean
  discount?: number
}

export default function StorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [likedProducts, setLikedProducts] = useState<number[]>([])
  const router = useRouter()

  const products: Product[] = [
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
    },
  ]

  const categories = [
    { value: "all", label: "Tüm Kategoriler" },
    { value: "sweatshirt", label: "Sweatshirt" },
    { value: "hoodie", label: "Hoodie" },
    { value: "tshirt", label: "T-Shirt" },
  ]

  const sortOptions = [
    { value: "popular", label: "En Popüler" },
    { value: "price-low", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price-high", label: "Fiyat: Yüksekten Düşüğe" },
    { value: "rating", label: "En Yüksek Puan" },
    { value: "newest", label: "En Yeni" },
  ]

  const handleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.reviews - a.reviews
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Üniversite Mağazası</h1>
          <p className="text-gray-600 text-sm sm:text-base">Prestijli üniversitelerin resmi ürünleri</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg self-center sm:self-auto">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div
          className={
            viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" 
              : "space-y-4"
          }
        >
          {sortedProducts.map((product) => (
            <Card
              key={product.id}
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                viewMode === "list" ? "flex flex-col sm:flex-row" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "sm:w-48 flex-shrink-0" : ""}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === "list" ? "h-48 sm:h-full" : "h-48 sm:h-64"
                  }`}
                />
                {product.discount && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">%{product.discount} İndirim</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => handleLike(product.id)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedProducts.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>

              <CardContent className={`p-3 sm:p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm sm:text-base">{product.name}</h3>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
                      <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                        {product.seller.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs sm:text-sm text-gray-600 truncate">{product.seller}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-base sm:text-lg font-bold text-gray-900">₺{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-500 line-through">₺{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-sm"
                    size="sm"
                    onClick={() => router.push(`/store/${product.id}`)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    İncele
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}

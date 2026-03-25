// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { ShoppingBag, Heart, Settings, LogOut, Mail, Phone, MapPin, Package } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Separator } from '@/components/ui/separator'

// // User type definition
// interface User {
//   name: string
//   email: string
//   phone: string
//   address: string
//   avatar: string
//   totalOrders: number
//   wishlistItems: number
//   memberSince: string
// }

// // Recent activity item type
// interface ActivityItem {
//   id: string
//   title: string
//   description: string
//   icon: React.ReactNode
//   date: string
// }

// const ProfilePage = () => {
//   const [user] = useState<User>({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '+1 234 567 8900',
//     address: '123 Main Street, New York, NY 10001',
//     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
//     totalOrders: 24,
//     wishlistItems: 12,
//     memberSince: 'January 2023'
//   })

//   const [recentActivity] = useState<ActivityItem[]>([
//     {
//       id: '1',
//       title: 'Order #1234 Delivered',
//       description: 'Your order has been successfully delivered',
//       icon: <Package className="w-6 h-6 text-white" />,
//       date: '2 days ago'
//     },
//     {
//       id: '2',
//       title: 'Added 3 items to wishlist',
//       description: 'New items saved for later',
//       icon: <Heart className="w-6 h-6 text-white" />,
//       date: '5 days ago'
//     },
//     {
//       id: '3',
//       title: 'Order #1233 Shipped',
//       description: 'Your order is on the way',
//       icon: <ShoppingBag className="w-6 h-6 text-white" />,
//       date: '1 week ago'
//     }
//   ])

//   const handleEditProfile = (): void => {
//     // Handle edit profile action
//     console.log('Edit profile clicked')
//   }

//   const handleLogout = (): void => {
//     // Handle logout action
//     console.log('Logout clicked')
//   }

//   const getInitials = (name: string): string => {
//     return name
//       .split(' ')
//       .map((n: string) => n[0])
//       .join('')
//       .toUpperCase()
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-black text-white py-6 px-4 md:px-8">
//         <div className="container mx-auto">
//           <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
//           {/* Profile Card */}
//           <div className="lg:col-span-1">
//             <Card className="border-2 border-black shadow-lg">
//               <CardHeader className="text-center">
//                 <div className="flex justify-center mb-4">
//                   <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-red-600">
//                     <AvatarImage src={user.avatar} alt={user.name} />
//                     <AvatarFallback className="bg-red-600 text-white text-3xl">
//                       {getInitials(user.name)}
//                     </AvatarFallback>
//                   </Avatar>
//                 </div>
//                 <CardTitle className="text-2xl font-bold text-black">{user.name}</CardTitle>
//                 <CardDescription className="text-gray-600">
//                   Member since {user.memberSince}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <Mail className="w-5 h-5 text-red-600 mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Email</p>
//                       <p className="text-black font-medium break-all">{user.email}</p>
//                     </div>
//                   </div>
//                   <Separator className="bg-gray-200" />
//                   <div className="flex items-start gap-3">
//                     <Phone className="w-5 h-5 text-red-600 mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Phone</p>
//                       <p className="text-black font-medium">{user.phone}</p>
//                     </div>
//                   </div>
//                   <Separator className="bg-gray-200" />
//                   <div className="flex items-start gap-3">
//                     <MapPin className="w-5 h-5 text-red-600 mt-1" />
//                     <div>
//                       <p className="text-sm text-gray-500">Address</p>
//                       <p className="text-black font-medium">{user.address}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <Separator className="my-6 bg-gray-200" />
//                 <Button 
//                   className="w-full bg-black hover:bg-gray-800 text-white"
//                   onClick={handleEditProfile}
//                 >
//                   <Settings className="w-4 h-4 mr-2" />
//                   Edit Profile
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Card className="border-2 border-red-600 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardHeader>
//                   <CardTitle className="text-lg flex items-center gap-2">
//                     <Package className="w-5 h-5 text-red-600" />
//                     Total Orders
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-4xl font-bold text-red-600">{user.totalOrders}</p>
//                 </CardContent>
//               </Card>
//               <Card className="border-2 border-red-600 shadow-lg hover:shadow-xl transition-shadow">
//                 <CardHeader>
//                   <CardTitle className="text-lg flex items-center gap-2">
//                     <Heart className="w-5 h-5 text-red-600" />
//                     Wishlist Items
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-4xl font-bold text-red-600">{user.wishlistItems}</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Quick Actions */}
//             <Card className="border-2 border-black shadow-lg">
//               <CardHeader>
//                 <CardTitle className="text-xl">Quick Actions</CardTitle>
//                 <CardDescription>Manage your orders and wishlist</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <Link href="/orders" className="block">
//                     <Button className="w-full h-auto py-6 bg-red-600 hover:bg-red-700 text-white flex-col gap-2">
//                       <ShoppingBag className="w-8 h-8" />
//                       <span className="text-lg font-semibold">My Orders</span>
//                       <span className="text-sm opacity-90">View order history</span>
//                     </Button>
//                   </Link>
//                   <Link href="/wishlist" className="block">
//                     <Button className="w-full h-auto py-6 bg-red-600 hover:bg-red-700 text-white flex-col gap-2">
//                       <Heart className="w-8 h-8" />
//                       <span className="text-lg font-semibold">My Wishlist</span>
//                       <span className="text-sm opacity-90">View saved items</span>
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Recent Activity */}
//             <Card className="border-2 border-black shadow-lg">
//               <CardHeader>
//                 <CardTitle className="text-xl">Recent Activity</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {recentActivity.map((activity: ActivityItem) => (
//                     <div 
//                       key={activity.id} 
//                       className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                       <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shrink-0">
//                         {activity.icon}
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-semibold text-black">{activity.title}</p>
//                         <p className="text-sm text-gray-500">{activity.description}</p>
//                         <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Logout Button */}
//             <Button 
//               variant="outline" 
//               className="w-full border-2 border-black hover:bg-black hover:text-white"
//               onClick={handleLogout}
//             >
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProfilePage


import React from 'react'

export default function page() {
  return (
    <div>
      
    </div>
  )
}

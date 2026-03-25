// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { ArrowLeft, Package, Truck, CheckCircle, Clock, Search } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Input } from '@/components/ui/input'
// import { Separator } from '@/components/ui/separator'

// // Product type definition
// interface Product {
//   name: string
//   quantity: number
//   price: number
// }

// // Order status type
// type OrderStatus = 'delivered' | 'shipped' | 'processing'

// // Order type definition
// interface Order {
//   id: string
//   date: string
//   status: OrderStatus
//   total: number
//   items: number
//   products: Product[]
// }

// const OrdersPage = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('')
//   const [orders] = useState<Order[]>([
//     {
//       id: 'ORD-1234',
//       date: '2024-01-15',
//       status: 'delivered',
//       total: 299.99,
//       items: 3,
//       products: [
//         { name: 'Wireless Headphones', quantity: 1, price: 149.99 },
//         { name: 'Phone Case', quantity: 2, price: 75.00 }
//       ]
//     },
//     {
//       id: 'ORD-1233',
//       date: '2024-01-10',
//       status: 'shipped',
//       total: 499.99,
//       items: 2,
//       products: [
//         { name: 'Smart Watch', quantity: 1, price: 399.99 },
//         { name: 'Screen Protector', quantity: 1, price: 100.00 }
//       ]
//     },
//     {
//       id: 'ORD-1232',
//       date: '2024-01-05',
//       status: 'processing',
//       total: 149.99,
//       items: 1,
//       products: [
//         { name: 'USB-C Cable', quantity: 1, price: 149.99 }
//       ]
//     },
//     {
//       id: 'ORD-1231',
//       date: '2023-12-28',
//       status: 'delivered',
//       total: 799.99,
//       items: 1,
//       products: [
//         { name: 'Bluetooth Speaker', quantity: 1, price: 799.99 }
//       ]
//     }
//   ])

//   const getStatusIcon = (status: OrderStatus): React.ReactNode => {
//     switch (status) {
//       case 'delivered':
//         return <CheckCircle className="w-5 h-5" />
//       case 'shipped':
//         return <Truck className="w-5 h-5" />
//       case 'processing':
//         return <Clock className="w-5 h-5" />
//       default:
//         return <Package className="w-5 h-5" />
//     }
//   }

//   const getStatusColor = (status: OrderStatus): string => {
//     switch (status) {
//       case 'delivered':
//         return 'bg-green-100 text-green-800 border-green-300'
//       case 'shipped':
//         return 'bg-blue-100 text-blue-800 border-blue-300'
//       case 'processing':
//         return 'bg-yellow-100 text-yellow-800 border-yellow-300'
//       default:
//         return 'bg-gray-100 text-gray-800 border-gray-300'
//     }
//   }

//   const filteredOrders: Order[] = orders.filter((order: Order) => 
//     order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     order.products.some((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
//   )

//   const formatDate = (dateString: string): string => {
//     return new Date(dateString).toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     })
//   }

//   const getOrderStatusCount = (status: OrderStatus): number => {
//     return orders.filter((order: Order) => order.status === status).length
//   }

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setSearchQuery(e.target.value)
//   }

//   const handleViewDetails = (orderId: string): void => {
//     // Handle view details action
//     console.log(`View details for order: ${orderId}`)
//   }

//   const handleBuyAgain = (orderId: string): void => {
//     // Handle buy again action
//     console.log(`Buy again for order: ${orderId}`)
//   }

//   const handleTrackOrder = (orderId: string): void => {
//     // Handle track order action
//     console.log(`Track order: ${orderId}`)
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="bg-black text-white py-6 px-4 md:px-8">
//         <div className="container mx-auto">
//           <Link href="/profile" className="inline-flex items-center gap-2 text-white hover:text-red-600 transition-colors mb-4">
//             <ArrowLeft className="w-5 h-5" />
//             <span>Back to Profile</span>
//           </Link>
//           <h1 className="text-2xl md:text-3xl font-bold mt-2">My Orders</h1>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8 md:py-12">
//         {/* Search Bar */}
//         <div className="mb-8">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Search orders by ID or product name..."
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="pl-10 border-2 border-black focus:border-red-600"
//             />
//           </div>
//         </div>

//         {/* Orders Summary */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//           <Card className="border-2 border-black">
//             <CardContent className="pt-6">
//               <p className="text-sm text-gray-600">Total Orders</p>
//               <p className="text-3xl font-bold text-red-600">{orders.length}</p>
//             </CardContent>
//           </Card>
//           <Card className="border-2 border-black">
//             <CardContent className="pt-6">
//               <p className="text-sm text-gray-600">Delivered</p>
//               <p className="text-3xl font-bold text-green-600">{getOrderStatusCount('delivered')}</p>
//             </CardContent>
//           </Card>
//           <Card className="border-2 border-black">
//             <CardContent className="pt-6">
//               <p className="text-sm text-gray-600">Shipped</p>
//               <p className="text-3xl font-bold text-blue-600">{getOrderStatusCount('shipped')}</p>
//             </CardContent>
//           </Card>
//           <Card className="border-2 border-black">
//             <CardContent className="pt-6">
//               <p className="text-sm text-gray-600">Processing</p>
//               <p className="text-3xl font-bold text-yellow-600">{getOrderStatusCount('processing')}</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Orders List */}
//         <div className="space-y-6">
//           {filteredOrders.length === 0 ? (
//             <Card className="border-2 border-black">
//               <CardContent className="py-12 text-center">
//                 <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-xl font-semibold text-gray-600">No orders found</p>
//                 <p className="text-gray-500 mt-2">Try adjusting your search query</p>
//               </CardContent>
//             </Card>
//           ) : (
//             filteredOrders.map((order: Order) => (
//               <Card key={order.id} className="border-2 border-black shadow-lg hover:shadow-xl transition-shadow">
//                 <CardHeader className="bg-gray-50">
//                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                     <div>
//                       <CardTitle className="text-xl font-bold text-black">Order {order.id}</CardTitle>
//                       <CardDescription className="mt-1">
//                         Placed on {formatDate(order.date)}
//                       </CardDescription>
//                     </div>
//                     <Badge className={`${getStatusColor(order.status)} border-2 px-4 py-2 text-sm font-semibold flex items-center gap-2 w-fit`}>
//                       {getStatusIcon(order.status)}
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </Badge>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-6">
//                   {/* Products */}
//                   <div className="space-y-3 mb-4">
//                     {order.products.map((product: Product, index: number) => (
//                       <div key={index}>
//                         <div className="flex justify-between items-start">
//                           <div className="flex-1">
//                             <p className="font-semibold text-black">{product.name}</p>
//                             <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
//                           </div>
//                           <p className="font-semibold text-black">${product.price.toFixed(2)}</p>
//                         </div>
//                         {index < order.products.length - 1 && <Separator className="mt-3 bg-gray-200" />}
//                       </div>
//                     ))}
//                   </div>
                  
//                   <Separator className="my-4 bg-black" />
                  
//                   {/* Order Summary */}
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-sm text-gray-600">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm text-gray-600">Total Amount</p>
//                       <p className="text-2xl font-bold text-red-600">${order.total.toFixed(2)}</p>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                     <Button 
//                       className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                       onClick={() => handleViewDetails(order.id)}
//                     >
//                       View Details
//                     </Button>
//                     {order.status === 'delivered' && (
//                       <Button 
//                         variant="outline" 
//                         className="flex-1 border-2 border-black hover:bg-black hover:text-white"
//                         onClick={() => handleBuyAgain(order.id)}
//                       >
//                         Buy Again
//                       </Button>
//                     )}
//                     {order.status === 'shipped' && (
//                       <Button 
//                         variant="outline" 
//                         className="flex-1 border-2 border-black hover:bg-black hover:text-white"
//                         onClick={() => handleTrackOrder(order.id)}
//                       >
//                         Track Order
//                       </Button>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OrdersPage


import React from 'react'

export default function page() {
  return (
    <div>
      
    </div>
  )
}

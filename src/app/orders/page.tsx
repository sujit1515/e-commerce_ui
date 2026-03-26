'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Search } from 'lucide-react'
import Navbar from '../../components/Common/Navbar';
import Footer from '../../components/Common/Footer';

// Product type definition
interface Product {
  name: string
  quantity: number
  price: number
}

// Order status type
type OrderStatus = 'delivered' | 'shipped' | 'processing'

// Order type definition
interface Order {
  id: string
  date: string
  status: OrderStatus
  total: number
  items: number
  products: Product[]
}

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-1234',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: 3,
      products: [
        { name: 'Wireless Headphones', quantity: 1, price: 149.99 },
        { name: 'Phone Case', quantity: 2, price: 75.00 }
      ]
    },
    {
      id: 'ORD-1233',
      date: '2024-01-10',
      status: 'shipped',
      total: 499.99,
      items: 2,
      products: [
        { name: 'Smart Watch', quantity: 1, price: 399.99 },
        { name: 'Screen Protector', quantity: 1, price: 100.00 }
      ]
    },
    {
      id: 'ORD-1232',
      date: '2024-01-05',
      status: 'processing',
      total: 149.99,
      items: 1,
      products: [
        { name: 'USB-C Cable', quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 'ORD-1231',
      date: '2023-12-28',
      status: 'delivered',
      total: 799.99,
      items: 1,
      products: [
        { name: 'Bluetooth Speaker', quantity: 1, price: 799.99 }
      ]
    }
  ])

  const getStatusIcon = (status: OrderStatus): React.ReactNode => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />
      case 'shipped':
        return <Truck className="w-5 h-5" />
      case 'processing':
        return <Clock className="w-5 h-5" />
      default:
        return <Package className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const filteredOrders: Order[] = orders.filter((order: Order) => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.products.some((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getOrderStatusCount = (status: OrderStatus): number => {
    return orders.filter((order: Order) => order.status === status).length
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  const handleViewDetails = (orderId: string): void => {
    // Handle view details action
    console.log(`View details for order: ${orderId}`)
  }

  const handleBuyAgain = (orderId: string): void => {
    // Handle buy again action
    console.log(`Buy again for order: ${orderId}`)
  }

  const handleTrackOrder = (orderId: string): void => {
    // Handle track order action
    console.log(`Track order: ${orderId}`)
  }

  return (
    <>
      {/* Navbar - Uncomment and add your navbar component */}
      <Navbar />
      
      <div className="min-h-screen bg-white">
        {/* Page Header */}
        <div className="bg-gray-50 py-6 px-4 md:px-8 border-b border-gray-200">
          <div className="container mx-auto">
            <Link href="/profile" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors mb-4">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Profile</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold mt-2 text-gray-900">My Orders</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID or product name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Orders Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-red-600">{orders.length}</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Delivered</p>
              <p className="text-3xl font-bold text-green-600">{getOrderStatusCount('delivered')}</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Shipped</p>
              <p className="text-3xl font-bold text-blue-600">{getOrderStatusCount('shipped')}</p>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">Processing</p>
              <p className="text-3xl font-bold text-yellow-600">{getOrderStatusCount('processing')}</p>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="border-2 border-gray-200 rounded-lg py-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-600">No orders found</p>
                <p className="text-gray-500 mt-2">Try adjusting your search query</p>
              </div>
            ) : (
              filteredOrders.map((order: Order) => (
                <div key={order.id} className="border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gray-50 p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Order {order.id}</h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Placed on {formatDate(order.date)}
                        </p>
                      </div>
                      <div className={`${getStatusColor(order.status)} border px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 w-fit`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Products */}
                    <div className="space-y-3 mb-4">
                      {order.products.map((product: Product, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                          </div>
                          {index < order.products.length - 1 && <hr className="mt-3 border-gray-200" />}
                        </div>
                      ))}
                    </div>
                    
                    <hr className="my-4 border-gray-200" />
                    
                    {/* Order Summary */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-red-600">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <button 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        View Details
                      </button>
                      {order.status === 'delivered' && (
                        <button 
                          className="flex-1 border-2 border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
                          onClick={() => handleBuyAgain(order.id)}
                        >
                          Buy Again
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button 
                          className="flex-1 border-2 border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
                          onClick={() => handleTrackOrder(order.id)}
                        >
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Footer - Uncomment and add your footer component */}
      <Footer />
    </>
  )
}

export default OrdersPage
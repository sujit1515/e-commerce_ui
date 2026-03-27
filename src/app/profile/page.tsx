'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ShoppingBag, Heart, Settings, LogOut, Mail, Phone, MapPin, Package, Upload, X, Camera } from 'lucide-react'
import { createProfile } from "@/api/profile";

// User type definition
interface User {
  name: string
  email: string
  phone: string
  address: string
  avatar: string
  totalOrders: number
  wishlistItems: number
  memberSince: string
}

// Recent activity item type
interface ActivityItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  date: string
}

const ProfilePage = () => {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main Street, New York, NY 10001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    totalOrders: 24,
    wishlistItems: 12,
    memberSince: 'January 2023'
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    avatarPreview: ''
  })
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const modalFileInputRef = useRef<HTMLInputElement>(null)

  const [recentActivity] = useState<ActivityItem[]>([
    {
      id: '1',
      title: 'Order #1234 Delivered',
      description: 'Your order has been successfully delivered',
      icon: <Package className="w-6 h-6 text-white" />,
      date: '2 days ago'
    },
    {
      id: '2',
      title: 'Added 3 items to wishlist',
      description: 'New items saved for later',
      icon: <Heart className="w-6 h-6 text-white" />,
      date: '5 days ago'
    },
    {
      id: '3',
      title: 'Order #1233 Shipped',
      description: 'Your order is on the way',
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      date: '1 week ago'
    }
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditProfile = (): void => {
    // Open modal with current user data
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      avatarPreview: user.avatar
    })
    setSelectedAvatarFile(null)
    setIsEditModalOpen(true)
  }
  
  // Function to upload image separately
  const handleUploadImage = async (): Promise<void> => {
    if (!selectedAvatarFile) {
      alert('Please select an image first');
      return;
    }

    setIsUploading(true);
    try {
      // Create FormData to upload the image
      const formData = new FormData();
      formData.append('image', selectedAvatarFile);
      
      // Call your upload API endpoint here
      // const response = await fetch('/api/upload-profile-image', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // For now, let's simulate an upload with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate getting a URL back from the server
      const mockUploadedUrl = URL.createObjectURL(selectedAvatarFile);
      
      // Update the avatar preview with the uploaded image URL
      setEditFormData(prev => ({
        ...prev,
        avatarPreview: mockUploadedUrl
      }));
      
      alert('Image uploaded successfully! ✅');
    } catch (error: any) {
      console.error(error);
      alert(error?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  //save function using createProfile
  const handleSaveChanges = async (): Promise<void> => {
    try {
      // ✅ Validation
      if (!editFormData.name.trim()) {
        alert("Name is required");
        return;
      }
      if (!editFormData.email.includes("@")) {
        alert("Valid email required");
        return;
      }

      // ✅ Call createProfile API (image included)
      const res = await createProfile({
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
        address: editFormData.address,
        image: selectedAvatarFile || undefined,
      });

      if (res?.success && res.user) {
        setUser(prev => ({
          ...prev,
          name: res.user?.name || prev.name,
          email: res.user?.email || prev.email,
          phone: res.user?.phone || prev.phone,
          address: res.user?.address || prev.address,
          avatar: res.user?.avatar || prev.avatar,
        }));

        setIsEditModalOpen(false);
        alert("Profile created/updated successfully ✅");
      }

    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Operation failed");
    }
  };

  const handleCancelEdit = (): void => {
    setIsEditModalOpen(false)
    setSelectedAvatarFile(null)
    setIsUploading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleModalAvatarClick = (): void => {
    modalFileInputRef.current?.click()
  }

  const handleModalFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB')
        return
      }

      setSelectedAvatarFile(file)
      
      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEditFormData(prev => ({
          ...prev,
          avatarPreview: result
        }))
      }
      reader.onerror = () => {
        alert('Error reading file')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = (): void => {
    // Handle logout action
    console.log('Logout clicked')
  }

  const handleAvatarClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB')
        return
      }

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUser(prev => ({
          ...prev,
          avatar: result
        }))
        console.log('Avatar updated successfully')
      }
      reader.onerror = () => {
        alert('Error reading file')
      }
      reader.readAsDataURL(file)
    }
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <>
      <style>{`
        :root {
          --maroon: #800000;
          --maroon-dark: #5C0000;
          --maroon-light: #9D2A2A;
          --maroon-soft: #F5E6E6;
        }
        
        .text-maroon {
          color: var(--maroon);
        }
        
        .bg-maroon {
          background-color: var(--maroon);
        }
        
        .border-maroon {
          border-color: var(--maroon);
        }
        
        .hover\\:bg-maroon-dark:hover {
          background-color: var(--maroon-dark);
        }
        
        .hover\\:border-maroon:hover {
          border-color: var(--maroon);
        }
        
        .focus\\:border-maroon:focus {
          border-color: var(--maroon);
        }
        
        .focus\\:ring-maroon:focus {
          --tw-ring-color: rgba(128, 0, 0, 0.2);
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Navbar will be imported here */}
        {/* <Navbar /> */}

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="border-2 border-maroon rounded-lg shadow-lg overflow-hidden">
                <div className="text-center p-6">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div 
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-maroon overflow-hidden cursor-pointer group"
                        onClick={handleAvatarClick}
                      >
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-maroon/10 flex items-center justify-center">
                            <span className="text-2xl font-bold text-maroon">{getInitials(user.name)}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-maroon">{user.name}</h2>
                  <p className="text-maroon/60 mt-1">Member since {user.memberSince}</p>
                  <p className="text-xs text-maroon/40 mt-2 cursor-pointer hover:text-maroon" onClick={handleAvatarClick}>
                    Click on avatar to change photo
                  </p>
                </div>
                
                <div className="p-6 border-t border-maroon/10">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-maroon/50">Email</p>
                        <p className="text-maroon font-medium break-all">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-maroon/10 pt-4">
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-maroon/50">Phone</p>
                          <p className="text-maroon font-medium">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-maroon/10 pt-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-maroon mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-maroon/50">Address</p>
                          <p className="text-maroon font-medium">{user.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-maroon/10 mt-6 pt-6">
                    <button 
                      className="w-full bg-maroon hover:bg-maroon-dark text-white py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                      onClick={handleEditProfile}
                    >
                      <Settings className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-2 border-maroon rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-5 h-5 text-maroon" />
                    <h3 className="text-lg font-semibold text-maroon">Total Orders</h3>
                  </div>
                  <p className="text-4xl font-bold text-maroon">{user.totalOrders}</p>
                </div>
                
                <div className="border-2 border-maroon rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-maroon" />
                    <h3 className="text-lg font-semibold text-maroon">Wishlist Items</h3>
                  </div>
                  <p className="text-4xl font-bold text-maroon">{user.wishlistItems}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-2 border-maroon rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-maroon/10">
                  <h3 className="text-xl font-bold text-maroon">Quick Actions</h3>
                  <p className="text-maroon/50 mt-1">Manage your orders and wishlist</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/orders" className="block">
                      <div className="w-full bg-maroon hover:bg-maroon-dark text-white rounded-lg p-6 text-center transition-colors cursor-pointer">
                        <ShoppingBag className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-lg font-semibold block">My Orders</span>
                        <span className="text-sm opacity-90">View order history</span>
                      </div>
                    </Link>
                    <Link href="/wishlist" className="block">
                      <div className="w-full bg-maroon hover:bg-maroon-dark text-white rounded-lg p-6 text-center transition-colors cursor-pointer">
                        <Heart className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-lg font-semibold block">My Wishlist</span>
                        <span className="text-sm opacity-90">View saved items</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border-2 border-maroon rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b border-maroon/10">
                  <h3 className="text-xl font-bold text-maroon">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity: ActivityItem) => (
                      <div 
                        key={activity.id} 
                        className="flex items-center gap-4 p-4 bg-maroon/5 rounded-lg hover:bg-maroon/10 transition-colors"
                      >
                        <div className="w-12 h-12 bg-maroon rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-maroon">{activity.title}</p>
                          <p className="text-sm text-maroon/60">{activity.description}</p>
                          <p className="text-xs text-maroon/40 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <button 
                className="w-full border-2 border-maroon text-maroon hover:bg-maroon hover:text-white py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal with Avatar Upload */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-maroon/10">
                <h2 className="text-2xl font-bold text-maroon">Edit Profile</h2>
                <button
                  onClick={handleCancelEdit}
                  className="text-maroon/40 hover:text-maroon transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Profile Picture Upload with Upload Button */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div 
                      className="w-28 h-28 rounded-full border-4 border-maroon overflow-hidden cursor-pointer group"
                      onClick={handleModalAvatarClick}
                    >
                      {editFormData.avatarPreview ? (
                        <img 
                          src={editFormData.avatarPreview} 
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-maroon/10 flex items-center justify-center">
                          <span className="text-3xl font-bold text-maroon">
                            {getInitials(editFormData.name || user.name)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    {/* Hidden file input for modal */}
                    <input
                      ref={modalFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleModalFileUpload}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Upload Button */}
                  <button
                    onClick={handleUploadImage}
                    disabled={!selectedAvatarFile || isUploading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      !selectedAvatarFile || isUploading
                        ? 'bg-maroon/20 text-maroon/40 cursor-not-allowed'
                        : 'bg-maroon hover:bg-maroon-dark text-white'
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-maroon/50">
                    Click on the image to select, then click Upload to save the image
                  </p>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-maroon/70 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-maroon/20 rounded-md focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-colors text-maroon"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-maroon/70 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-maroon/20 rounded-md focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-colors text-maroon"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-maroon/70 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editFormData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border-2 border-maroon/20 rounded-md focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-colors text-maroon"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Address Field */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-maroon/70 mb-2">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={editFormData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-maroon/20 rounded-md focus:outline-none focus:border-maroon focus:ring-2 focus:ring-maroon/10 transition-colors resize-none text-maroon"
                    placeholder="Enter your full address"
                  />
                </div>

                <div className="text-xs text-maroon/50 mt-2">
                  * Required fields
                </div>
              </div>

              <div className="flex gap-3 p-6 border-t border-maroon/10">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 px-4 py-2 border-2 border-maroon/20 text-maroon rounded-md hover:bg-maroon/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="flex-1 px-4 py-2 bg-maroon text-white rounded-md hover:bg-maroon-dark transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePage
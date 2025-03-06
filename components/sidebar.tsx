"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  CreditCard, 
  Users, 
  Receipt, 
  BarChart3, 
  MenuIcon, 
  LogOut,
  Settings
} from "lucide-react"
import { useSidebarContext } from "@/context/sidebar-context"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/app/firebase/config"
import { signOut } from "firebase/auth"
import Cookies from "js-cookie"

const navItems = [
  { 
    name: "Payment Processor", 
    href: "/payment-processor", 
    icon: CreditCard,
    description: "Configure and manage payment methods"
  },
  { 
    name: "Billing", 
    href: "/billing", 
    icon: Receipt,
    description: "Manage invoices and billing"
  },
  { 
    name: "Metrics", 
    href: "/metrics", 
    icon: BarChart3,
    description: "View analytics and reports"
  },
  { 
    name: "Settings", 
    href: "/settings", 
    icon: Settings,
    description: "Configure system settings"
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isOpen, setIsOpen } = useSidebarContext()

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('authToken');
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="h-full bg-white border-r border-gray-100 flex flex-col">
          <div className={`h-[64px] flex items-center px-6 ${isOpen ? 'justify-between' : 'justify-center'}`}>
            {isOpen && (
              <div className="flex items-center">
                <Image
                  src="/accelerate-logo@2x.jpg"
                  alt="Accelerate Logo"
                  width={150}
                  height={40}
                  priority
                  className="object-contain"
                />
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center"
            >
              <MenuIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <Separator className="opacity-50" />
          
          <nav className="mt-6 px-3 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 my-1 rounded-lg transition-all duration-200 group
                  ${pathname === item.href 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${!isOpen ? 'justify-center' : ''}`}
                title={!isOpen ? item.description : undefined}
              >
                <item.icon className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                  isOpen ? 'mr-3' : ''
                } ${
                  pathname === item.href 
                    ? 'text-blue-700' 
                    : 'text-gray-500 group-hover:text-gray-700'
                }`} />
                {isOpen && (
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.description}</span>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          <div className="px-3 pb-6">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 
                text-gray-600 hover:bg-red-50 hover:text-red-700 group
                ${!isOpen ? 'justify-center' : ''}`}
            >
              <LogOut className={`h-5 w-5 flex-shrink-0 transition-colors duration-200 ${
                isOpen ? 'mr-3' : ''
              } group-hover:text-red-700`} />
              {isOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>
      <div className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'ml-64' : 'ml-20'
      }`}>
        <main className="p-8">
          {/* This will wrap around your page content */}
        </main>
      </div>
    </>
  )
}


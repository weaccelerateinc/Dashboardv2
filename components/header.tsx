"use client"

import { Search, BookOpen } from "lucide-react"
import Link from "next/link"
import { useSidebarContext } from "@/context/sidebar-context"

export function Header() {
  const { isOpen } = useSidebarContext()

  return (
    <div className={`fixed top-0 right-0 z-50 bg-white border-b transition-all duration-300
      ${isOpen ? 'left-64' : 'left-20'}`}>
      <div className="flex h-[64px] items-center px-8 gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 h-9 px-4 bg-gray-50 border border-gray-200 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                text-sm transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            defaultValue="sandbox"
            className="w-40 h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-sm cursor-pointer transition-all duration-200"
          >
            <option value="sandbox">Sandbox</option>
            <option value="production">Production</option>
          </select>

          <Link 
            href="https://developer.weaccelerate.com" 
            target="_blank"
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-gray-600 hover:text-gray-900"
            title="Developer Documentation"
          >
            <BookOpen className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
} 
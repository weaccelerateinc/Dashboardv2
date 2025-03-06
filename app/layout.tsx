import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/context/sidebar-context"
import { MainLayout } from "@/components/main-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Merchant Dashboard",
  description: "A comprehensive merchant dashboard portal",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </SidebarProvider>
      </body>
    </html>
  )
}



import './globals.css'
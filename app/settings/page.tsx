"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { Header } from "@/components/header"
import { User, Users, Key } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileTab } from './components/profile-tab'
import { TeamTab } from './components/team-tab'
import { ApiTab } from './components/api-tab'

// Sample team data
const teamMembers = [
  {
    name: "John Smith",
    email: "john@example.com",
    role: "Admin",
    lastActive: "2024-03-10T15:30:00Z"
  },
  {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Developer",
    lastActive: "2024-03-10T14:45:00Z"
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Viewer",
    lastActive: "2024-03-09T11:20:00Z"
  },
]

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <p className="text-gray-600 mb-6">Manage your account settings and preferences</p>
        
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white p-1 rounded-lg border">
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-md"
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-md"
            >
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className="flex items-center gap-2 data-[state=active]:bg-gray-100 rounded-md"
            >
              <Key className="h-4 w-4" />
              Merchant API
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg border shadow-sm">
            <TabsContent value="profile" className="p-6">
              <ProfileTab />
            </TabsContent>

            <TabsContent value="team" className="p-6">
              <TeamTab />
            </TabsContent>

            <TabsContent value="api" className="p-6">
              <ApiTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
} 
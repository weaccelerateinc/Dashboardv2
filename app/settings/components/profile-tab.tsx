"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from '../../firebase/config';
import { User } from 'firebase/auth';

export function ProfileTab() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              defaultValue={user?.displayName || ''}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email || ''}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              defaultValue="admin"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="admin">Admin</option>
              <option value="developer">Developer</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
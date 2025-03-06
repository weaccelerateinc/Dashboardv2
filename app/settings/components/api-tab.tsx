"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from '../../firebase/config';
import { User } from 'firebase/auth';
import { Copy, Eye, EyeOff } from 'lucide-react';

interface MerchantInfo {
  id: string;
  name: string;
  vgsVaultId: string;
  vgsCopyRouteId: string;
  vgsOutboundUsername: string;
  vgsOutboundPassword: string;
  vgsClientId: string;
  vgsClientSecret: string;
  stripeSecretKey: string;
}

export function ApiTab() {
  const [user, setUser] = useState<User | null>(null);
  const [merchantData, setMerchantData] = useState<MerchantInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch('/api/merchant', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch merchant information');
          }

          const data = await response.json();
          setMerchantData(data);
        } catch (err) {
          console.error('API Error:', err);
          setError(err instanceof Error ? err.message : 'An error occurred while fetching merchant data');
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleSecret = (field: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Merchant API Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Merchant API Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 py-4">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Merchant API Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Merchant ID</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={merchantData?.id || ''}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    readOnly
                  />
                  <button
                    onClick={() => handleCopy(merchantData?.id || '')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Merchant Name</label>
                <input
                  type="text"
                  value={merchantData?.name || ''}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* VGS Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">VGS Configuration</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vault ID</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={merchantData?.vgsVaultId || ''}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    readOnly
                  />
                  <button
                    onClick={() => handleCopy(merchantData?.vgsVaultId || '')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Copy Route ID</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={merchantData?.vgsCopyRouteId || ''}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    readOnly
                  />
                  <button
                    onClick={() => handleCopy(merchantData?.vgsCopyRouteId || '')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Credentials</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outbound Username</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={merchantData?.vgsOutboundUsername || ''}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    readOnly
                  />
                  <button
                    onClick={() => handleCopy(merchantData?.vgsOutboundUsername || '')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outbound Password</label>
                <div className="flex items-center gap-2">
                  <input
                    type={showSecrets.vgsOutboundPassword ? "text" : "password"}
                    value={merchantData?.vgsOutboundPassword || ''}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    readOnly
                  />
                  <button
                    onClick={() => toggleSecret('vgsOutboundPassword')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    {showSecrets.vgsOutboundPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleCopy(merchantData?.vgsOutboundPassword || '')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={merchantData?.vgsClientId || ''}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    readOnly
                  />
                  <button
                    onClick={() => handleCopy(merchantData?.vgsClientId || '')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                <div className="flex items-center gap-2">
                  <input
                    type={showSecrets.vgsClientSecret ? "text" : "password"}
                    value={merchantData?.vgsClientSecret || ''}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    readOnly
                  />
                  <button
                    onClick={() => toggleSecret('vgsClientSecret')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    {showSecrets.vgsClientSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => handleCopy(merchantData?.vgsClientSecret || '')}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stripe Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Stripe Configuration</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
              <div className="flex items-center gap-2">
                <input
                  type={showSecrets.stripeSecretKey ? "text" : "password"}
                  value={merchantData?.stripeSecretKey || ''}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
                <button
                  onClick={() => toggleSecret('stripeSecretKey')}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  {showSecrets.stripeSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => handleCopy(merchantData?.stripeSecretKey || '')}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
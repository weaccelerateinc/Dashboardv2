"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from '../../firebase/config';
import { User } from 'firebase/auth';
import { Copy } from 'lucide-react';

interface MerchantInfo {
  id: string;
  name: string;
  stripeSecretKey?: string;
  checkoutDotComSecretKey?: string;
  checkoutDotComPublicKey?: string;
  braintreeMerchantId?: string;
  braintreePrivateKey?: string;
  braintreePublicKey?: string;
  [key: string]: string | undefined;
}

export function ApiTab() {
  const [user, setUser] = useState<User | null>(null);
  const [merchantData, setMerchantData] = useState<MerchantInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Merchant API Response</CardTitle>
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
          <CardTitle>Merchant API Response</CardTitle>
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
        <CardTitle>Payment Gateway Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Merchant ID - keeping button and Copy icon */}
          {merchantData?.id && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Merchant ID</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.id}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
                <button
                  onClick={() => handleCopy(merchantData.id)}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Merchant Name - removed button and Copy icon */}
          {merchantData?.name && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Merchant Name</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.name}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          )}

          {/* Stripe Configuration - removed button and Copy icon */}
          {merchantData?.stripeSecretKey && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Stripe Secret Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.stripeSecretKey}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          )}

          {/* Checkout.com Configuration - removed button and Copy icon */}
          {merchantData?.checkoutDotComSecretKey && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Checkout.com Secret Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.checkoutDotComSecretKey}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          )}

          {merchantData?.checkoutDotComPublicKey && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Checkout.com Public Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.checkoutDotComPublicKey}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          )}

          {/* Braintree Configuration - removed button and Copy icon */}
          {merchantData?.braintreeMerchantId && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Braintree Merchant ID</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.braintreeMerchantId}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          )}

          {merchantData?.braintreePrivateKey && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Braintree Private Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.braintreePrivateKey}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          )}

          {merchantData?.braintreePublicKey && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Braintree Public Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={merchantData.braintreePublicKey}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Header } from "@/components/header"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CheckCircle } from "lucide-react"
import { getAuth } from "firebase/auth"

export default function ConfigureBraintree() {
  const [merchantId, setMerchantId] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  const auth = getAuth()

  const handleSaveChanges = async () => {
    setIsLoading(true)
    setIsSuccess(false)
    try {
      const idToken = await auth.currentUser?.getIdToken()
      if (!idToken) {
        throw new Error('Not authenticated')
      }

      const response = await fetch('/api/merchants/update-braintree-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          merchantId,
          publicKey,
          privateKey,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update configuration')
      }

      setIsSuccess(true)
      toast({
        title: "Success",
        description: "Braintree configuration has been updated successfully.",
        variant: "success",
      })
    } catch (error) {
      setIsSuccess(false)
      toast({
        title: "Error",
        description: "Failed to update Braintree configuration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <h1 className="text-3xl font-bold mb-6">Configure Braintree</h1>
        <Card>
          <CardHeader>
            <CardTitle>Braintree API Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Merchant ID (Sandbox)</label>
                <Input
                  type="text"
                  placeholder="Enter your Braintree Merchant ID"
                  value={merchantId}
                  onChange={(e) => setMerchantId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Public Key (Sandbox)</label>
                <Input
                  type="text"
                  placeholder="Enter your Braintree Public Key"
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Private Key (Sandbox)</label>
                <Input
                  type="text"
                  placeholder="Enter your Braintree Private Key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                />
              </div>
              
              {isSuccess && (
                <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Configuration successfully updated!</span>
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
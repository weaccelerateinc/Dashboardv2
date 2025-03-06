"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Header } from "@/components/header"

export default function ConfigureCheckoutCom() {
  const [sandboxPublicKey, setSandboxPublicKey] = useState("")
  const [sandboxSecretKey, setSandboxSecretKey] = useState("")
  const [productionPublicKey, setProductionPublicKey] = useState("")
  const [productionSecretKey, setProductionSecretKey] = useState("")

  const handleSave = () => {
    // Add save logic here
    console.log("Saving API keys:", {
      sandbox: { public: sandboxPublicKey, secret: sandboxSecretKey },
      production: { public: productionPublicKey, secret: productionSecretKey }
    })
  }

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Configure Checkout.com</h1>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        <div className="space-y-6">
          {/* Sandbox Environment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Sandbox Environment API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Public API Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter sandbox public API key"
                    value={sandboxPublicKey}
                    onChange={(e) => setSandboxPublicKey(e.target.value)}
                    className="w-full max-w-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secret API Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter sandbox secret API key"
                    value={sandboxSecretKey}
                    onChange={(e) => setSandboxSecretKey(e.target.value)}
                    className="w-full max-w-xl"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Use this environment for testing payments without processing real transactions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Production Environment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Production Environment API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Public API Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter production public API key"
                    value={productionPublicKey}
                    onChange={(e) => setProductionPublicKey(e.target.value)}
                    className="w-full max-w-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Secret API Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter production secret API key"
                    value={productionSecretKey}
                    onChange={(e) => setProductionSecretKey(e.target.value)}
                    className="w-full max-w-xl"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Use this environment for processing real transactions in your live application.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
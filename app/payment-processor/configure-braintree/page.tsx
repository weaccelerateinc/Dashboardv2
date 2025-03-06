"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Header } from "@/components/header"

export default function ConfigureBraintree() {
  const [sandboxConfig, setSandboxConfig] = useState({
    merchantId: "",
    publicKey: "",
    privateKey: ""
  })

  const [productionConfig, setProductionConfig] = useState({
    merchantId: "",
    publicKey: "",
    privateKey: ""
  })

  const handleSave = () => {
    // Add save logic here
    console.log("Saving configurations:", {
      sandbox: sandboxConfig,
      production: productionConfig
    })
  }

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Configure Braintree</h1>
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
                    Merchant ID
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter sandbox merchant ID"
                    value={sandboxConfig.merchantId}
                    onChange={(e) => setSandboxConfig({
                      ...sandboxConfig,
                      merchantId: e.target.value
                    })}
                    className="w-full max-w-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Public Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter sandbox public key"
                    value={sandboxConfig.publicKey}
                    onChange={(e) => setSandboxConfig({
                      ...sandboxConfig,
                      publicKey: e.target.value
                    })}
                    className="w-full max-w-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Private Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter sandbox private key"
                    value={sandboxConfig.privateKey}
                    onChange={(e) => setSandboxConfig({
                      ...sandboxConfig,
                      privateKey: e.target.value
                    })}
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
                    Merchant ID
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter production merchant ID"
                    value={productionConfig.merchantId}
                    onChange={(e) => setProductionConfig({
                      ...productionConfig,
                      merchantId: e.target.value
                    })}
                    className="w-full max-w-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Public Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter production public key"
                    value={productionConfig.publicKey}
                    onChange={(e) => setProductionConfig({
                      ...productionConfig,
                      publicKey: e.target.value
                    })}
                    className="w-full max-w-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Private Key
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter production private key"
                    value={productionConfig.privateKey}
                    onChange={(e) => setProductionConfig({
                      ...productionConfig,
                      privateKey: e.target.value
                    })}
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
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Header } from "@/components/header"

export default function ConfigureStripe() {
  const [sandboxKey, setSandboxKey] = useState("")
  const [productionKey, setProductionKey] = useState("")

  const handleSave = () => {
    // Add save logic here
    console.log("Saving API keys:", { sandboxKey, productionKey })
  }

  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Configure Stripe</h1>
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
                    API Token
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter Test Mode API token"
                    value={sandboxKey}
                    onChange={(e) => setSandboxKey(e.target.value)}
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
                    API Token
                  </label>
                  <Input
                    type="password"
                    placeholder="Enter production API token"
                    value={productionKey}
                    onChange={(e) => setProductionKey(e.target.value)}
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
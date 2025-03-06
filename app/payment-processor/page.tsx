import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function PaymentProcessor() {
  return (
    <div>
      <Header />
      <div className="mt-14 p-6">
        <h1 className="text-3xl font-bold mb-6">Payment Processor Setup</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Stripe Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Stripe</CardTitle>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Available
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Popular payment platform with extensive features and global reach.
              </p>
              <div className="space-y-4">
                <Link href="/payment-processor/configure-stripe" className="w-full">
                  <Button className="w-full">Configure Stripe</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Braintree Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Braintree</CardTitle>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Available
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                PayPal-owned payment solution with comprehensive payment options.
              </p>
              <div className="space-y-4">
                <Link href="/payment-processor/configure-braintree" className="w-full">
                  <Button className="w-full">Configure Braintree</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Checkout.com Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Checkout.com</CardTitle>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Available
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Enterprise-grade payment solution with advanced features.
              </p>
              <div className="space-y-4">
                <Link href="/payment-processor/configure-checkoutcom" className="w-full">
                  <Button className="w-full">Configure Checkout.com</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Fiserv Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Fiserv</CardTitle>
              <div className="flex items-center text-sm text-yellow-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                Coming Soon
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Comprehensive financial technology and payment processing solutions.
              </p>
              <div className="space-y-4">
                <Button className="w-full" disabled>Configure Fiserv</Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}


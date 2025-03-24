import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const headersList = headers()
    const authHeader = headersList.get('authorization')

    const response = await fetch('https://sbx.api.weaccelerate.com/merchants/UpdateConfig', {
      method: 'POST',
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': authHeader || '',
      },
      body: JSON.stringify({
        braintreeMerchantId: body.merchantId,
        braintreePrivateKey: body.privateKey,
        braintreePublicKey: body.publicKey,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to update configuration')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error updating config:', error)
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    )
  }
} 
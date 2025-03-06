import { NextResponse } from 'next/server';
import { adminAuth } from '@/app/firebase/admin';

export async function POST(request: Request) {
  try {
    const { uid, role } = await request.json();
    
    if (!uid || !role) {
      return NextResponse.json(
        { error: 'Missing uid or role' },
        { status: 400 }
      );
    }

    // Set custom claims for the user
    await adminAuth.setCustomUserClaims(uid, { role: 'authenticated' });
    
    // Get the user to verify claims were set
    const user = await adminAuth.getUser(uid);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Custom claims set successfully',
      customClaims: user.customClaims 
    });
  } catch (error: any) {
    console.error('Error setting custom claims:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 
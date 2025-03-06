'use client';

import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const setAuthToken = async (user: any) => {
    const token = await user.getIdToken();
    Cookies.set('authToken', token, { expires: 7 }); // Token expires in 7 days
    console.log('JWT Token:', token);
  };

  const setCustomClaims = async (uid: string) => {
    try {
      const response = await fetch('/api/auth/set-custom-claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          role: 'user', // You can change this based on your needs
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to set custom claims');
      }

      const data = await response.json();
      console.log('Custom claims set:', data);
    } catch (error) {
      console.error('Error setting custom claims:', error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          router.replace('/');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await setAuthToken(user);
        router.replace('/');
      }
      setIsLoading(false);
    });

    checkAuth();
    return () => unsubscribe();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Starting email sign in...');
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Send email verification
        await sendEmailVerification(userCredential.user);
        // Set custom claims only for new users during signup
        await setCustomClaims(userCredential.user.uid);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      
      const user = userCredential.user;
      if (user) {
        // Force a refresh of the ID token
        await user.getIdToken(true);
        router.replace('/');
      }
    } catch (error: any) {
      console.error('Email sign in error:', error);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log('Starting Google sign in...');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider) as any; // Type assertion needed for additionalUserInfo
      console.log('Google sign in successful, user:', result.user?.email);
      
      // Check if this is a new user (first time sign in)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.signInMethod === GoogleAuthProvider.PROVIDER_ID) {
        // Only set custom claims for new users
        const isNewUser = result.additionalUserInfo?.isNewUser;
        if (isNewUser) {
          await setCustomClaims(result.user.uid);
        }
      }
      
      // Force a refresh of the ID token
      await result.user.getIdToken(true);
      
      // Use replace instead of push to prevent back navigation
      router.replace('/');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button type="submit" className="w-full">
              {isSignUp ? 'Sign Up' : 'Login with Email'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </Button>
          </form>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
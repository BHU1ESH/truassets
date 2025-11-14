import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, ArrowLeft } from 'lucide-react';

interface CredentialResponse {
  credential: string;
}

interface GoogleIdentityServices {
  accounts: {
    id: {
      initialize: (config: { client_id: string; callback: (response: CredentialResponse) => void }) => void;
      renderButton: (
        parent: HTMLElement | null,
        options: {
          theme: 'outline' | 'filled_blue';
          size: 'large' | 'medium' | 'small';
          width: number;
          text: 'continue_with' | 'signin_with' | 'signup_with';
        }
      ) => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}

const UserLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const enableMockLogin = true; // Always enable demo login for now

  const handleCredentialResponse = useCallback(
    (response: CredentialResponse) => {
      try {
        const payload = JSON.parse(atob(response.credential.split('.')[1])) as {
          sub: string;
          name: string;
          email: string;
          picture?: string;
        };

        const user = {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
          role: 'user' as const,
        };

        login(user);
        navigate('/');
      } catch (error) {
        console.error('Error processing Google sign-in:', error);
      }
    },
    [login, navigate],
  );

  // Check authentication status after component mounts
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
      if (isAuthenticated) {
        // Use replace instead of navigate to avoid adding to history
        navigate('/', { replace: true });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!googleClientId || googleClientId === 'your_google_client_id_here') {
      // Don't show error if mock login is enabled
      return;
    }

    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          {
            theme: 'outline',
            size: 'large',
            width: 350,
            text: 'continue_with',
          }
        );
        setIsGoogleReady(true);
      } else {
        setLoadError('Unable to load Google sign-in. Please refresh and try again.');
      }
    };

    script.onerror = () => {
      setLoadError('Failed to load Google sign-in script. Check your network connection.');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [enableMockLogin, handleCredentialResponse]);

  const handleMockLogin = () => {
    const mockUser = {
      id: 'demo-user',
      name: 'Demo Investor',
      email: 'demo.investor@truassets.com',
      picture: 'https://ui-avatars.com/api/?name=Demo+Investor&background=0D8ABC&color=fff',
      role: 'user' as const,
    };

    login(mockUser);
    navigate('/');
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent-green/5 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, show redirecting message
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent-green/5 p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent-green/5 p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to TruAssets
            </CardTitle>
            <CardDescription>
              Sign in with your Google account to start investing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              {loadError && (
                <div className="w-full rounded-md border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
                  {loadError}
                </div>
              )}
              {!loadError && (
                <div id="googleSignInButton" className="w-full flex justify-center">
                  {!isGoogleReady && (
                    <div className="w-full rounded-md border border-input p-3 text-center text-sm text-muted-foreground">
                      Loading Google sign-in…
                    </div>
                  )}
                </div>
              )}
              
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              {enableMockLogin && (
                <Button type="button" variant="cta" className="w-full bg-accent-green hover:bg-accent-green/90" onClick={handleMockLogin}>
                  Continue with Demo Account
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/admin/login')}
              >
                Admin Login
              </Button>
            </div>

            <div className="text-xs text-center text-muted-foreground mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            New to real estate investing?{' '}
            <a href="#how-it-works" className="text-primary hover:underline">
              Learn how it works
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

import { useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../services/api';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" aria-hidden="true" focusable="false" viewBox="0 0 48 48">
      <path fill="#4285F4" d="M45.12 24.52c0-1.6-.14-3.14-.4-4.62H24v8.69h11.87c-.52 2.81-2.03 5.21-4.34 6.86v5.62h7.22c4.22-3.88 6.65-9.69 6.65-16.55z"></path>
      <path fill="#34A853" d="M24 46c6.49 0 11.92-2.14 15.89-5.82l-7.22-5.62c-2.14 1.44-4.88 2.29-7.67 2.29-5.9 0-10.88-3.98-12.67-9.31H4.08v5.82C8.06 41.01 15.53 46 24 46z"></path>
      <path fill="#FBBC05" d="M11.33 28.12c-.44-1.32-.69-2.72-.69-4.12s.25-2.8.69-4.12V14.06H4.08C2.56 17.03 2 20.37 2 24s.56 6.97 4.08 9.94l7.25-5.82z"></path>
      <path fill="#EA4335" d="M24 10.12c3.54 0 6.69 1.21 9.21 3.63l6.4-6.4C35.91 2.99 30.49 0 24 0 15.53 0 8.06 4.99 4.08 11.94l7.25 5.82C13.12 14.1 18.1 10.12 24 10.12z"></path>
    </svg>
  );
}

interface GoogleLoginButtonProps {
  onSuccess: (token: string) => void;
}

export function GoogleLoginButton({ onSuccess }: GoogleLoginButtonProps) {
  
  const onGoogleSuccess = async (codeResponse: any) => {
    try {
      console.log('Google code recebido:', codeResponse.code);
      const response = await googleLogin({ code: codeResponse.code });
      console.log('Token recebido do backend:', response.token);
      onSuccess(response.token); 
    } catch (error) {
      console.error("Falha ao processar login com Google", error);
      alert("Erro ao fazer login com Google. Tente novamente.");
    }
  };

  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect', // Mudado de popup para redirect
    redirect_uri: window.location.origin + '/login', // URL de callback
    onSuccess: onGoogleSuccess,
    onError: errorResponse => {
      console.error('Google login error', errorResponse);
    },
  });

  return (
    <button
      type="button"
      onClick={() => loginWithGoogle()}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-md text-brand-dark dark:text-brand-light hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
    >
      <GoogleIcon />
      Entrar com Google
    </button>
  );
}

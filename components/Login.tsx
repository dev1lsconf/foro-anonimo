
import React, { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
  error: string | null;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Clear errors when switching modes or typing
  useEffect(() => {
    setFormError(null);
  }, [isRegister, username, password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (isRegister) {
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters long.');
        return;
      }
      onRegister(username.trim(), password);
    } else {
      onLogin(username.trim(), password);
    }
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            {isRegister ? 'Crea una Cuenta' : 'Bienvenido al Foro Anonimo'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {isRegister ? 'Rellena para poder entrar' : 'Entra tus credenciales'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || formError) && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md dark:bg-red-900/30 dark:border-red-500/50 dark:text-red-300">
              {error || formError}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Clave</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                required
                className={`appearance-none rounded-none ${isRegister ? '' : 'rounded-b-md'} relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                placeholder={isRegister ? "Password (min. 6 characters)" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             {isRegister && (
                 <div>
                    <label htmlFor="confirm-password" className="sr-only">Confirma clave</label>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
             )}
          </div>
          
           <div className="text-sm text-center">
             <button type="button" onClick={() => setIsRegister(!isRegister)} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                {isRegister ? 'ya tienes una cuenta Login' : "todavia no tienes una cuenta? Register"}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dans une application réelle, ceci serait connecté à une API d'authentification
    // Pour cette démonstration, nous allons simplement simuler une connexion réussie
    
    if (isLogin) {
      toast.success("Connexion réussie");
      navigate('/');
    } else {
      toast.success("Inscription réussie. Veuillez vous connecter.");
      setIsLogin(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg">
          <Shield className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">FraudGuard</h1>
          <p className="text-sm text-muted-foreground">Système de Détection de Fraude</p>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-blue-600">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? 'Connexion' : 'Créer un compte'}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? 'Saisissez vos identifiants pour accéder à votre compte.' 
              : 'Saisissez vos informations pour créer un nouveau compte.'
            }
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom complet
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </label>
                {isLogin && (
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">
                    Mot de passe oublié?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>
            <div className="text-center text-sm">
              {isLogin ? (
                <>
                  Vous n'avez pas de compte?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium"
                  >
                    Créer un compte
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        © 2023 FraudGuard. Tous droits réservés.
      </p>
    </div>
  );
};

export default Auth;

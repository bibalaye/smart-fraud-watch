
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Eye, EyeOff, Building, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'une authentification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (isLogin) {
      toast.success("Connexion réussie - Bienvenue dans FraudGuard");
      navigate('/');
    } else {
      toast.success("Compte créé avec succès. Veuillez vous connecter.");
      setIsLogin(true);
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background avec effet glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950"></div>
      
      {/* Éléments de fond animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        {/* Header avec logo */}
        <div className="text-center mb-8 fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 banking-gradient rounded-2xl shadow-2xl">
                <Shield className="w-9 h-9 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">FraudGuard</h1>
          <p className="text-muted-foreground text-sm font-medium">Plateforme de Détection de Fraude Bancaire</p>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <Building className="w-3 h-3" />
            <span>Sécurisé par l'IA • Conforme aux normes bancaires</span>
          </div>
        </div>

        {/* Carte de connexion */}
        <Card className="glass shadow-2xl border-0 slide-up">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-foreground">
              {isLogin ? 'Connexion Sécurisée' : 'Créer un Compte'}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {isLogin 
                ? 'Accédez à votre espace de travail sécurisé' 
                : 'Rejoignez notre plateforme de détection de fraude'
              }
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Nom complet
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Jean Dupont"
                      className="pl-10 h-11 bg-background/50 border-border/50 focus:bg-background transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Adresse email professionnelle
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean.dupont@banque.fr"
                    className="pl-10 h-11 bg-background/50 border-border/50 focus:bg-background transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Mot de passe
                  </label>
                  {isLogin && (
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Mot de passe oublié?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    className="pl-10 pr-10 h-11 bg-background/50 border-border/50 focus:bg-background transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  <p>Le mot de passe doit contenir au moins 8 caractères, incluant des majuscules, minuscules et chiffres.</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button 
                type="submit" 
                className="w-full h-11 banking-gradient text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {isLogin ? 'Connexion...' : 'Création...'}
                  </div>
                ) : (
                  isLogin ? 'Se connecter' : "Créer le compte"
                )}
              </Button>
              
              <div className="text-center text-sm">
                {isLogin ? (
                  <p className="text-muted-foreground">
                    Nouveau sur la plateforme?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Créer un compte
                    </button>
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Déjà membre?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Se connecter
                    </button>
                  </p>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2 fade-in">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>Conforme GDPR</span>
            <span>•</span>
            <span>Certification ISO 27001</span>
            <span>•</span>
            <span>Audit PCI DSS</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2024 FraudGuard. Technologie de pointe pour la sécurité bancaire.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

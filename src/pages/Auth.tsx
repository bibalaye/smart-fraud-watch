
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Eye, EyeOff, Building, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
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

  const features = [
    { text: "Détection IA en temps réel", icon: CheckCircle },
    { text: "Interface sécurisée et intuitive", icon: CheckCircle },
    { text: "Conformité réglementaire", icon: CheckCircle },
    { text: "Support technique 24/7", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative z-10 flex-col justify-center px-16 py-12">
        <div className="max-w-lg">
          {/* Logo et titre principal */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="flex items-center justify-center w-20 h-20 banking-gradient rounded-3xl shadow-2xl">
                <Shield className="w-11 h-11 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">FraudGuard</h1>
              <p className="text-lg text-muted-foreground font-medium">Intelligence Artificielle Anti-Fraude</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Protégez votre institution avec l'IA de nouvelle génération
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Notre plateforme utilise des algorithmes d'apprentissage automatique avancés pour détecter 
              et prévenir les fraudes en temps réel, tout en respectant les normes bancaires les plus strictes.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <feature.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-foreground font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">99.8%</div>
              <div className="text-sm text-muted-foreground">Précision</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">< 50ms</div>
              <div className="text-sm text-muted-foreground">Réponse</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center justify-center w-16 h-16 banking-gradient rounded-2xl shadow-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">FraudGuard</h1>
            <p className="text-muted-foreground">Plateforme de Détection de Fraude</p>
          </div>

          {/* Auth Card */}
          <Card className="glass border-0 shadow-2xl backdrop-blur-xl bg-card/80">
            <CardHeader className="space-y-3 pb-8">
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {isLogin ? 'Connexion Sécurisée' : 'Créer un Compte'}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {isLogin 
                    ? 'Accédez à votre espace de travail professionnel' 
                    : 'Rejoignez notre plateforme de détection de fraude'
                  }
                </CardDescription>
              </div>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">
                      Nom complet
                    </label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="name"
                        placeholder="Jean Dupont"
                        className="pl-12 h-12 bg-background/60 border-border/60 focus:bg-background focus:border-primary/50 transition-all duration-200"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Adresse email professionnelle
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean.dupont@banque.fr"
                      className="pl-12 h-12 bg-background/60 border-border/60 focus:bg-background focus:border-primary/50 transition-all duration-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Mot de passe
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
                      >
                        Mot de passe oublié?
                      </button>
                    )}
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      className="pl-12 pr-12 h-12 bg-background/60 border-border/60 focus:bg-background focus:border-primary/50 transition-all duration-200"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="bg-muted/50 p-4 rounded-lg border border-border/30">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Le mot de passe doit contenir au moins 8 caractères avec majuscules, minuscules et chiffres.
                    </p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-6 pt-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 banking-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {isLogin ? 'Connexion en cours...' : 'Création en cours...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                      <span>{isLogin ? 'Se connecter' : "Créer le compte"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
                
                <div className="text-center">
                  {isLogin ? (
                    <p className="text-muted-foreground">
                      Nouveau sur la plateforme?{' '}
                      <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
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
                        className="text-primary hover:text-primary/80 font-semibold transition-colors hover:underline"
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
          <div className="text-center mt-8 space-y-4">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building className="w-3 h-3" />
                <span>Conforme GDPR</span>
              </div>
              <span>•</span>
              <span>ISO 27001</span>
              <span>•</span>
              <span>PCI DSS</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 FraudGuard. Technologie de pointe pour la sécurité bancaire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

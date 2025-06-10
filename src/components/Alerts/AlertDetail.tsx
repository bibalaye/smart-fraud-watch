
import { ArrowLeft, MapPin, CreditCard, Building, Calendar, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  riskScore: number;
  riskLevel: 'Élevé' | 'Moyen' | 'Faible';
  status: 'En attente' | 'En cours' | 'Résolue' | 'Fermée';
  merchantName: string;
  timestamp: string;
  location: string;
  cardHolder: string;
}

interface AlertDetailProps {
  alert: Alert;
  onBack: () => void;
}

export const AlertDetail = ({ alert, onBack }: AlertDetailProps) => {
  const riskFactors = [
    { factor: 'Montant inhabituel', score: 0.85, description: 'Transaction 340% supérieure à la moyenne' },
    { factor: 'Localisation suspecte', score: 0.72, description: 'Première transaction dans cette zone' },
    { factor: 'Horaire atypique', score: 0.45, description: 'Transaction en dehors des heures habituelles' },
    { factor: 'Fréquence élevée', score: 0.68, description: '3 transactions en 10 minutes' },
  ];

  const timeline = [
    { time: '14:23:15', event: 'Alerte générée', type: 'system' },
    { time: '14:23:20', event: 'Score IA calculé (94%)', type: 'system' },
    { time: '14:25:30', event: 'Assignée à l\'analyste J. Martin', type: 'assignment' },
    { time: '14:28:45', event: 'Investigation démarrée', type: 'investigation' },
  ];

  const handleStatusChange = (newStatus: Alert['status']) => {
    console.log(`Changement de statut vers: ${newStatus}`);
    // Ici vous pourriez appeler votre API pour mettre à jour le statut
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Détail de l'Alerte</h1>
          <p className="text-muted-foreground mt-1">{alert.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Details */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Détails de la Transaction</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">ID Transaction</p>
                    <p className="font-mono font-medium">{alert.transactionId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Marchand</p>
                    <p className="font-medium">{alert.merchantName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Localisation</p>
                    <p className="font-medium">{alert.location}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Montant</p>
                  <p className="text-2xl font-bold text-foreground">
                    {alert.amount.toLocaleString()} {alert.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Porteur de carte</p>
                  <p className="font-medium">{alert.cardHolder}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Heure</p>
                    <p className="font-medium">{new Date(alert.timestamp).toLocaleString('fr-FR')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Analyse des Risques</h3>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{factor.factor}</p>
                    <p className="text-sm text-muted-foreground">{factor.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{(factor.score * 100).toFixed(0)}%</p>
                    <div className="w-16 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          factor.score > 0.7 ? "bg-red-500" :
                          factor.score > 0.5 ? "bg-yellow-500" : "bg-green-500"
                        )}
                        style={{ width: `${factor.score * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Chronologie</h3>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={cn(
                    "w-3 h-3 rounded-full mt-1",
                    event.type === 'system' ? "bg-blue-500" :
                    event.type === 'assignment' ? "bg-yellow-500" : "bg-green-500"
                  )} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{event.event}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Score */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">État de l'Alerte</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className={cn(
                  "w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center",
                  alert.riskLevel === 'Élevé' ? "bg-red-100" :
                  alert.riskLevel === 'Moyen' ? "bg-yellow-100" : "bg-green-100"
                )}>
                  <span className={cn(
                    "text-2xl font-bold",
                    alert.riskLevel === 'Élevé' ? "text-red-600" :
                    alert.riskLevel === 'Moyen' ? "text-yellow-600" : "text-green-600"
                  )}>
                    {(alert.riskScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="font-medium text-foreground">Score de Risque</p>
                <p className={cn(
                  "text-sm font-medium",
                  alert.riskLevel === 'Élevé' ? "text-red-600" :
                  alert.riskLevel === 'Moyen' ? "text-yellow-600" : "text-green-600"
                )}>
                  Risque {alert.riskLevel}
                </p>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Statut actuel</p>
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg",
                  alert.status === 'En attente' ? "bg-yellow-100 text-yellow-800" :
                  alert.status === 'En cours' ? "bg-blue-100 text-blue-800" :
                  alert.status === 'Résolue' ? "bg-green-100 text-green-800" :
                  "bg-gray-100 text-gray-800"
                )}>
                  {alert.status === 'En attente' && <AlertTriangle className="w-4 h-4" />}
                  {alert.status === 'En cours' && <AlertTriangle className="w-4 h-4" />}
                  {(alert.status === 'Résolue' || alert.status === 'Fermée') && <CheckCircle className="w-4 h-4" />}
                  <span className="font-medium">{alert.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleStatusChange('En cours')}
                className="w-full flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                Démarrer Investigation
              </button>
              <button
                onClick={() => handleStatusChange('Résolue')}
                className="w-full flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Marquer Résolue
              </button>
              <button
                onClick={() => handleStatusChange('Fermée')}
                className="w-full flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Fermer (Faux Positif)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

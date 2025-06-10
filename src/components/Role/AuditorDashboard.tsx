
import { FileText, Shield, Search, AlertTriangle } from 'lucide-react';
import { MetricCard } from '@/components/Dashboard/MetricCard';

export const AuditorDashboard = () => {
  const recentAuditEntries = [
    { timestamp: '2024-06-10 14:23:15', user: 'J. Martin', action: 'Qualification d\'alerte', target: 'ALT-2024-001', result: 'Fraude Avérée' },
    { timestamp: '2024-06-10 14:18:42', user: 'System', action: 'Déploiement modèle', target: 'Fraud Detection v2.1', result: 'Succès' },
    { timestamp: '2024-06-10 14:15:08', user: 'S. Durand', action: 'Connexion utilisateur', target: 'Interface Web', result: 'Succès' },
    { timestamp: '2024-06-10 14:12:33', user: 'Admin', action: 'Modification configuration', target: 'Seuil détection', result: 'Modifié: 0.75 → 0.80' },
  ];

  const complianceChecks = [
    { check: 'Documentation des modèles IA', status: 'Conforme', lastVerified: '2024-06-09' },
    { check: 'Pistes d\'audit complètes', status: 'Conforme', lastVerified: '2024-06-10' },
    { check: 'Gestion des accès utilisateurs', status: 'Conforme', lastVerified: '2024-06-08' },
    { check: 'Rétention des données', status: 'À vérifier', lastVerified: '2024-06-05' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Auditeur</h1>
        <p className="text-muted-foreground mt-2">Surveillance de la conformité et audit des activités</p>
      </div>

      {/* Audit Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Entrées d'Audit"
          value="1,247"
          change="+89 aujourd'hui"
          changeType="neutral"
          icon={FileText}
          gradient="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Contrôles Conformité"
          value="12"
          change="1 à vérifier"
          changeType="negative"
          icon={Shield}
          gradient="from-green-500 to-green-600"
        />
        <MetricCard
          title="Recherches Audit"
          value="34"
          change="Cette semaine"
          changeType="neutral"
          icon={Search}
          gradient="from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Anomalies Détectées"
          value="0"
          change="Aucune cette semaine"
          changeType="positive"
          icon={AlertTriangle}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Audit Entries */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Journal d'Audit Récent</h3>
          <div className="space-y-3">
            {recentAuditEntries.map((entry, index) => (
              <div key={index} className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{entry.action}</div>
                    <div className="text-sm text-muted-foreground">
                      Par: {entry.user} • Cible: {entry.target}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
                </div>
                <div className="mt-2 text-sm text-foreground">{entry.result}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">État de Conformité</h3>
          <div className="space-y-4">
            {complianceChecks.map((check, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{check.check}</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    check.status === 'Conforme' ? 'bg-green-100 text-green-800' :
                    check.status === 'À vérifier' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {check.status}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Dernière vérification: {check.lastVerified}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Search and Investigation Tools */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Outils de Recherche et Investigation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-border rounded-lg hover:bg-accent transition-colors">
            <div className="font-medium text-foreground">Recherche par Utilisateur</div>
            <div className="text-sm text-muted-foreground mt-1">Consulter l'activité d'un utilisateur spécifique</div>
          </button>
          <button className="p-4 text-left border border-border rounded-lg hover:bg-accent transition-colors">
            <div className="font-medium text-foreground">Historique des Alertes</div>
            <div className="text-sm text-muted-foreground mt-1">Traçabilité complète des alertes</div>
          </button>
          <button className="p-4 text-left border border-border rounded-lg hover:bg-accent transition-colors">
            <div className="font-medium text-foreground">Configuration Système</div>
            <div className="text-sm text-muted-foreground mt-1">Historique des modifications</div>
          </button>
        </div>
      </div>
    </div>
  );
};

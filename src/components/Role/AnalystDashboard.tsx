
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/Dashboard/MetricCard';

export const AnalystDashboard = () => {
  const myAlerts = [
    { id: 'ALT-2024-001', amount: '€15,789', score: 94, status: 'En attente', time: 'Il y a 2min' },
    { id: 'ALT-2024-003', amount: '€8,901', score: 88, status: 'En cours', time: 'Il y a 8min' },
    { id: 'ALT-2024-007', amount: '€4,567', score: 82, status: 'En attente', time: 'Il y a 15min' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Analyste</h1>
        <p className="text-muted-foreground mt-2">Vue personnalisée de votre activité de détection</p>
      </div>

      {/* Personal Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Alertes Assignées"
          value="8"
          change="3 nouvelles"
          changeType="neutral"
          icon={AlertTriangle}
          gradient="from-orange-500 to-orange-600"
        />
        <MetricCard
          title="Traitées Aujourd'hui"
          value="12"
          change="+2 vs hier"
          changeType="positive"
          icon={CheckCircle}
          gradient="from-green-500 to-green-600"
        />
        <MetricCard
          title="Temps Moyen Traitement"
          value="8.5min"
          change="-1.2min vs moyenne"
          changeType="positive"
          icon={Clock}
          gradient="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Taux Précision"
          value="96.2%"
          change="+1.5% ce mois"
          changeType="positive"
          icon={TrendingUp}
          gradient="from-purple-500 to-purple-600"
        />
      </div>

      {/* My Assigned Alerts */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mes Alertes Prioritaires</h3>
        <div className="space-y-3">
          {myAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg hover:bg-accent transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${
                  alert.score > 90 ? 'bg-red-500' :
                  alert.score > 80 ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div>
                  <div className="font-medium text-foreground">{alert.id}</div>
                  <div className="text-sm text-muted-foreground">{alert.amount}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">Score: {alert.score}%</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  alert.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Activité Récente</h3>
        <div className="space-y-3">
          {[
            { action: 'Qualification', target: 'ALT-2024-005', result: 'Faux Positif', time: 'Il y a 10min' },
            { action: 'Investigation', target: 'ALT-2024-004', result: 'Fraude Avérée', time: 'Il y a 25min' },
            { action: 'Escalade', target: 'ALT-2024-002', result: 'Vers Manager', time: 'Il y a 45min' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 border-l-2 border-primary/30 bg-primary/5 rounded-r-lg">
              <div>
                <span className="font-medium text-foreground">{activity.action}</span>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-sm text-muted-foreground">{activity.target}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{activity.result}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

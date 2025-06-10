
import { Server, Users, Shield, Database } from 'lucide-react';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const systemHealthData = [
  { time: '00:00', cpu: 45, memory: 68, api: 99.9 },
  { time: '04:00', cpu: 52, memory: 71, api: 99.8 },
  { time: '08:00', cpu: 68, memory: 78, api: 99.9 },
  { time: '12:00', cpu: 75, memory: 82, api: 99.7 },
  { time: '16:00', cpu: 71, memory: 79, api: 99.9 },
  { time: '20:00', cpu: 58, memory: 73, api: 99.8 },
];

export const AdminDashboard = () => {
  const modelVersions = [
    { name: 'Fraud Detection v2.1', status: 'Active', accuracy: '94.2%', deployed: '2024-06-08' },
    { name: 'Fraud Detection v2.0', status: 'Standby', accuracy: '92.8%', deployed: '2024-05-15' },
    { name: 'Risk Scoring v1.5', status: 'Active', accuracy: '91.5%', deployed: '2024-06-01' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Administrateur</h1>
        <p className="text-muted-foreground mt-2">Gestion système et surveillance technique</p>
      </div>

      {/* System Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Santé Système"
          value="99.8%"
          change="Tous services opérationnels"
          changeType="positive"
          icon={Server}
          gradient="from-green-500 to-green-600"
        />
        <MetricCard
          title="Utilisateurs Actifs"
          value="42"
          change="8 connectés maintenant"
          changeType="neutral"
          icon={Users}
          gradient="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Modèles Déployés"
          value="3"
          change="1 mise à jour récente"
          changeType="positive"
          icon={Shield}
          gradient="from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Base de Données"
          value="2.1TB"
          change="+50GB cette semaine"
          changeType="neutral"
          icon={Database}
          gradient="from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Système (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={systemHealthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={2} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#f59e0b" strokeWidth={2} name="Mémoire %" />
              <Line type="monotone" dataKey="api" stroke="#10b981" strokeWidth={2} name="API Uptime %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Model Management */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Gestion des Modèles IA</h3>
          <div className="space-y-4">
            {modelVersions.map((model, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{model.name}</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    model.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {model.status}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>Précision: <span className="font-medium text-foreground">{model.accuracy}</span></div>
                  <div>Déployé: <span className="font-medium text-foreground">{model.deployed}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Services Status */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">État des Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'API Gateway', status: 'Opérationnel', uptime: '99.9%', response: '45ms' },
            { name: 'Service IA', status: 'Opérationnel', uptime: '99.7%', response: '120ms' },
            { name: 'Base de Données', status: 'Opérationnel', uptime: '100%', response: '8ms' },
            { name: 'Service Alertes', status: 'Opérationnel', uptime: '99.8%', response: '32ms' },
            { name: 'Interface Web', status: 'Opérationnel', uptime: '99.9%', response: '15ms' },
            { name: 'Service Auth', status: 'Opérationnel', uptime: '99.6%', response: '28ms' },
          ].map((service, index) => (
            <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-foreground">{service.name}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <div>Uptime: {service.uptime}</div>
                <div>Réponse: {service.response}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

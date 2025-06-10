
import { useState } from 'react';
import { Settings as SettingsIcon, Brain, Users, Shield, Bell } from 'lucide-react';

export const Settings = () => {
  const [aiThreshold, setAiThreshold] = useState(0.8);
  const [autoBlock, setAutoBlock] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Administration</h1>
        <p className="text-muted-foreground mt-2">Configuration du système de détection de fraude</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Configuration */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Configuration IA</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Seuil de Détection ({(aiThreshold * 100).toFixed(0)}%)
              </label>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={aiThreshold}
                onChange={(e) => setAiThreshold(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Moins sensible</span>
                <span>Plus sensible</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Transactions avec un score supérieur à {(aiThreshold * 100).toFixed(0)}% généreront une alerte.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Blocage Automatique</p>
                <p className="text-sm text-muted-foreground">Bloquer automatiquement les transactions à haut risque</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoBlock}
                  onChange={(e) => setAutoBlock(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Bell className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Alertes Email</p>
                <p className="text-sm text-muted-foreground">Recevoir des emails pour les alertes critiques</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">État du Système</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { service: 'API Gateway', status: 'Opérationnel', uptime: '99.9%' },
              { service: 'Service IA', status: 'Opérationnel', uptime: '99.7%' },
              { service: 'Base de Données', status: 'Opérationnel', uptime: '100%' },
              { service: 'Service Alertes', status: 'Opérationnel', uptime: '99.8%' }
            ].map((service) => (
              <div key={service.service} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <span className="font-medium text-foreground">{service.service}</span>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">{service.status}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{service.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Performance */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <SettingsIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Performance Modèle</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">94.2%</p>
                <p className="text-sm text-muted-foreground">Précision</p>
              </div>
              <div className="text-center p-3 bg-accent/50 rounded-lg">
                <p className="text-2xl font-bold text-foreground">91.8%</p>
                <p className="text-sm text-muted-foreground">Rappel</p>
              </div>
            </div>
            <div className="text-center p-3 bg-accent/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground">0.87</p>
              <p className="text-sm text-muted-foreground">F1-Score</p>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Dernière évaluation: 9 juin 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

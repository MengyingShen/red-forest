import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { LayersIcon, MaximizeIcon, InfoIcon } from 'lucide-react';
// Import the actual page components
import { DataDisplay } from './pages/DataDisplay';
import { DataManagement } from './pages/DataManagement';
import { DataAnalysis } from './pages/DataAnalysis';
import { SystemSettings } from './pages/SystemSettings';
import { DataInteraction } from './pages/DataInteraction';

// These components will be implemented
// Placeholder components until the real ones are ready
const Navigation = ({ items, activePage, setActivePage }: any) => (
  <div className="mt-4">
    <ul className="space-y-1 px-2">
      {items.map((item: any) => (
        <li key={item.value}>
          <Button
            variant={activePage === item.value ? "secondary" : "ghost"}
            className={`w-full justify-start ${activePage === item.value ? 'bg-blue-600 text-white' : 'text-blue-50'}`}
            onClick={() => setActivePage(item.value)}
          >
            {item.name}
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

// Removed local DataDisplay placeholder components, using imported components

// This is now imported from './pages/SystemSettings'

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('home');
  const [mapFullscreen, setMapFullscreen] = useState<boolean>(false);
  const [systemStatusMessage] = useState<string>('System Ready');
  
  // Sample mangrove location (default center position)
  const defaultPosition = [1.3521, 103.8198]; // Global reference point
  
  // Sample monitoring point data
  const monitoringPoints = [
    { id: 1, position: { lat: 1.3531, lng: 103.8188 }, details: { name: 'Monitoring Point 1', coverage: '85%', health: 'Good' } },
    { id: 2, position: { lat: 1.3541, lng: 103.8178 }, details: { name: 'Monitoring Point 2', coverage: '75%', health: 'Fair' } },
    { id: 3, position: { lat: 1.3551, lng: 103.8168 }, details: { name: 'Monitoring Point 3', coverage: '90%', health: 'Excellent' } },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'data-management':
        return <DataManagement />;
      case 'data-interaction':
        return <DataInteraction points={monitoringPoints} />;
      case 'data-analysis':
        return <DataAnalysis />;
      case 'data-display':
        return <DataDisplay points={monitoringPoints} />;
      case 'system-settings':
        return <SystemSettings />;
      default:
        return (
          <div className="h-full flex flex-col">
            <Card className="flex-1 overflow-hidden">
              <MapContainer
                center={[defaultPosition[0], defaultPosition[1]] as [number, number]}
                zoom={15}
                zoomControl={false}
                style={{ height: '100%', width: '100%' }}
                className="bg-sky-50"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {monitoringPoints.map((point) => (
                  <Marker key={point.id} position={[point.position.lat, point.position.lng]}>
                    <Popup>
                      <div>
                        <h3 className="font-bold">{point.details.name}</h3>
                        <p>Mangrove Coverage: {point.details.coverage}</p>
                        <p>Health Status: {point.details.health}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
                <ZoomControl position="topright" />
                
                {/* Map Control Toolbar */}
                <div className="absolute top-2 right-14 bg-white p-2 rounded-md shadow-md z-[1000]">
                  <Button variant="ghost" size="icon" title="Toggle Layers">
                    <LayersIcon size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" title="Fullscreen" 
                    onClick={() => setMapFullscreen(!mapFullscreen)}>
                    <MaximizeIcon size={20} />
                  </Button>
                </div>
              </MapContainer>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* Sidebar Navigation */}
      <div className="h-full bg-gradient-to-b from-blue-700 to-green-700 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-1">Mangrove Protection Monitoring</h1>
          <p className="text-sm text-blue-100">Global Mangrove Analysis System</p>
        </div>
        
        <Navigation
          items={[
            { name: 'Home', value: 'home', icon: 'home' },
            { name: 'Data Management', value: 'data-management', icon: 'database' },
            { name: 'Data Interaction', value: 'data-interaction', icon: 'map' },
            { name: 'Data Analysis', value: 'data-analysis', icon: 'bar-chart' },
            { name: 'Data Display', value: 'data-display', icon: 'activity' },
            { name: 'System Settings', value: 'system-settings', icon: 'settings' },
          ]}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <main className="flex-1 p-4 overflow-auto">
          {renderPage()}
        </main>
        
        {/* Footer Status Bar */}
        <footer className="bg-gray-100 border-t border-gray-200 px-4 py-2 text-sm text-gray-600 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <InfoIcon size={16} />
            <span>{systemStatusMessage}</span>
          </div>
          <div>
            Version: 1.0.0 | Global Mangrove Analysis System
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;

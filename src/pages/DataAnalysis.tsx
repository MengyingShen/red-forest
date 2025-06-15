import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  LayersIcon, EyeIcon, EyeOffIcon, 
  DownloadIcon, RefreshCwIcon
} from 'lucide-react';

// Define interface for monitoring points
interface MonitoringPoint {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  details: {
    name: string;
    coverage: string;
    health: string;
  };
}

// Sample monitoring point data for demonstration purposes
const samplePoints: MonitoringPoint[] = [
  {
    id: '1',
    position: {
      lat: 1.3531,
      lng: 103.8188
    },
    details: {
      name: 'Monitoring Point 1',
      coverage: '85%',
      health: 'Good'
    }
  },
  {
    id: '2',
    position: {
      lat: 1.3541,
      lng: 103.8178
    },
    details: {
      name: 'Monitoring Point 2',
      coverage: '72%',
      health: 'Fair'
    }
  },
  {
    id: '3',
    position: {
      lat: 1.3551,
      lng: 103.8168
    },
    details: {
      name: 'Monitoring Point 3',
      coverage: '93%',
      health: 'Excellent'
    }
  }
];

const MapHeatLayer: React.FC<{ active: boolean }> = ({ active }) => {
  // Simulated heat map layer
  if (!active) return null;
  
  // These circles simulate heat map with different colors
  const heatAreas = [
    { center: [1.352, 103.817], color: 'rgba(255, 0, 0, 0.3)' },
    { center: [1.353, 103.818], color: 'rgba(255, 165, 0, 0.3)' },
    { center: [1.351, 103.818], color: 'rgba(255, 255, 0, 0.3)' },
    { center: [1.352, 103.816], color: 'rgba(0, 128, 0, 0.3)' },
  ];
  
  return (
    <>
      {heatAreas.map((area, idx) => (
        <Circle 
          key={`heat-${idx}`}
          center={[area.center[0], area.center[1]]} 
          radius={1000}
          pathOptions={{ color: area.color, fillColor: area.color, fillOpacity: 0.6 }}
        />
      ))}
    </>
  );
};

const BufferZones: React.FC<{ 
  active: boolean; 
  points: MonitoringPoint[];
  radius: number;
}> = ({ active, points, radius }) => {
  if (!active) return null;
  
  return (
    <>
      {points.map(point => (
        <Circle 
          key={`buffer-${point.id}`}
          center={[point.position.lat, point.position.lng]}
          radius={radius}
          pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
        />
      ))}
    </>
  );
};

export const DataAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('interpolation');
  const [selectedField, setSelectedField] = useState('coverage');
  const [interpolationMethod, setInterpolationMethod] = useState('kriging');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showBuffers, setShowBuffers] = useState(false);
  const [bufferRadius, setBufferRadius] = useState(100);
  const [selectedAnalysisObject, setSelectedAnalysisObject] = useState('all');
  
  // Center position for the map - centered on a global example (Singapore mangroves)
  const centerPosition: [number, number] = [1.3531, 103.8188];
  
  const handleInterpolationAnalysis = () => {
    // Simulate interpolation analysis process
    setShowHeatmap(true);
    alert('Interpolation analysis completed, results are displayed on the map');
  };
  
  const handleBufferAnalysis = () => {
    // Simulate buffer analysis process
    setShowBuffers(true);
    alert('Buffer analysis completed, results are displayed on the map');
  };
  
  const handleExportResults = () => {
    alert('Export analysis results feature will be implemented here');
  };

  const fields = [
    { value: 'coverage', label: 'Mangrove Coverage' },
    { value: 'health', label: 'Health Status' },
    { value: 'pest', label: 'Pest Quantity' },
    { value: 'height', label: 'Average Height' }
  ];
  
  const interpolationMethods = [
    { value: 'kriging', label: 'Kriging Interpolation' },
    { value: 'idw', label: 'Inverse Distance Weighting (IDW)' },
    { value: 'spline', label: 'Spline Interpolation' }
  ];
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">Data Analysis</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-blue-50 mb-4">
          <TabsTrigger value="interpolation" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Interpolation Analysis
          </TabsTrigger>
          <TabsTrigger value="buffer" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Buffer Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="interpolation" className="flex-1 flex flex-col">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Data Field</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {fields.map((field) => (
                  <option key={field.value} value={field.value}>{field.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Interpolation Method</label>
              <select
                value={interpolationMethod}
                onChange={(e) => setInterpolationMethod(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {interpolationMethods.map((method) => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleInterpolationAnalysis} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCwIcon size={16} className="mr-1" />
                Run Analysis
              </Button>
              <Button 
                variant="outline" 
                className="ml-2"
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                {showHeatmap ? <EyeOffIcon size={16} className="mr-1" /> : <EyeIcon size={16} className="mr-1" />}
                {showHeatmap ? 'Hide Results' : 'Show Results'}
              </Button>
            </div>
          </div>
          
          <Card className="flex-1 overflow-hidden">
            <MapContainer
              center={centerPosition}
              zoom={15}
              zoomControl={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              
              {/* Display all monitoring points */}
              {samplePoints.map((point) => (
                <Marker 
                  key={point.id} 
                  position={[point.position.lat, point.position.lng]}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{point.details.name}</h3>
                      <p>Mangrove Coverage: {point.details.coverage}</p>
                      <p>Health Status: {point.details.health}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Heatmap Layer */}
              <MapHeatLayer active={showHeatmap} />
              
              <div className="absolute top-5 right-5 bg-white p-2 rounded-md shadow-md z-[1000]">
                <Button variant="outline" size="sm" onClick={() => setShowBuffers(!showBuffers)}>
                  <LayersIcon size={16} className="mr-1" />
                  {showBuffers ? 'Hide Buffer Zones' : 'Show Buffer Zones'}
                </Button>
              </div>
              
              {/* Legend */}
              {showHeatmap && (
                <div className="absolute bottom-2 right-2 p-2 bg-white rounded shadow-md">
                  <div className="text-xs font-medium mb-1">Buffer Radius: {bufferRadius}m</div>
                  <div className="text-xs">Affected Area: {Math.PI * bufferRadius * bufferRadius / 1000000} km²</div>
                </div>
              )}
            </MapContainer>
          </Card>
          
          {showHeatmap && (
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleExportResults}>
                <DownloadIcon size={16} className="mr-1" />
                Export Analysis Results
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="buffer" className="flex-1 flex flex-col">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Analysis Object</label>
              <select
                value={selectedAnalysisObject}
                onChange={(e) => setSelectedAnalysisObject(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="all">All Monitoring Points</option>
                <option value="1">Monitoring Point 1</option>
                <option value="2">Monitoring Point 2</option>
                <option value="3">Monitoring Point 3</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Buffer Distance (m)</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="range"
                  min="10"
                  max="1000"
                  value={bufferRadius}
                  onChange={(e) => setBufferRadius(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm w-12">{bufferRadius} m</span>
              </div>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleBufferAnalysis} className="bg-blue-600 hover:bg-blue-700">
                <RefreshCwIcon size={16} className="mr-1" />
                Run Analysis
              </Button>
              <Button 
                variant="outline" 
                className="ml-2"
                onClick={() => setShowBuffers(!showBuffers)}
              >
                {showBuffers ? <EyeOffIcon size={16} className="mr-1" /> : <EyeIcon size={16} className="mr-1" />}
                {showBuffers ? 'Hide Results' : 'Show Results'}
              </Button>
            </div>
          </div>
          
          <Card className="flex-1 overflow-hidden">
            <MapContainer
              center={centerPosition}
              zoom={15}
              zoomControl={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              
              {/* Display all monitoring points */}
              {samplePoints.map((point) => (
                <Marker 
                  key={point.id} 
                  position={[point.position.lat, point.position.lng]}
                >
                  <Popup>
                    <div>
                      <h3 className="font-bold">{point.details.name}</h3>
                      <p>Mangrove Coverage: {point.details.coverage}</p>
                      <p>Health Status: {point.details.health}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Buffer Zones */}
              <BufferZones 
                active={showBuffers} 
                points={selectedAnalysisObject === 'all' 
                  ? samplePoints 
                  : samplePoints.filter(p => p.id.toString() === selectedAnalysisObject)} 
                radius={bufferRadius}
              />
              
              {/* Map controls are displayed in the UI */}
              
              {/* Map controls */}
              <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md z-[1000]">
                <Button variant="ghost" size="icon" title="Toggle Layers">
                  <LayersIcon size={20} />
                </Button>
              </div>
            </MapContainer>
          </Card>
          
          {showBuffers && (
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleExportResults}>
                <DownloadIcon size={16} className="mr-1" />
                导出分析结果
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

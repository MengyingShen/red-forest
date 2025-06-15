import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SearchIcon, HomeIcon, ImageIcon, LayersIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

// Define interface for monitoring points
interface MonitoringPoint {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  details: any;
}

interface DataInteractionProps {
  points: MonitoringPoint[];
}

// Custom map controls component
const MapControls: React.FC = () => {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
  };
  
  const handleReset = () => {
    map.setView([1.3531, 103.8188], 15);
  };
  
  return (
    <div className="absolute bottom-5 right-5 bg-white p-2 rounded-md shadow-md z-[1000] flex flex-col space-y-2">
      <Button variant="ghost" size="sm" onClick={handleZoomIn} title="Zoom In">+</Button>
      <Button variant="ghost" size="sm" onClick={handleZoomOut} title="Zoom Out">-</Button>
      <Button variant="ghost" size="sm" onClick={handleReset} title="Reset View">
        <HomeIcon size={14} />
      </Button>
    </div>
  );
};

export const DataInteraction: React.FC<DataInteractionProps> = ({ points }) => {
  const [selectedPoint, setSelectedPoint] = useState<MonitoringPoint | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Center position for the map (Global example - Singapore mangroves)
  const centerPosition: [number, number] = [1.3531, 103.8188];
  
  const handlePointClick = (point: MonitoringPoint) => {
    setSelectedPoint(point);
    setShowDialog(true);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Find point by id or name
    const foundPoint = points.find(
      p => p.details.name.includes(searchQuery) || 
      (p.id.toString() === searchQuery)
    );
    
    if (foundPoint) {
      setSelectedPoint(foundPoint);
      setShowDialog(true);
    } else {
      alert('No matching monitoring point found');
    }
  };
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">Data Interaction</h1>
      
      <div className="flex items-center mb-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter monitoring point name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button type="submit" variant="outline">
            <SearchIcon size={16} className="mr-1" />
            Search
          </Button>
        </form>
      </div>
      
      <Card className="flex-1 overflow-hidden relative">
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
          {points.map((point) => (
            <Marker 
              key={point.id} 
              position={[point.position.lat, point.position.lng]}
              eventHandlers={{
                click: () => handlePointClick(point),
              }}
            />
          ))}
          
          {/* Custom map controls */}
          <MapControls />
          
          {/* Layer control buttons */}
          <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md z-[1000]">
            <Button variant="ghost" size="icon" title="Toggle Layers">
              <LayersIcon size={20} />
            </Button>
          </div>
        </MapContainer>
      </Card>
      
      {/* Monitoring point details dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Monitoring Point {selectedPoint?.id} Details</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Monitoring Point ID</p>
                  <p className="font-medium">FT{String(selectedPoint?.id).padStart(3, '0')}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Coordinates</p>
                  <p className="font-medium">
                    {selectedPoint?.position.lat.toFixed(4)}, {selectedPoint?.position.lng.toFixed(4)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Mangrove Coverage</p>
                  <p className="font-medium">{selectedPoint?.details.coverage}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Health Status</p>
                  <p className="font-medium">{selectedPoint?.details.health}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Survey Date</p>
                  <p className="font-medium">2025-05-10</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Pest Situation</p>
                  <p className="font-medium">Minor</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Monitoring Point Description</h3>
                <p className="text-sm text-gray-600">
                  This monitoring point is located in zone {selectedPoint?.details.name.slice(-1)} of the mangrove conservation area,
                  primarily monitoring mangrove growth conditions, coverage changes, and pest situations. Recent surveys show that
                  the mangrove growth in this area is {selectedPoint?.details.health}, pest situation is minor,
                  and the overall ecosystem is in a healthy state.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="images">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-100 h-40 flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                  <div className="p-2 border-t">
                    <p className="text-sm font-medium">Aerial Photo of Monitoring Point</p>
                    <p className="text-xs text-gray-500">Taken on 2025-05-10</p>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gray-100 h-40 flex items-center justify-center">
                    <ImageIcon size={48} className="text-gray-400" />
                  </div>
                  <div className="p-2 border-t">
                    <p className="text-sm font-medium">Ground Photo of Monitoring Point</p>
                    <p className="text-xs text-gray-500">Taken on 2025-05-10</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm">
                  <ChevronLeftIcon size={16} />
                </Button>
                <span className="mx-4 text-sm">1/3</span>
                <Button variant="outline" size="sm">
                  <ChevronRightIcon size={16} />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="charts">
              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium">Historical Coverage Changes</h3>
                <div className="bg-gray-100 h-40 flex items-center justify-center">
                  <p className="text-gray-500">Chart will be displayed here</p>
                </div>
              </div>
              
              <div className="border rounded-md p-4 space-y-4 mt-4">
                <h3 className="font-medium">Pest Quantity Trend</h3>
                <div className="bg-gray-100 h-40 flex items-center justify-center">
                  <p className="text-gray-500">Chart will be displayed here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

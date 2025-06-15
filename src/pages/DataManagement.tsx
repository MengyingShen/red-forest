import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { UploadIcon, FileIcon, PlusIcon, TrashIcon, RefreshCwIcon, DownloadIcon } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('spatial-data');
  
  // Mock data for spatial data files
  const [spatialFiles, setSpatialFiles] = useState([
    { id: 1, name: 'Mangrove_Boundaries.shp', type: 'Shapefile', size: '2.5MB', date: '2025-04-15' },
    { id: 2, name: 'Monitoring_Points.geojson', type: 'GeoJSON', size: '0.8MB', date: '2025-04-18' },
    { id: 3, name: 'Water_Quality_Network.kml', type: 'KML', size: '1.2MB', date: '2025-05-01' },
  ]);
  
  // Mock data for ground survey records
  const [groundSurveyData, setGroundSurveyData] = useState([
    { 
      id: 1, 
      pointId: 'MG001', 
      latitude: 1.3531, 
      longitude: 103.8188, 
      species: 'Avicennia marina', 
      height: 3.2, 
      dbh: 6.5, 
      crownWidth: 2.8, 
      health: 'Good', 
      date: '2025-05-10'
    },
    { 
      id: 2, 
      pointId: 'MG002', 
      latitude: 1.3541, 
      longitude: 103.8178, 
      species: 'Rhizophora stylosa', 
      height: 2.8, 
      dbh: 5.2, 
      crownWidth: 2.3, 
      health: 'Fair', 
      date: '2025-05-10'
    },
    { 
      id: 3, 
      pointId: 'MG003', 
      latitude: 1.3551, 
      longitude: 103.8168, 
      species: 'Bruguiera gymnorhiza', 
      height: 4.1, 
      dbh: 7.8, 
      crownWidth: 3.4, 
      health: 'Excellent', 
      date: '2025-05-10'
    },
  ]);

  // Mock function for uploading spatial data
  const handleUploadSpatial = () => {
    alert('Upload spatial data functionality will be implemented here');
  };

  // Mock function for adding survey data
  const handleAddSurveyData = () => {
    alert('Add ground survey data functionality will be implemented here');
  };

  // Mock function for importing data from Excel
  const handleImportData = () => {
    alert('Batch import data functionality will be implemented here');
  };

  // Mock function for exporting data
  const handleExportData = () => {
    alert('Export data functionality will be implemented here');
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">Data Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-blue-50 mb-4">
          <TabsTrigger value="spatial-data" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Spatial Data Management
          </TabsTrigger>
          <TabsTrigger value="survey-data" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Mangrove Ground Survey Data
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="spatial-data" className="flex-1 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder="Search files..." className="w-64" />
              <Button variant="outline" size="sm">
                <RefreshCwIcon size={16} className="mr-1" />
                Refresh
              </Button>
            </div>
            <Button onClick={handleUploadSpatial}>
              <UploadIcon size={16} className="mr-1" />
              Upload Spatial Data
            </Button>
          </div>
          
          <Card className="p-4 flex-1">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-2 border-b">File Name</th>
                    <th className="text-left p-2 border-b">Type</th>
                    <th className="text-left p-2 border-b">Size</th>
                    <th className="text-left p-2 border-b">Upload Date</th>
                    <th className="text-left p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {spatialFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">
                        <div className="flex items-center">
                          <FileIcon size={16} className="mr-2 text-blue-600" />
                          {file.name}
                        </div>
                      </td>
                      <td className="p-2 border-b">{file.type}</td>
                      <td className="p-2 border-b">{file.size}</td>
                      <td className="p-2 border-b">{file.date}</td>
                      <td className="p-2 border-b">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Preview</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <TrashIcon size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="survey-data" className="flex-1 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder="Search monitoring points..." className="w-64" />
              <Button variant="outline" size="sm">
                <RefreshCwIcon size={16} className="mr-1" />
                Refresh
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddSurveyData}>
                <PlusIcon size={16} className="mr-1" />
                Add Data
              </Button>
              <Button variant="outline" onClick={handleImportData}>
                <UploadIcon size={16} className="mr-1" />
                Batch Import
              </Button>
              <Button variant="outline" onClick={handleExportData}>
                <DownloadIcon size={16} className="mr-1" />
                Export Data
              </Button>
            </div>
          </div>
          
          <Card className="p-4 flex-1">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-2 border-b">Monitoring ID</th>
                    <th className="text-left p-2 border-b">Latitude</th>
                    <th className="text-left p-2 border-b">Longitude</th>
                    <th className="text-left p-2 border-b">Species</th>
                    <th className="text-left p-2 border-b">Height (m)</th>
                    <th className="text-left p-2 border-b">DBH (cm)</th>
                    <th className="text-left p-2 border-b">Crown Width (m)</th>
                    <th className="text-left p-2 border-b">Health Status</th>
                    <th className="text-left p-2 border-b">Survey Date</th>
                    <th className="text-left p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groundSurveyData.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{record.pointId}</td>
                      <td className="p-2 border-b">{record.latitude}</td>
                      <td className="p-2 border-b">{record.longitude}</td>
                      <td className="p-2 border-b">{record.species}</td>
                      <td className="p-2 border-b">{record.height}</td>
                      <td className="p-2 border-b">{record.dbh}</td>
                      <td className="p-2 border-b">{record.crownWidth}</td>
                      <td className="p-2 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs 
                          ${record.health === '优秀' ? 'bg-green-100 text-green-800' : 
                            record.health === '良好' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {record.health}
                        </span>
                      </td>
                      <td className="p-2 border-b">{record.date}</td>
                      <td className="p-2 border-b">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <TrashIcon size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>Showing 1-3 of 3 records</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

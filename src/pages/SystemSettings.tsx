import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  UserIcon, UserPlusIcon, TrashIcon, EditIcon, 
  SaveIcon, RefreshCwIcon, HelpCircleIcon, LinkIcon
} from 'lucide-react';

interface User {
  id: number;
  username: string;
  fullName: string;
  role: string;
  lastLogin: string;
  status: string;
}

export const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('user-management');
  
  // Mock user data
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      username: 'admin', 
      fullName: 'Admin User', 
      role: 'System Administrator', 
      lastLogin: '2025-05-20 09:30', 
      status: 'Active' 
    },
    { 
      id: 2, 
      username: 'researcher', 
      fullName: 'Jane Researcher', 
      role: 'Data Analyst', 
      lastLogin: '2025-05-19 15:45', 
      status: 'Active' 
    },
    { 
      id: 3, 
      username: 'field_worker', 
      fullName: 'John Surveyor', 
      role: 'Field Surveyor', 
      lastLogin: '2025-05-18 10:15', 
      status: 'Active' 
    },
  ]);
  
  // Mock functions
  const handleAddUser = () => {
    alert('Add user functionality will be implemented here');
  };
  
  const handleDeleteUser = (userId: number) => {
    alert(`Delete user ID: ${userId} functionality will be implemented here`);
  };
  
  const handleEditUser = (userId: number) => {
    alert(`Edit user ID: ${userId} functionality will be implemented here`);
  };
  
  const handleSaveSettings = () => {
    alert('Save settings functionality will be implemented here');
  };
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">System Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-blue-50 mb-4">
          <TabsTrigger value="user-management" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            User Management
          </TabsTrigger>
          <TabsTrigger value="system-params" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            System Parameters
          </TabsTrigger>
          <TabsTrigger value="help" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            System Help
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="user-management" className="flex-1 flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder="Search users..." className="w-64" />
              <Button variant="outline" size="sm">
                <RefreshCwIcon size={16} className="mr-1" />
                Refresh
              </Button>
            </div>
            <Button onClick={handleAddUser}>
              <UserPlusIcon size={16} className="mr-1" />
              Add User
            </Button>
          </div>
          
          <Card className="p-4 flex-1">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-2 border-b">Username</th>
                    <th className="text-left p-2 border-b">Full Name</th>
                    <th className="text-left p-2 border-b">Role</th>
                    <th className="text-left p-2 border-b">Last Login</th>
                    <th className="text-left p-2 border-b">Status</th>
                    <th className="text-left p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">
                        <div className="flex items-center">
                          <UserIcon size={16} className="mr-2 text-blue-600" />
                          {user.username}
                        </div>
                      </td>
                      <td className="p-2 border-b">{user.fullName}</td>
                      <td className="p-2 border-b">
                        <span className={`px-2 py-1 rounded-full text-xs 
                          ${user.role === 'System Administrator' ? 'bg-blue-100 text-blue-800' : 
                            user.role === 'Data Analyst' ? 'bg-green-100 text-green-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-2 border-b">{user.lastLogin}</td>
                      <td className="p-2 border-b">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {user.status}
                        </span>
                      </td>
                      <td className="p-2 border-b">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditUser(user.id)}
                          >
                            <EditIcon size={14} className="mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <TrashIcon size={14} className="mr-1" />
                            Delete
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
        
        <TabsContent value="system-params" className="flex-1 flex flex-col space-y-4">
          <Card className="p-6 flex-1">
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-4">System Parameter Configuration</h2>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">System Name</label>
                    <Input defaultValue="Global Mangrove Analysis System" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">System Version</label>
                    <Input defaultValue="1.0.0" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Data Backup Path</label>
                    <Input defaultValue="/backup/data" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Maximum Data Processing Capacity</label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Automatic Backup Frequency (hours)</label>
                    <Input type="number" defaultValue="24" />
                  </div>
                  
                  <div className="pt-2">
                    <Button onClick={handleSaveSettings}>
                      <SaveIcon size={16} className="mr-1" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </Card>
              
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Data Analysis Parameters</h2>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Default Interpolation Method</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Kriging Interpolation</option>
                    <option>Inverse Distance Weighting</option>
                    <option>Spline Interpolation</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Default Buffer Radius (meters)</label>
                  <Input type="number" value="200" min="50" max="1000" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Heatmap Color Gradient</label>
                  <div className="flex space-x-2">
                    <Input type="color" value="#ef4444" className="w-10 h-10" />
                    <Input type="color" value="#eab308" className="w-10 h-10" />
                    <Input type="color" value="#22c55e" className="w-10 h-10" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Data Precision (decimal places)</label>
                  <Input type="number" value="2" min="0" max="10" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="mr-2">Reset Default Values</Button>
              <Button onClick={handleSaveSettings}>
                <SaveIcon size={16} className="mr-1" />
                Save Settings
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="help" className="flex-1 flex flex-col space-y-4">
          <Card className="p-6 flex-1">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">System Introduction</h2>
                <div>
                  <p>
                    The Global Mangrove Analysis System is a comprehensive platform for managing and analyzing mangrove data globally.
                    The system includes multiple functional modules, including data management, data interaction, data analysis, and data display.
                  </p>
                  
                  <h3 className="text-md font-medium mt-4 mb-2">Main Features</h3>
                  <ul className="space-y-1 list-disc pl-5">
                    <li><strong>Data Management</strong>: Used for adding, deleting, modifying and viewing mangrove ground survey data, spatial data, etc.</li>
                    <li><strong>Data Interaction</strong>: Provides basic map operations, such as zooming, panning, and selecting, querying, and popup functionality for monitoring points.</li>
                    <li><strong>Data Analysis</strong>: Includes interpolation analysis, buffer analysis, and other functions.</li>
                    <li><strong>Data Display</strong>: Used to display monitoring point survey and analysis results, heat map display, and 3D visualization.</li>
                    <li><strong>System Settings</strong>: Used for user management, permission settings, etc.</li>
                  </ul>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="flex items-center">
                    <LinkIcon size={16} className="mr-1" />
                    View Complete User Manual
                  </Button>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-4">Online Help</h2>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 bg-blue-50">
                    <h3 className="font-medium flex items-center">
                      <HelpCircleIcon size={16} className="mr-1 text-blue-600" />
                      How to add new monitoring point data?
                    </h3>
                    <p className="text-sm mt-2">
                      Go to the "Data Management" page, select the "Mangrove Ground Survey Data" tab,
                      click the "Add Data" button, fill in the relevant information in the pop-up form, and submit.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-blue-50">
                    <h3 className="font-medium flex items-center">
                      <HelpCircleIcon size={16} className="mr-1 text-blue-600" />
                      How to perform interpolation analysis?
                    </h3>
                    <p className="text-sm mt-2">
                      Go to the "Data Analysis" page, select the "Interpolation Analysis" tab,
                      select the data field and interpolation method you want to analyze, and click the "Run Analysis" button.
                      The analysis results will be displayed on the map as a heat map.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-blue-50">
                    <h3 className="font-medium flex items-center">
                      <HelpCircleIcon size={16} className="mr-1 text-blue-600" />
                      How to export analysis results?
                    </h3>
                    <p className="text-sm mt-2">
                      After completing the analysis on the data analysis page, click the "Export Analysis Results" button at the bottom of the page,
                      select the export format (such as Shapefile, GeoJSON, etc.), then click confirm to download the exported file.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Have other questions? Please contact the system administrator</p>
                  <Input type="email" placeholder="Enter your email address..." />
                  <Button className="mt-2 w-full">
                    Submit Question
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

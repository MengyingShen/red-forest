import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  BarChart2Icon, PieChartIcon, LineChartIcon, 
  EyeIcon, LayersIcon, Boxes, TableIcon
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

// Define interface for monitoring points
interface MonitoringPoint {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  details: any;
}

interface DataDisplayProps {
  points: MonitoringPoint[];
}

// 模拟热图层
const HeatmapLayer: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-yellow-500/20 to-green-500/20 pointer-events-none">
      <div className="absolute bottom-5 right-5 bg-white p-2 rounded-md shadow-md z-[1000]">
        <h3 className="text-sm font-medium mb-2">红树林覆盖度</h3>
        <div className="flex items-center space-x-1">
          <div className="w-full h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded"></div>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span>低</span>
          <span>高</span>
        </div>
      </div>
    </div>
  );
};

export const DataDisplay: React.FC<DataDisplayProps> = ({ points }) => {
  const [activeTab, setActiveTab] = useState('table');
  const [coverageChartType, setCoverageChartType] = useState<'bar' | 'line'>('bar');
  const [healthChartType, setHealthChartType] = useState<'pie' | 'donut'>('pie');
  
  // Get coverage chart configuration
  const getCoverageChartOption = () => {
    // Location data
    const locationData = [
      { name: 'Site A', value: 85, color: '#3b82f6' },
      { name: 'Site B', value: 75, color: '#60a5fa' },
      { name: 'Site C', value: 90, color: '#2563eb' },
      { name: 'Site D', value: 68, color: '#93c5fd' },
      { name: 'Site E', value: 82, color: '#1d4ed8' },
    ];

    if (coverageChartType === 'bar') {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}%'
        },
        xAxis: {
          type: 'category',
          data: locationData.map(item => item.name),
          axisLabel: {
            rotate: 0,
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Cover Rate(%)',
          nameTextStyle: {
            color: '#666'
          },
          axisLabel: {
            formatter: '{value}%',
            color: '#666'
          },
          max: 100
        },
        series: [{
          data: locationData.map(item => ({
            value: item.value,
            itemStyle: {
              color: item.color
            }
          })),
          type: 'bar',
          barWidth: '40%',
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          }
        }]
      };
    } else {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}%'
        },
        xAxis: {
          type: 'category',
          data: locationData.map(item => item.name),
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          name: 'Cover Rate(%)',
          nameTextStyle: {
            color: '#666'
          },
          axisLabel: {
            formatter: '{value}%',
            color: '#666'
          },
          min: 60,
          max: 100
        },
        series: [{
          data: locationData.map(item => item.value),
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#3b82f6'
          },
          symbol: 'circle',
          symbolSize: 8,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(59, 130, 246, 0.5)'
              }, {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.1)'
              }]
            }
          }
        }]
      };
    }
  };

  // Get health status chart configuration
  const getHealthChartOption = () => {
    const healthData = [
      { value: 45, name: 'Excellent', itemStyle: { color: '#22c55e' } },
      { value: 30, name: 'Good', itemStyle: { color: '#3b82f6' } },
      { value: 15, name: 'Fair', itemStyle: { color: '#eab308' } },
      { value: 10, name: 'Poor', itemStyle: { color: '#ef4444' } }
    ];

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}% ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: healthData.map(item => item.name)
      },
      series: [{
        name: 'Health Status',
        type: 'pie',
        radius: healthChartType === 'pie' ? '70%' : ['40%', '70%'],
        center: ['40%', '50%'],
        data: healthData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}: {c}%'
        }
      }]
    };
  };

  // Get trends chart configuration
  const getTrendsChartOption = () => {
    const months = ['Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025'];
    const coverageData = [78, 80, 82, 85, 83, 87];
    const pestsData = [12, 10, 8, 5, 6, 4];

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        right: '5%',
        left: '5%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        data: months,
        axisLabel: {
          rotate: 30,
          color: '#666'
        }
      },
      yAxis: [{
        type: 'value',
        name: 'Coverage (%)',
        position: 'left',
        axisLabel: {
          formatter: '{value}%',
          color: '#666'
        },
        nameTextStyle: {
          color: '#3b82f6'
        },
        min: 70,
        max: 90
      }, {
        type: 'value',
        name: 'Pest Count',
        position: 'right',
        axisLabel: {
          formatter: '{value}',
          color: '#666'
        },
        nameTextStyle: {
          color: '#ef4444'
        },
        min: 0,
        max: 15
      }],
      series: [{
        name: 'Mangrove Coverage',
        type: 'line',
        smooth: true,
        data: coverageData,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#3b82f6'
        },
        itemStyle: {
          color: '#3b82f6'
        }
      }, {
        name: 'Pest Count',
        type: 'line',
        yAxisIndex: 1,
        data: pestsData,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#ef4444'
        },
        itemStyle: {
          color: '#ef4444'
        }
      }]
    };
  };
  
  // Center position for the map (Futian Mangrove)
  const centerPosition: [number, number] = [22.5257, 114.0382];
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-blue-800">Data Display</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-blue-50 mb-4">
          <TabsTrigger value="table" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <TableIcon size={16} className="mr-1" />
            Table View
          </TabsTrigger>
          <TabsTrigger value="chart" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <BarChart2Icon size={16} className="mr-1" />
            Chart View
          </TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <LayersIcon size={16} className="mr-1" />
            Map Markers
          </TabsTrigger>
          <TabsTrigger value="heatmap" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <EyeIcon size={16} className="mr-1" />
            Heat Map
          </TabsTrigger>
          <TabsTrigger value="3d" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Boxes size={16} className="mr-1" />
            3D View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="flex-1">
          <Card className="p-4 flex-1">
            <h2 className="text-lg font-semibold mb-4">Monitoring Points Data Table</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="text-left p-2 border-b">Monitoring ID</th>
                    <th className="text-left p-2 border-b">Longitude</th>
                    <th className="text-left p-2 border-b">Latitude</th>
                    <th className="text-left p-2 border-b">Mangrove Coverage</th>
                    <th className="text-left p-2 border-b">Health Status</th>
                    <th className="text-left p-2 border-b">Pest Count</th>
                    <th className="text-left p-2 border-b">Last Monitored</th>
                  </tr>
                </thead>
                <tbody>
                  {points.map((point) => (
                    <tr key={point.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">FT{String(point.id).padStart(3, '0')}</td>
                      <td className="p-2 border-b">{point.position.lng.toFixed(4)}</td>
                      <td className="p-2 border-b">{point.position.lat.toFixed(4)}</td>
                      <td className="p-2 border-b">{point.details.coverage}</td>
                      <td className="p-2 border-b">{point.details.health}</td>
                      <td className="p-2 border-b">
                        {point.details.health === 'Excellent' ? 'Low' : 
                         point.details.health === 'Good' ? 'Medium' : 'High'}
                      </td>
                      <td className="p-2 border-b">2025-05-10</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="chart" className="flex-1 grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mangrove Coverage Distribution</h2>
              <div className="flex space-x-2">
                <Button 
                  variant={coverageChartType === 'bar' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setCoverageChartType('bar')}
                >
                  <BarChart2Icon size={14} className="mr-1" />
                  Bar Chart
                </Button>
                <Button 
                  variant={coverageChartType === 'line' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setCoverageChartType('line')}
                >
                  <LineChartIcon size={14} className="mr-1" />
                  Line Chart
                </Button>
              </div>
            </div>
            <div className="h-64 bg-slate-50 border rounded-md overflow-hidden">
              <ReactECharts 
                option={getCoverageChartOption()} 
                style={{ height: '100%' }} 
                className="w-full"
              />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mangrove Health Status Distribution</h2>
              <div className="flex space-x-2">
                <Button 
                  variant={healthChartType === 'pie' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setHealthChartType('pie')}
                >
                  <PieChartIcon size={14} className="mr-1" />
                  Pie Chart
                </Button>
                <Button 
                  variant={healthChartType === 'donut' ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setHealthChartType('donut')}
                >
                  <PieChartIcon size={14} className="mr-1" />
                  Donut Chart
                </Button>
              </div>
            </div>
            <div className="h-64 bg-slate-50 border rounded-md overflow-hidden">
              <ReactECharts 
                option={getHealthChartOption()} 
                style={{ height: '100%' }} 
                className="w-full"
              />
            </div>
          </Card>
          
          <Card className="p-4 col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mangrove Coverage vs Pest Relationship Trend</h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                  <span className="text-xs">Coverage</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  <span className="text-xs">Pest Count</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>Showing 1-3 of 3 records</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </div>
            <div className="h-64 bg-slate-50 border rounded-md overflow-hidden">
              <ReactECharts 
                option={getTrendsChartOption()} 
                style={{ height: '100%' }} 
                className="w-full"
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="map" className="flex-1">
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
              
              {/* 带自定义图标的监测点 */}
              {points.map((point) => (
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
              
              <ZoomControl position="topright" />
              
              {/* 图例 */}
              <div className="absolute bottom-5 right-5 bg-white p-2 rounded-md shadow-md z-[1000]">
                <h3 className="text-sm font-medium mb-2">Monitoring Point Health Status</h3>
                <div className="flex items-center mb-1">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs">Excellent</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs">Good</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-xs">Fair</span>
                </div>
              </div>
            </MapContainer>
          </Card>
        </TabsContent>
        
        <TabsContent value="heatmap" className="flex-1">
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
              
              {/* 热图层 */}
              <HeatmapLayer />
              
              <ZoomControl position="topright" />
            </MapContainer>
            
            <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-md z-[1000]">
              <select className="text-sm p-1 border rounded">
                <option>Mangrove Coverage Heatmap</option>
                <option>Pest Distribution Heatmap</option>
                <option>Health Index Heatmap</option>
              </select>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="3d" className="flex-1">
          <Card className="flex-1 overflow-hidden relative">
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-green-900 text-white">
              <div className="text-center">
                <Boxes size={48} className="mx-auto mb-4 opacity-50" />
                <h2 className="text-xl font-bold mb-2">3D Visualization</h2>
                <p className="text-sm opacity-70 max-w-md mx-auto">
                  This area will integrate 3D map visualization to display the mangrove protection area's
                  topography and spatial distribution. You can rotate, tilt, and zoom the map using mouse controls.
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-5 right-5 bg-white p-2 rounded-md shadow-md z-[1000]">
              <h3 className="text-sm font-medium mb-2">Layer Controls</h3>
              <div className="space-y-1">
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" checked /> Mangrove Coverage
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" checked /> Elevation Data
                </label>
                <label className="flex items-center text-xs">
                  <input type="checkbox" className="mr-1" checked /> Pest Distribution
                </label>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

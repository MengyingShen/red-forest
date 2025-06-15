import React from 'react';
import { 
  HomeIcon, DatabaseIcon, MapIcon, BarChart2Icon, 
  ActivityIcon, SettingsIcon, ChevronRightIcon 
} from 'lucide-react';
import { Button } from './ui/button';

interface NavigationItem {
  name: string;
  value: string;
  icon: string;
}

interface NavigationProps {
  items: NavigationItem[];
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
  items, 
  activePage, 
  setActivePage 
}) => {
  // Map icon names to actual components
  const getIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case 'home':
        return <HomeIcon size={size} />;
      case 'database':
        return <DatabaseIcon size={size} />;
      case 'map':
        return <MapIcon size={size} />;
      case 'bar-chart':
        return <BarChart2Icon size={size} />;
      case 'activity':
        return <ActivityIcon size={size} />;
      case 'settings':
        return <SettingsIcon size={size} />;
      default:
        return <ChevronRightIcon size={size} />;
    }
  };

  return (
    <nav className="mt-4">
      <ul className="space-y-1 px-2">
        {items.map((item) => (
          <li key={item.value}>
            <Button
              variant={activePage === item.value ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                activePage === item.value 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'text-blue-50 hover:bg-blue-600/40'
              }`}
              onClick={() => setActivePage(item.value)}
            >
              <span className="mr-2">{getIcon(item.icon)}</span>
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

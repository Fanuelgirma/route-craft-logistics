
import { useRef, useEffect } from 'react';
import { TripPlan, RouteStop } from '@/types/routing';
import { MapPin, Layers, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoutingMapViewProps {
  tripPlan: TripPlan;
  activeStep: string;
}

export default function RoutingMapView({ tripPlan, activeStep }: RoutingMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';
    
    // Create main map container
    const mapVisual = document.createElement('div');
    mapVisual.style.width = '100%';
    mapVisual.style.height = '100%';
    mapVisual.style.position = 'relative';
    mapVisual.style.backgroundImage = "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/151.2093,-33.8688,12,0/1000x1000?access_token=pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNrbzN1N2kwMDA1YnAyb3MwNWJlYnRqZ3kifQ.hHiDlJ7ax-RMBnzfEZP1BQ')";
    mapVisual.style.backgroundSize = 'cover';
    mapVisual.style.backgroundPosition = 'center';
    
    mapContainer.appendChild(mapVisual);
    
    // Add markers based on the selected stops
    if (tripPlan.selectedStops?.length > 0) {
      tripPlan.selectedStops.forEach((stop, index) => {
        const marker = document.createElement('div');
        marker.className = 'absolute flex items-center justify-center';
        marker.style.width = '24px';
        marker.style.height = '24px';
        marker.style.borderRadius = '50%';
        marker.style.backgroundColor = 'rgba(59, 130, 246, 0.9)';
        marker.style.color = 'white';
        marker.style.fontWeight = 'bold';
        marker.style.fontSize = '12px';
        marker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        marker.style.border = '2px solid white';
        marker.style.transition = 'all 0.2s ease';
        marker.style.cursor = 'pointer';
        marker.textContent = (index + 1).toString();
        
        // Random positions for demo purposes
        marker.style.top = `${20 + Math.random() * 60}%`;
        marker.style.left = `${20 + Math.random() * 60}%`;
        
        marker.addEventListener('mouseover', () => {
          marker.style.transform = 'scale(1.2)';
        });
        
        marker.addEventListener('mouseout', () => {
          marker.style.transform = 'scale(1)';
        });
        
        mapVisual.appendChild(marker);
      });
    }
    
    // If we have routes and are on the Trip Summary step, show route lines
    if (tripPlan.routes?.length > 0 && activeStep === 'Trip Summary') {
      const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgContainer.setAttribute('width', '100%');
      svgContainer.setAttribute('height', '100%');
      svgContainer.style.position = 'absolute';
      svgContainer.style.top = '0';
      svgContainer.style.left = '0';
      svgContainer.style.pointerEvents = 'none';
      
      const routeColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
      
      tripPlan.routes.forEach((route, idx) => {
        // Create a random path for demo purposes
        const points = [];
        const numPoints = 5 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < numPoints; i++) {
          const x = 50 + Math.random() * 700;
          const y = 50 + Math.random() * 700;
          points.push(`${x},${y}`);
        }
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        path.setAttribute('points', points.join(' '));
        path.setAttribute('stroke', routeColors[idx % routeColors.length]);
        path.setAttribute('stroke-width', '4');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('stroke-dasharray', '1, 0');
        
        // Add animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'stroke-dashoffset');
        animate.setAttribute('from', '1000');
        animate.setAttribute('to', '0');
        animate.setAttribute('dur', '3s');
        animate.setAttribute('begin', `${idx * 0.5}s`);
        animate.setAttribute('fill', 'freeze');
        
        path.appendChild(animate);
        svgContainer.appendChild(path);
      });
      
      mapVisual.appendChild(svgContainer);
    }
    
  }, [tripPlan, activeStep]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="secondary" size="icon" className="bg-white shadow-md">
          <Layers size={18} />
        </Button>
        <Button variant="secondary" size="icon" className="bg-white shadow-md">
          <Plus size={18} />
        </Button>
        <Button variant="secondary" size="icon" className="bg-white shadow-md">
          <Minus size={18} />
        </Button>
      </div>
      
      {/* Map Legend */}
      {activeStep === 'Trip Summary' && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
          <h4 className="font-medium text-sm mb-2">Routes</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs">Route #1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Route #2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-xs">Route #3</span>
            </div>
          </div>
        </div>
      )}
      
      {activeStep !== 'Trip Summary' && tripPlan.startLocation && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-blue-600" />
            <span className="text-xs font-medium">Starting Point</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{tripPlan.startLocation.address}</p>
        </div>
      )}
    </div>
  );
}

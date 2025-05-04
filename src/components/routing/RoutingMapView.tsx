
import { useRef, useEffect } from 'react';
import { TripPlan, RouteStop } from '@/types/routing';

interface RoutingMapViewProps {
  tripPlan: TripPlan;
  activeStep: string;
}

export default function RoutingMapView({ tripPlan, activeStep }: RoutingMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // In a real implementation, you would initialize a map library here
    // like Google Maps, Mapbox, etc. This is just a placeholder.
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';
    
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.style.width = '100%';
    mapPlaceholder.style.height = '100%';
    mapPlaceholder.style.position = 'relative';
    
    // Add an overlay for the map background
    const mapBackground = document.createElement('div');
    mapBackground.style.position = 'absolute';
    mapBackground.style.top = '0';
    mapBackground.style.left = '0';
    mapBackground.style.width = '100%';
    mapBackground.style.height = '100%';
    mapBackground.style.backgroundImage = `url('https://maps.googleapis.com/maps/api/staticmap?center=-33.8688,151.2093&zoom=12&size=1000x1000&scale=2&maptype=roadmap&key=YOUR_API_KEY')`;
    mapBackground.style.backgroundSize = 'cover';
    mapBackground.style.backgroundPosition = 'center';
    mapBackground.style.opacity = '0.7';
    
    mapPlaceholder.appendChild(mapBackground);
    
    // Add a text overlay for the map
    const textOverlay = document.createElement('div');
    textOverlay.style.position = 'absolute';
    textOverlay.style.top = '50%';
    textOverlay.style.left = '50%';
    textOverlay.style.transform = 'translate(-50%, -50%)';
    textOverlay.style.color = '#1E40AF';
    textOverlay.style.fontWeight = 'bold';
    textOverlay.style.fontSize = '24px';
    textOverlay.style.textAlign = 'center';
    textOverlay.style.textShadow = '0 0 10px rgba(255,255,255,0.8)';
    textOverlay.innerHTML = 'Interactive Map View<br/>(Implementation would use Google Maps or Mapbox)';
    
    mapPlaceholder.appendChild(textOverlay);
    
    // If we have selected stops and are on the Select Stops or later step, show markers
    if ((tripPlan.selectedStops?.length || 0) > 0 && 
        (activeStep === 'Select Stops' || 
         activeStep === 'Select Team Members' || 
         activeStep === 'Trip Summary')) {
      
      // Create stop clusters
      const clusters = [
        { top: '20%', left: '60%', size: 40, count: 7 },
        { top: '30%', left: '40%', size: 50, count: 8 },
        { top: '45%', left: '65%', size: 60, count: 9 },
        { top: '60%', left: '30%', size: 40, count: 6 },
        { top: '70%', left: '55%', size: 45, count: 5 }
      ];
      
      clusters.forEach(cluster => {
        const markerCluster = document.createElement('div');
        markerCluster.style.position = 'absolute';
        markerCluster.style.top = cluster.top;
        markerCluster.style.left = cluster.left;
        markerCluster.style.width = `${cluster.size}px`;
        markerCluster.style.height = `${cluster.size}px`;
        markerCluster.style.borderRadius = '50%';
        markerCluster.style.backgroundColor = 'rgba(59, 130, 246, 0.7)';
        markerCluster.style.display = 'flex';
        markerCluster.style.alignItems = 'center';
        markerCluster.style.justifyContent = 'center';
        markerCluster.style.color = 'white';
        markerCluster.style.fontWeight = 'bold';
        markerCluster.textContent = cluster.count.toString();
        
        mapPlaceholder.appendChild(markerCluster);
      });
    }
    
    // If we have routes and are on the Trip Summary step, show route lines
    if ((tripPlan.routes?.length || 0) > 0 && activeStep === 'Trip Summary') {
      // Create route lines
      const routes = [
        { path: 'M100,100 C150,150 200,100 250,150 S350,100 400,150', color: '#3B82F6' },
        { path: 'M150,200 C200,250 250,200 300,250 S400,200 450,250', color: '#10B981' },
        { path: 'M100,300 C200,350 300,300 400,350', color: '#F59E0B' },
        { path: 'M200,100 C250,200 300,150 350,250', color: '#EF4444' },
      ];
      
      const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgContainer.setAttribute('width', '100%');
      svgContainer.setAttribute('height', '100%');
      svgContainer.style.position = 'absolute';
      svgContainer.style.top = '0';
      svgContainer.style.left = '0';
      svgContainer.style.pointerEvents = 'none';
      
      routes.forEach(route => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', route.path);
        path.setAttribute('stroke', route.color);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        svgContainer.appendChild(path);
      });
      
      mapPlaceholder.appendChild(svgContainer);
    }
    
    mapContainer.appendChild(mapPlaceholder);
    
  }, [tripPlan, activeStep]);

  return <div ref={mapRef} className="w-full h-full" />;
}

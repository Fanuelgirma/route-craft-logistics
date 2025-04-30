
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import MapComponent from '@/components/map/MapComponent';

export default function MapPage() {
  return (
    <PageLayout>
      <PageHeader 
        title="Live Map" 
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Live Map', href: '/map' }]}
      />
      
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Customer Distribution Map</h3>
          <p className="mt-1 text-sm text-gray-500">
            Interactive map showing customer densities and regional distributions.
          </p>
        </div>
        <div className="h-[calc(100vh-300px)]">
          <MapComponent withMarkers />
        </div>
      </div>
    </PageLayout>
  );
}

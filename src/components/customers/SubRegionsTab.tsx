
import { useState } from 'react';
import { Search, Plus, Edit, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { SubRegion } from '@/types/customer';
import SubRegionCustomersModal from './SubRegionCustomersModal';

// Mock data
const mockSubRegions: SubRegion[] = [
  {
    id: '1',
    name: '91404',
    numberOfCustomers: 2,
    created: '2024-01-11T12:22:00Z',
    createdBy: '',
    status: 'Inactive'
  },
  {
    id: '2',
    name: 'BOMET',
    numberOfCustomers: 7,
    created: '2023-07-04T09:54:00Z',
    createdBy: '',
    status: 'Active'
  },
  {
    id: '3',
    name: 'BURUBURU',
    numberOfCustomers: 46,
    created: '2023-07-03T14:44:00Z',
    createdBy: '',
    status: 'Active'
  },
  {
    id: '4',
    name: 'CHUKA',
    numberOfCustomers: 1,
    created: '2023-07-04T09:54:00Z',
    createdBy: '',
    status: 'Inactive'
  },
  {
    id: '5',
    name: 'DANDORA',
    numberOfCustomers: 28,
    created: '2023-07-04T09:54:00Z',
    createdBy: '',
    status: 'Active'
  }
];

export default function SubRegionsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState<SubRegion | null>(null);
  const [isCustomersModalOpen, setIsCustomersModalOpen] = useState(false);
  const [selectedSubRegions, setSelectedSubRegions] = useState<Set<string>>(new Set());
  
  const filteredSubRegions = mockSubRegions.filter(subRegion => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return subRegion.name.toLowerCase().includes(term);
  });

  const handleSelectSubRegion = (id: string, selected: boolean) => {
    const newSelected = new Set(selectedSubRegions);
    
    if (selected) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    
    setSelectedSubRegions(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubRegions(new Set(filteredSubRegions.map(sr => sr.id)));
    } else {
      setSelectedSubRegions(new Set());
    }
  };

  const handleRowClick = (subRegion: SubRegion) => {
    setSelectedSubRegion(subRegion);
    setIsCustomersModalOpen(true);
  };

  const handleDeactivate = () => {
    console.log("Deactivating sub-regions:", selectedSubRegions);
    // Mock API call would go here
  };

  const handleSwap = () => {
    console.log("Opening swap customers dialog");
    // Modal logic would go here
  };

  const handleAddSubRegion = () => {
    console.log("Add sub-region clicked");
    // Modal logic would go here
  };

  return (
    <div className="flex space-x-4 mt-4">
      {/* Left side: Table */}
      <div className="w-7/12 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search Sub-Regions..."
              className="pl-9 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleDeactivate}
              disabled={selectedSubRegions.size === 0}
            >
              Deactivate
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSwap}
              className="flex items-center gap-1"
            >
              <Repeat size={16} />
              Swap
            </Button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-y-auto max-h-[70vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox 
                      checked={selectedSubRegions.size > 0 && selectedSubRegions.size === filteredSubRegions.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>No. of Customers</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubRegions.map((subRegion) => (
                  <TableRow 
                    key={subRegion.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(subRegion)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedSubRegions.has(subRegion.id)}
                        onCheckedChange={(checked) => 
                          handleSelectSubRegion(subRegion.id, Boolean(checked))
                        }
                      />
                    </TableCell>
                    <TableCell>{subRegion.name}</TableCell>
                    <TableCell>{subRegion.numberOfCustomers}</TableCell>
                    <TableCell>{new Date(subRegion.created).toLocaleString()}</TableCell>
                    <TableCell>{subRegion.createdBy || '-'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        subRegion.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subRegion.status}
                      </span>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Edit logic would go here
                        }}
                      >
                        <Edit size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSubRegions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No sub-regions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Right side: Map */}
      <div className="w-5/12 bg-gray-100 rounded-lg overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
          <Button onClick={handleAddSubRegion} className="flex items-center gap-1">
            <Plus size={16} />
            Add Sub-Region
          </Button>
        </div>
        <div className="h-[70vh] w-full bg-gray-200 flex items-center justify-center">
          {/* Map component would be placed here */}
          <p className="text-gray-500">Map View</p>
        </div>
      </div>
      
      {/* Sub-Region Customers Modal */}
      {selectedSubRegion && (
        <SubRegionCustomersModal
          subRegion={selectedSubRegion}
          open={isCustomersModalOpen}
          onClose={() => setIsCustomersModalOpen(false)}
        />
      )}
    </div>
  );
}

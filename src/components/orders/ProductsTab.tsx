
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, Edit, Plus, Trash2, Settings } from 'lucide-react';
import SearchInput from '@/components/ui/SearchInput';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';
import ProductModal from './ProductModal';
import VolumeSettingsModal from './VolumeSettingsModal';

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    code: 'P001',
    productName: 'Bottled Water 500ml',
    price: 1.25,
    saleableUnit: 'BLUE CRATE',
    conversionFactor: 24,
    salesRank: 1,
    salesStatus: 'Available'
  },
  {
    id: '2',
    code: 'P002',
    productName: 'Soda 330ml',
    price: 1.50,
    saleableUnit: 'BLUE CRATE',
    conversionFactor: 24,
    salesRank: 2,
    salesStatus: 'Available'
  },
  {
    id: '3',
    code: 'P003',
    productName: 'Fruit Juice 1L',
    price: 2.75,
    saleableUnit: 'GMV',
    conversionFactor: 12,
    salesRank: 3,
    salesStatus: 'Available'
  },
  {
    id: '4',
    code: 'P004',
    productName: 'Energy Drink 250ml',
    price: 2.00,
    saleableUnit: 'BLUE CRATE',
    conversionFactor: 24,
    salesRank: 4,
    salesStatus: 'Unavailable'
  },
  {
    id: '5',
    code: 'P005',
    productName: 'Sparkling Water 750ml',
    price: 1.80,
    saleableUnit: 'GMV',
    conversionFactor: 12,
    salesRank: 5,
    salesStatus: 'Available'
  }
];

export default function ProductsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isVolumeSettingsModalOpen, setIsVolumeSettingsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  const { toast } = useToast();
  
  // Filter products based on search query
  const filteredProducts = mockProducts.filter(product => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      product.code.toLowerCase().includes(query) ||
      product.productName.toLowerCase().includes(query)
    );
  });
  
  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };
  
  const handleSelectAllProducts = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(product => product.id)));
    }
  };
  
  const handleBulkUpload = () => {
    // Simulate file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        // Simulate API call
        setTimeout(() => {
          toast({
            title: 'Bulk Upload Successful',
            description: `Processed ${target.files?.length} products successfully`,
          });
        }, 1000);
      }
    };
    fileInput.click();
  };
  
  const handleBulkUpdate = () => {
    // Similar to bulk upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv,.xlsx';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        // Simulate API call
        setTimeout(() => {
          toast({
            title: 'Bulk Update Successful',
            description: `Updated ${target.files?.length} products successfully`,
          });
        }, 1000);
      }
    };
    fileInput.click();
  };
  
  const handleBulkDelete = () => {
    if (selectedProducts.size === 0) return;
    
    // In a real app, this would be an API call
    toast({
      title: 'Products Deleted',
      description: `${selectedProducts.size} products have been deleted`,
    });
    
    setSelectedProducts(new Set());
  };
  
  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsAddProductModalOpen(true);
  };
  
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditProductModalOpen(true);
  };
  
  const handleOpenVolumeSettings = () => {
    setIsVolumeSettingsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleOpenVolumeSettings}
        >
          <Settings size={16} />
          Volume Setting
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleAddProduct}
        >
          <Plus size={16} />
          Add Product
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleBulkUpdate}
        >
          <Edit size={16} />
          Bulk Update
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleBulkUpload}
        >
          <Upload size={16} />
          Bulk Upload
        </Button>
        <Button 
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleBulkDelete}
          disabled={selectedProducts.size === 0}
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
      
      <div className="mb-4">
        <SearchInput
          placeholder="Search Products..."
          onSearch={setSearchQuery}
          className="max-w-md"
        />
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox 
                    checked={filteredProducts.length > 0 && selectedProducts.size === filteredProducts.length}
                    onCheckedChange={handleSelectAllProducts}
                    aria-label="Select all products"
                  />
                </TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Saleable Unit</TableHead>
                <TableHead className="text-right">Conversion Factor</TableHead>
                <TableHead className="text-right">Sales Rank</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedProducts.has(product.id)}
                      onCheckedChange={() => handleSelectProduct(product.id)}
                      aria-label={`Select ${product.productName}`}
                    />
                  </TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell className="max-w-xs truncate">{product.productName}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.saleableUnit}</TableCell>
                  <TableCell className="text-right">{product.conversionFactor}</TableCell>
                  <TableCell className="text-right">{product.salesRank || '—'}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.salesStatus === 'Available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-pink-100 text-pink-800'
                      }`}
                    >
                      {product.salesStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-end space-x-2 py-4 px-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">
            Showing {Math.min(filteredProducts.length, 20)} of {filteredProducts.length} products
          </span>
          {/* Pagination would go here */}
        </div>
      </div>
      
      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <ProductModal
          isOpen={isAddProductModalOpen}
          onClose={() => setIsAddProductModalOpen(false)}
          title="Add Product"
        />
      )}
      
      {/* Edit Product Modal */}
      {isEditProductModalOpen && currentProduct && (
        <ProductModal
          isOpen={isEditProductModalOpen}
          onClose={() => setIsEditProductModalOpen(false)}
          title="Edit Product"
          product={currentProduct}
        />
      )}
      
      {/* Volume Settings Modal */}
      <VolumeSettingsModal
        isOpen={isVolumeSettingsModalOpen}
        onClose={() => setIsVolumeSettingsModalOpen(false)}
      />
    </div>
  );
}

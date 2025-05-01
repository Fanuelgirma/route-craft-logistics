
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Order } from '@/types/order';
import OrderDetailDrawer from '@/components/orders/OrderDetailDrawer';

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: Set<string>;
  onSelectionChange: (orderId: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
}

export default function OrdersTable({ orders, selectedOrders, onSelectionChange, onSelectAll }: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  
  const pageSize = 20;
  const isAllSelected = orders.length > 0 && orders.every(order => selectedOrders.has(order.id));
  
  const handleSelectAll = () => {
    onSelectAll(!isAllSelected);
  };
  
  const handleViewDetail = (order: Order) => {
    setViewingOrder(order);
  };
  
  const renderStatusBadge = (status: string) => {
    let className = 'text-xs px-2.5 py-0.5 rounded-full font-medium';
    
    switch (status) {
      case 'Pending':
        className += ' bg-amber-100 text-amber-800';
        break;
      case 'Ready For Dispatch':
        className += ' bg-blue-100 text-blue-800';
        break;
      case 'In Transit':
        className += ' bg-purple-100 text-purple-800';
        break;
      case 'Arrived At Customer':
        className += ' bg-green-100 text-green-800';
        break;
      case 'Completed':
        className += ' bg-green-100 text-green-800';
        break;
      case 'Cancelled':
        className += ' bg-red-100 text-red-800';
        break;
      default:
        className += ' bg-gray-100 text-gray-800';
    }
    
    return <span className={className}>{status}</span>;
  };
  
  return (
    <>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {selectedOrders.size > 0 && (
          <div className="bg-gray-50 px-4 py-2 text-sm text-gray-700 border-b">
            {selectedOrders.size} of {orders.length} Orders selected
          </div>
        )}
        
        <div className="overflow-x-auto">
          <Table id="R2.T1">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded text-logistic-accent focus:ring-logistic-accent"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Sub-Region</TableHead>
                <TableHead>Customer Type</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded text-logistic-accent focus:ring-logistic-accent"
                      checked={selectedOrders.has(order.id)}
                      onChange={(e) => onSelectionChange(order.id, e.target.checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-blue-600 hover:underline">
                    {order.orderNo}
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.subRegion || '-'}</TableCell>
                  <TableCell>{'Retail'}</TableCell> {/* Mock data */}
                  <TableCell>{order.customer}</TableCell> {/* Using customer name as destination for mock */}
                  <TableCell>{order.volume}</TableCell>
                  <TableCell>{'-'}</TableCell> {/* No due date in mock data */}
                  <TableCell>{renderStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewDetail(order)}
                      className="p-1"
                      title="View details"
                      id="R6.V1"
                    >
                      <Eye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="py-4 px-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      
      {viewingOrder && (
        <OrderDetailDrawer
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}
    </>
  );
}


import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { SaleOrder } from '@/types/sales';

// Mock sales data
const mockSales: SaleOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2023-0001',
    date: new Date('2023-05-01'),
    customer: 'Acme Corporation',
    salesperson: 'John Doe',
    totalAmount: 1250.00,
    paidAmount: 1250.00,
    balance: 0,
    status: 'Paid',
    depot: 'North'
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-0002',
    date: new Date('2023-05-03'),
    customer: 'Globex Inc',
    salesperson: 'Jane Smith',
    totalAmount: 3450.75,
    paidAmount: 1725.38,
    balance: 1725.37,
    status: 'Partial',
    depot: 'South'
  },
  {
    id: '3',
    orderNumber: 'ORD-2023-0003',
    date: new Date('2023-04-28'),
    customer: 'Initech LLC',
    salesperson: 'Bob Johnson',
    totalAmount: 560.25,
    paidAmount: 0,
    balance: 560.25,
    status: 'Unpaid',
    depot: 'East'
  },
  {
    id: '4',
    orderNumber: 'ORD-2023-0004',
    date: new Date('2023-04-15'),
    customer: 'Umbrella Corp',
    salesperson: 'Alice Williams',
    totalAmount: 2100.50,
    paidAmount: 0,
    balance: 2100.50,
    status: 'Overdue',
    depot: 'West',
    dueDate: new Date('2023-04-30')
  },
  {
    id: '5',
    orderNumber: 'ORD-2023-0005',
    date: new Date('2023-05-04'),
    customer: 'Stark Industries',
    salesperson: 'Peter Parker',
    totalAmount: 5400.00,
    paidAmount: 5400.00,
    balance: 0,
    status: 'Paid',
    depot: 'North'
  }
];

interface SalesTableProps {
  filterByInvoice?: boolean;
}

export default function SalesTable({ filterByInvoice = false }: SalesTableProps) {
  const [sales] = useState<SaleOrder[]>(mockSales);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-amber-100 text-amber-800';
      case 'Unpaid': return 'bg-gray-100 text-gray-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order No.</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Salesperson</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Paid Amount</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <TableRow key={sale.id} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{sale.orderNumber}</TableCell>
                <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.salesperson}</TableCell>
                <TableCell>{formatter.format(sale.totalAmount)}</TableCell>
                <TableCell>{formatter.format(sale.paidAmount)}</TableCell>
                <TableCell>{formatter.format(sale.balance)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(sale.status)}>
                    {sale.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center h-24">
                No sales found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

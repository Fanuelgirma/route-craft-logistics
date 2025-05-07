
export interface SaleOrder {
  id: string;
  orderNumber: string;
  date: Date;
  customer: string;
  salesperson: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Overdue';
  dueDate?: Date;
  notes?: string;
  invoiceUrl?: string;
  depot?: string;
  region?: string;
  paymentMethod?: 'Cash' | 'Bank Transfer' | 'Card' | 'Credit';
}

export interface SaleItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  tax?: number;
  total: number;
}

export interface SaleSummary {
  totalRevenue: number;
  totalOrders: number;
  paidOrders: number;
  outstandingBalance: number;
  averageOrderValue: number;
}

export interface SaleFormData {
  customer: string;
  salesperson: string;
  orderDate: Date;
  items: SaleItem[];
  amountPaid: number;
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Card' | 'Credit';
  notes?: string;
  dueDate?: Date;
}

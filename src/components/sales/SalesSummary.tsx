
import { SaleSummary } from '@/types/sales';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, ShoppingBag, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

interface SalesSummaryProps {
  stats: SaleSummary;
}

export default function SalesSummary({ stats }: SalesSummaryProps) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const summaryItems = [
    {
      title: 'Total Revenue',
      value: formatter.format(stats.totalRevenue),
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      color: 'bg-green-50 text-green-800'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      color: 'bg-blue-50 text-blue-800'
    },
    {
      title: 'Paid Orders',
      value: stats.paidOrders,
      icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
      color: 'bg-emerald-50 text-emerald-800'
    },
    {
      title: 'Outstanding Balance',
      value: formatter.format(stats.outstandingBalance),
      icon: <AlertCircle className="h-6 w-6 text-amber-600" />,
      color: 'bg-amber-50 text-amber-800'
    },
    {
      title: 'Average Order Value',
      value: formatter.format(stats.averageOrderValue),
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      color: 'bg-purple-50 text-purple-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {summaryItems.map((item, index) => (
        <Card key={index} className="border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-2 rounded-full ${item.color.split(' ')[0]}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

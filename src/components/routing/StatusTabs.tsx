
import { OrderStatus } from '@/types/order';
import { cn } from '@/lib/utils';

interface StatusTabsProps {
  activeStatus: OrderStatus | 'All';
  onStatusChange: (status: OrderStatus | 'All') => void;
  counts: {
    [K in OrderStatus | 'All']: number;
  };
}

export default function StatusTabs({ activeStatus, onStatusChange, counts }: StatusTabsProps) {
  const statusOptions: (OrderStatus | 'All')[] = [
    'Pending',
    'Ready For Dispatch',
    'In Transit',
    'Arrived At Customer',
    'Completed',
    'Cancelled',
    'All'
  ];

  const getTabId = (status: OrderStatus | 'All'): string => {
    const index = statusOptions.indexOf(status) + 1;
    return `R1.T${index}`;
  };

  return (
    <div className="border-b border-gray-200 overflow-x-auto hide-scrollbar">
      <div className="flex space-x-8">
        {statusOptions.map((status) => (
          <button
            key={status}
            id={getTabId(status)}
            onClick={() => onStatusChange(status)}
            className={cn(
              "py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center",
              activeStatus === status
                ? "border-logistic-accent text-logistic-accent"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            aria-current={activeStatus === status ? 'page' : undefined}
          >
            {status} <span className="ml-2 bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">{counts[status]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

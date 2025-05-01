
import { cn } from '@/lib/utils';

interface TripsTabsProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  counts: {
    pending: number;
    dispatched: number;
    'in-transit': number;
    completed: number;
    cancelled: number;
    all: number;
  };
}

export default function TripsTabs({ activeStatus, onStatusChange, counts }: TripsTabsProps) {
  const tabs = [
    { id: 'pending', label: 'Pending', count: counts.pending },
    { id: 'dispatched', label: 'Dispatched', count: counts.dispatched },
    { id: 'in-transit', label: 'In Transit', count: counts['in-transit'] },
    { id: 'completed', label: 'Completed', count: counts.completed },
    { id: 'cancelled', label: 'Cancelled', count: counts.cancelled },
    { id: 'all', label: 'All', count: counts.all }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "px-4 py-2 whitespace-nowrap font-medium text-gray-600 border-b-2 flex items-center",
              activeStatus === tab.id
                ? "border-logistic-accent text-logistic-accent"
                : "border-transparent hover:text-gray-800 hover:border-gray-300"
            )}
            onClick={() => onStatusChange(tab.id)}
            aria-selected={activeStatus === tab.id}
            role="tab"
          >
            {tab.label} <span className="ml-2 bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs">
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

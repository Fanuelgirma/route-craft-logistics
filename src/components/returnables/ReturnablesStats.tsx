
import { Box, Package } from 'lucide-react';
import { ReturnableStats } from '@/types/returnable';

interface ReturnablesStatsProps {
  stats: ReturnableStats;
}

export default function ReturnablesStats({ stats }: ReturnablesStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Sent Today */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-purple-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
            <Package className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Total Sent Today</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{stats.totalSentToday}</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-purple-600">
                  <span>items</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      {/* Pending Returns */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-sm p-6 border border-amber-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-amber-100 p-3 rounded-lg">
            <Box className="h-6 w-6 text-amber-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Pending Returns</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{stats.pendingReturns}</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-amber-600">
                  <span>items</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      {/* Returned Today */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-sm p-6 border border-green-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Returned Today</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{stats.returnedToday}</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  <span>items</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      {/* Overdue Returns */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-lg shadow-sm p-6 border border-red-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
            <Box className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Overdue Returns</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{stats.overdueReturns}</div>
                <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                  <span>items</span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

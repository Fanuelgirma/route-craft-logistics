
import { useState } from 'react';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Alert } from '@/types/alert';

interface AlertsTableProps {
  alerts: Alert[];
  onViewAlert: (alert: Alert) => void;
  onResolveAlert: (alert: Alert) => void;
  selectedAlerts: Set<string>;
  onSelectAlert: (id: string, selected: boolean) => void;
  showCheckboxes?: boolean;
}

export function AlertsTable({
  alerts,
  onViewAlert,
  onResolveAlert,
  selectedAlerts,
  onSelectAlert,
  showCheckboxes = true,
}: AlertsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  // Simple pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstItem, indexOfLastItem);
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const statusColorClasses = (status: string) => {
    return status === 'Resolved' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(alerts.map(alert => alert.id));
      onSelectAlert('all', true);
    } else {
      onSelectAlert('all', false);
    }
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {showCheckboxes && (
                <TableHead className="w-10">
                  <Checkbox 
                    checked={selectedAlerts.size > 0 && selectedAlerts.size === alerts.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
              )}
              <TableHead>KPI Name</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent At</TableHead>
              <TableHead>Resolved At</TableHead>
              <TableHead>Resolved By</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAlerts.length > 0 ? (
              currentAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  {showCheckboxes && (
                    <TableCell>
                      <Checkbox 
                        checked={selectedAlerts.has(alert.id)}
                        onCheckedChange={(checked) => 
                          onSelectAlert(alert.id, Boolean(checked))
                        }
                      />
                    </TableCell>
                  )}
                  <TableCell className="font-medium">{alert.kpiName}</TableCell>
                  <TableCell>{alert.driver}</TableCell>
                  <TableCell className="max-w-xs truncate">{alert.message}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColorClasses(alert.status)}`}>
                      {alert.status}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(alert.sentAt)}</TableCell>
                  <TableCell>{alert.resolvedAt ? formatDate(alert.resolvedAt) : '-'}</TableCell>
                  <TableCell>{alert.resolvedBy || '-'}</TableCell>
                  <TableCell>
                    {alert.status === 'Resolved' ? (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => onViewAlert(alert)}
                      >
                        View
                      </Button>
                    ) : (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-gray-900 hover:bg-gray-700"
                        onClick={() => onResolveAlert(alert)}
                      >
                        Resolve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={showCheckboxes ? 9 : 8} className="text-center py-6">
                  No alerts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-end space-x-2 p-4">
        <span className="text-sm text-gray-500">
          Showing {Math.min(currentAlerts.length, itemsPerPage)} of {alerts.length} alerts
        </span>
        {/* More pagination controls would go here */}
      </div>
    </div>
  );
}

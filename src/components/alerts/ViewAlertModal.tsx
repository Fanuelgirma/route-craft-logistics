
import React from 'react';
import Modal from '@/components/ui/Modal';
import { Alert } from '@/types/alert';

interface ViewAlertModalProps {
  alert: Alert;
  onClose: () => void;
}

const ViewAlertModal: React.FC<ViewAlertModalProps> = ({ alert, onClose }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date(date));
  };

  return (
    <Modal title={`Alert Details: ${alert.kpiName}`} onClose={onClose}>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-medium">Alert Message:</p>
          <p className="text-gray-700 mt-1">{alert.message}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">KPI</p>
            <p className="mt-1">{alert.kpiName}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Driver</p>
            <p className="mt-1">{alert.driver}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="mt-1">
              <span 
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {alert.status}
              </span>
            </p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Sent At</p>
            <p className="mt-1">{formatDate(alert.sentAt)}</p>
          </div>
          
          {alert.status === 'Resolved' && (
            <>
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved At</p>
                <p className="mt-1">{formatDate(alert.resolvedAt)}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved By</p>
                <p className="mt-1">{alert.resolvedBy}</p>
              </div>
              
              {alert.resolutionReason && (
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-500">Resolution Reason</p>
                  <p className="mt-1">{alert.resolutionReason}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewAlertModal;


import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import ActionButton from '@/components/ui/ActionButton';
import { Alert } from '@/types/alert';

interface ResolveAlertModalProps {
  alert: Alert | null;
  selectedCount: number;
  onClose: () => void;
  onResolve: (reason: string) => void;
}

const ResolveAlertModal: React.FC<ResolveAlertModalProps> = ({ alert, selectedCount, onClose, onResolve }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      setError('Resolution reason is required');
      return;
    }
    
    onResolve(reason);
  };

  return (
    <Modal 
      title={alert 
        ? `Resolve Alert: ${alert.kpiName}` 
        : `Resolve ${selectedCount} Selected Alerts`
      } 
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {alert && (
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium">Alert Message:</p>
            <p className="text-gray-700 mt-1">{alert.message}</p>
            <p className="text-gray-500 text-sm mt-2">Sent: {new Date(alert.sentAt).toLocaleString()}</p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resolution Reason</label>
          <textarea
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError('');
            }}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-logistic-accent`}
            placeholder="Explain how this alert was resolved..."
          ></textarea>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <ActionButton variant="outline" onClick={onClose}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" type="submit">
            Resolve
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
};

export default ResolveAlertModal;

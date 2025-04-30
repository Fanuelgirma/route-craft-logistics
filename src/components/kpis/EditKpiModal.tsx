
import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import ActionButton from '@/components/ui/ActionButton';
import { Kpi, NotificationPriority } from '@/types/kpi';

interface EditKpiModalProps {
  kpi: Kpi;
  onClose: () => void;
  onSave: (kpi: Kpi) => void;
}

const kpiTypes = ['Operational', 'Efficiency', 'Cost', 'Financial', 'Customer'];
const kpiUnits = ['Percentage', 'Count', 'Time (minutes)', 'Distance (km)', 'L/100km', 'USD/km', 'Scale 1-10'];
const kpiCalculations = [
  'Deliveries on time / Total deliveries',
  'Space used / Total space',
  'Total fuel / Distance traveled',
  'Total cost / Distance traveled',
  'Average rating score',
  'Custom'
];

const EditKpiModal: React.FC<EditKpiModalProps> = ({ kpi: initialKpi, onClose, onSave }) => {
  const [kpi, setKpi] = useState<Kpi>({ ...initialKpi });
  const [activeTab, setActiveTab] = useState<'general' | 'notifications'>('general');
  const [notifications, setNotifications] = useState<NotificationPriority[]>([
    { id: '1', emailRecipients: ['admin@example.com'], escalationTime: 30, message: 'KPI threshold exceeded' }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    // Convert string to number for numeric fields
    if (name === 'target' || name === 'value1' || name === 'value2') {
      parsedValue = parseFloat(value) || 0;
    }
    
    setKpi({ ...kpi, [name]: parsedValue });
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleNotificationChange = (id: string, field: keyof NotificationPriority, value: any) => {
    setNotifications(notifications.map(note => 
      note.id === id ? { ...note, [field]: value } : note
    ));
  };

  const handleAddNotification = () => {
    setNotifications([
      ...notifications,
      { 
        id: (notifications.length + 1).toString(), 
        emailRecipients: [], 
        escalationTime: 30, 
        message: '' 
      }
    ]);
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications(notifications.filter(note => note.id !== id));
  };

  const handleEmailRecipientChange = (id: string, value: string) => {
    const recipients = value.split(',').map(email => email.trim());
    handleNotificationChange(id, 'emailRecipients', recipients);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!kpi.name) newErrors.name = 'KPI name is required';
    if (!kpi.type) newErrors.type = 'KPI type is required';
    if (!kpi.unit) newErrors.unit = 'KPI unit is required';
    if (!kpi.calculation) newErrors.calculation = 'Calculation method is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // In a real-world scenario, you'd also save the notifications
      onSave(kpi);
    }
  };

  return (
    <Modal title={`Edit KPI: ${initialKpi.name}`} onClose={onClose} size="lg">
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'general' ? 'border-b-2 border-logistic-accent text-logistic-accent' : 'text-gray-500'}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'notifications' ? 'border-b-2 border-logistic-accent text-logistic-accent' : 'text-gray-500'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notification Priorities
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'general' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">KPI Name</label>
              <input
                type="text"
                name="name"
                value={kpi.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-logistic-accent`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Type</label>
                <select
                  name="type"
                  value={kpi.type}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.type ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-logistic-accent`}
                >
                  {kpiTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Unit</label>
                <select
                  name="unit"
                  value={kpi.unit}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.unit ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-logistic-accent`}
                >
                  {kpiUnits.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Target</label>
                <input
                  type="number"
                  name="target"
                  value={kpi.target}
                  onChange={handleChange}
                  step="any"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-logistic-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Calculation</label>
                <select
                  name="calculation"
                  value={kpi.calculation}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.calculation ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-1 focus:ring-logistic-accent`}
                >
                  {kpiCalculations.map(calc => (
                    <option key={calc} value={calc}>{calc}</option>
                  ))}
                </select>
                {errors.calculation && <p className="text-red-500 text-xs mt-1">{errors.calculation}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value 1</label>
                <input
                  type="number"
                  name="value1"
                  value={kpi.value1}
                  onChange={handleChange}
                  step="any"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-logistic-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value 2</label>
                <input
                  type="number"
                  name="value2"
                  value={kpi.value2}
                  onChange={handleChange}
                  step="any"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-logistic-accent"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'notifications' && (
          <>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Notification Priorities</h3>
                <ActionButton 
                  variant="outline"
                  leftIcon={<PlusCircle size={16} />}
                  onClick={handleAddNotification}
                >
                  Add Priority
                </ActionButton>
              </div>

              {notifications.map((notification, index) => (
                <div key={notification.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Priority {index + 1}</h4>
                    <button 
                      type="button"
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Recipient(s)</label>
                      <input
                        type="text"
                        value={notification.emailRecipients.join(', ')}
                        onChange={(e) => handleEmailRecipientChange(notification.id, e.target.value)}
                        placeholder="Enter email addresses separated by commas"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-logistic-accent"
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Escalation Time (minutes)</label>
                      <input
                        type="number"
                        value={notification.escalationTime}
                        onChange={(e) => handleNotificationChange(notification.id, 'escalationTime', parseInt(e.target.value) || 0)}
                        min="1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-logistic-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message Text</label>
                      <textarea
                        value={notification.message}
                        onChange={(e) => handleNotificationChange(notification.id, 'message', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-logistic-accent"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <p className="text-gray-500 text-center py-4">No notification priorities defined.</p>
              )}
            </div>
          </>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <ActionButton variant="outline" onClick={onClose}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" type="submit">
            Save Changes
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
};

export default EditKpiModal;

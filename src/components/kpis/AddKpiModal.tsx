
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import ActionButton from '@/components/ui/ActionButton';
import { Kpi } from '@/types/kpi';

interface AddKpiModalProps {
  onClose: () => void;
  onAdd: (kpi: Kpi) => void;
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

const AddKpiModal: React.FC<AddKpiModalProps> = ({ onClose, onAdd }) => {
  const [kpi, setKpi] = useState<Partial<Kpi>>({
    name: '',
    type: kpiTypes[0],
    unit: kpiUnits[0],
    target: 0,
    calculation: kpiCalculations[0],
    value1: 0,
    value2: 0
  });

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
      onAdd(kpi as Kpi);
    }
  };

  return (
    <Modal 
      isOpen={true}
      title="Add KPI" 
      onClose={onClose} 
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="flex justify-end space-x-2 pt-4">
          <ActionButton variant="outline" onClick={onClose}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" type="submit">
            Add KPI
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
};

export default AddKpiModal;

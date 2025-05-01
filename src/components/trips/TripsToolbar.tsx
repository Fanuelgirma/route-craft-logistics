
import { useState } from 'react';
import { Calendar, ChevronDown, Download, Search } from 'lucide-react';

interface TripsToolbarProps {
  onSearch: (term: string) => void;
  onDepotChange: (depot: string) => void;
  onDateRangeChange: (start: string, end: string) => void;
  onDownload: () => void;
}

export default function TripsToolbar({ 
  onSearch, 
  onDepotChange, 
  onDateRangeChange, 
  onDownload 
}: TripsToolbarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [depot, setDepot] = useState('All Depots');
  
  // Mock list of depots
  const depots = ['All Depots', 'Depot A', 'Depot B', 'Depot C', 'Depot Ruiru'];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    if (endDate) {
      onDateRangeChange(e.target.value, endDate);
    }
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    if (startDate) {
      onDateRangeChange(startDate, e.target.value);
    }
  };
  
  const handleDepotChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepot(e.target.value);
    onDepotChange(e.target.value);
  };

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-md flex flex-wrap items-center gap-4">
      {/* Date Range Picker */}
      <div className="flex items-center gap-2 sm:flex-grow">
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="pl-8 pr-2 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="Start date"
          />
          <Calendar size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <span className="text-gray-500">–</span>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="pl-8 pr-2 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="End date"
          />
          <Calendar size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Search Input */}
      <div className="relative sm:flex-grow">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Trips..."
          className="pl-8 w-full py-2 border border-gray-300 rounded-md text-sm"
        />
        <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Depot Dropdown */}
      <div className="relative min-w-[120px]">
        <select
          value={depot}
          onChange={handleDepotChange}
          className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-300 rounded-md text-sm"
        >
          {depots.map(depotOption => (
            <option key={depotOption} value={depotOption}>
              {depotOption}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      
      {/* Download Button */}
      <button
        onClick={onDownload}
        className="ml-auto bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50"
      >
        <Download size={16} />
        <span>Download Trips</span>
      </button>
    </div>
  );
}

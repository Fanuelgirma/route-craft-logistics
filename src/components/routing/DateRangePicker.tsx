
import { useState, useRef, useEffect } from 'react';
import { format, addDays, startOfDay, endOfDay, isAfter } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (start: Date | undefined, end: Date | undefined) => void;
  className?: string;
}

type DatePreset = {
  name: string;
  label: string;
  startDate: () => Date;
  endDate: () => Date;
};

const presets: DatePreset[] = [
  {
    name: 'today',
    label: 'Today',
    startDate: () => startOfDay(new Date()),
    endDate: () => endOfDay(new Date()),
  },
  {
    name: 'yesterday',
    label: 'Yesterday',
    startDate: () => startOfDay(addDays(new Date(), -1)),
    endDate: () => endOfDay(addDays(new Date(), -1)),
  },
  {
    name: 'last7',
    label: 'Last 7 days',
    startDate: () => startOfDay(addDays(new Date(), -6)),
    endDate: () => endOfDay(new Date()),
  },
  {
    name: 'last30',
    label: 'Last 30 days',
    startDate: () => startOfDay(addDays(new Date(), -29)),
    endDate: () => endOfDay(new Date()),
  },
  {
    name: 'custom',
    label: 'Custom range',
    startDate: () => startOfDay(new Date()),
    endDate: () => endOfDay(new Date()),
  },
];

export default function DateRangePicker({ 
  startDate, 
  endDate, 
  onChange,
  className 
}: DateRangePickerProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleStartDateChange = (date: Date | undefined) => {
    // If end date is before the new start date, update both
    if (date && endDate && isAfter(date, endDate)) {
      onChange(date, date);
    } else {
      onChange(date, endDate);
    }
    setIsStartOpen(false);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    // If start date is after the new end date, update both
    if (date && startDate && isAfter(startDate, date)) {
      onChange(date, date);
    } else {
      onChange(startDate, date);
    }
    setIsEndOpen(false);
  };

  const handlePresetSelect = (preset: DatePreset) => {
    if (preset.name === 'custom') {
      setIsStartOpen(true);
    } else {
      const newStartDate = preset.startDate();
      const newEndDate = preset.endDate();
      onChange(newStartDate, newEndDate);
      setSelectedPreset(preset.name);
    }
    setIsPresetOpen(false);
  };

  // Detect clicks outside the calendar to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsStartOpen(false);
        setIsEndOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatDate = (date?: Date) => {
    return date ? format(date, 'dd MMM yyyy') : '';
  };

  const getDisplayValue = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return 'Select date range';
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="flex items-center gap-2">
        <DropdownMenu open={isPresetOpen} onOpenChange={setIsPresetOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-10 px-3 font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {getDisplayValue()}
              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {presets.map((preset) => (
              <DropdownMenuItem
                key={preset.name}
                onClick={() => handlePresetSelect(preset)}
                className={cn(
                  "cursor-pointer",
                  selectedPreset === preset.name && "bg-muted"
                )}
              >
                {preset.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative" ref={calendarRef}>
          <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
            <PopoverTrigger asChild className="hidden">
              <Button 
                variant="outline" 
                id="R1.D1"
                className="hidden"
              >
                {formatDate(startDate) || "Start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleStartDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
            <PopoverTrigger asChild className="hidden">
              <Button 
                variant="outline" 
                id="R1.D2"
                className="hidden"
              >
                {formatDate(endDate) || "End date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={handleEndDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

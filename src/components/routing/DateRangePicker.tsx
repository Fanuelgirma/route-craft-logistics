
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (start: Date | undefined, end: Date | undefined) => void;
}

export default function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const handleStartDateChange = (date: Date | undefined) => {
    onChange(date, endDate);
    setIsStartOpen(false);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    onChange(startDate, date);
    setIsEndOpen(false);
  };

  const formatDate = (date?: Date) => {
    return date ? format(date, 'dd/MM/yyyy') : '';
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center gap-2">
        <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-auto justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
              id="R1.D1"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDate(startDate) || "Start date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <span className="text-sm text-muted-foreground">to</span>

        <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-auto justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
              id="R1.D2"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDate(endDate) || "End date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={handleEndDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}


import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ServiceTaskExtended } from "@/types/maintenance";

interface ServiceTaskDetailDrawerProps {
  serviceTask: ServiceTaskExtended;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceTaskDetailDrawer({
  serviceTask,
  isOpen,
  onClose,
}: ServiceTaskDetailDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader className="mb-6">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-xl font-bold">
              Service Task #{serviceTask.id}
            </SheetTitle>
            <Button variant="outline" size="sm">
              <Edit size={14} className="mr-1" /> Edit
            </Button>
          </div>
          <h2 className="text-2xl font-bold mt-2">{serviceTask.name}</h2>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-500 mb-1">Description</h3>
            <p className="text-gray-700">{serviceTask.description || '—'}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-500 mb-2">Service Task Groups</h3>
            <p className="text-gray-700">—</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-500 mb-2">Subtasks</h3>
            <p className="text-gray-700">—</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Service Entries</h3>
              <p className="text-blue-600 font-medium">{serviceTask.serviceEntries}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Service Programs</h3>
              <p className="text-blue-600 font-medium">{serviceTask.servicePrograms}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Service Reminders</h3>
              <p className="text-blue-600 font-medium">{serviceTask.serviceReminders}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500 mb-1">Work Orders</h3>
              <p className="text-blue-600 font-medium">{serviceTask.workOrders}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Default Category Code</h3>
                <p className="text-gray-700">{serviceTask.defaultCategoryCode || '—'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Default System Code</h3>
                <p className="text-gray-700">{serviceTask.defaultSystemCode || '—'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Default Assembly Code</h3>
                <p className="text-gray-700">{serviceTask.defaultAssemblyCode || '—'}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 mb-1">Default Reason for Repair</h3>
                <p className="text-gray-700">{serviceTask.defaultReasonForRepair || '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

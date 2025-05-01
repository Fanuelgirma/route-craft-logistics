
import { useState } from 'react';
import { Settings, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { NotificationTemplate } from '@/types/customer';

// Mock data
const mockTemplates: NotificationTemplate[] = [
  {
    id: '1',
    title: 'SMS Alert',
    body: 'Hi, Your order @orderReference has been dispatched. Your driver is @driverName @driverNumber. Track it here @trackingLink',
    type: 'SMS'
  },
  {
    id: '2',
    title: 'Order Dispatch',
    body: 'Your order has been dispatched and is on the way.',
    type: 'Email'
  },
  {
    id: '3',
    title: 'Delivery Confirmation',
    body: 'Your order has been delivered.',
    type: 'Email'
  }
];

export default function NotificationsTab() {
  const [activeTab, setActiveTab] = useState<'Email' | 'SMS'>('Email');
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  const filteredTemplates = mockTemplates.filter(
    template => template.type === activeTab
  );
  
  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'Email' | 'SMS')}>
          <TabsList>
            <TabsTrigger value="Email">Email Templates</TabsTrigger>
            <TabsTrigger value="SMS">SMS Templates</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          onClick={() => setIsSettingsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Notification Settings
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{template.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-4">{template.body}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" className="flex items-center gap-2">
                <Edit size={16} />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredTemplates.length === 0 && (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No {activeTab} templates found
          </div>
        )}
      </div>
      
      {/* Settings modal would be implemented here */}
    </div>
  );
}

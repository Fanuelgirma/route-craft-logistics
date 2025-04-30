
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import Tabs from '@/components/ui/Tabs';
import ActionButton from '@/components/ui/ActionButton';
import { Settings } from 'lucide-react';

export default function NotificationsPage() {
  const [emailTemplate, setEmailTemplate] = useState(
    `<p>Dear [Customer Name],</p>
<p>We are writing to inform you about your upcoming delivery scheduled for [Delivery Date].</p>
<p>Your order [Order Number] is currently being prepared and will be dispatched shortly.</p>
<p>Thank you for choosing our services.</p>
<p>Best regards,</p>
<p>The LogisCraft Team</p>`
  );
  
  const [smsTemplate, setSmsTemplate] = useState(
    `LogisCraft: Your order #[Order Number] is out for delivery and will arrive at [Estimated Time]. Track here: [Tracking Link]`
  );

  const handleSave = () => {
    console.log('Templates saved');
    // In a real app, you would send this data to your backend
  };

  const EmailTemplateTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Subject</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
          defaultValue="Your upcoming delivery from LogisCraft"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Body</label>
        <textarea
          rows={12}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
          value={emailTemplate}
          onChange={(e) => setEmailTemplate(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <ActionButton variant="primary" onClick={handleSave}>
          Save Template
        </ActionButton>
      </div>
    </div>
  );

  const SMSTemplateTab = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">SMS Template</label>
        <textarea
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-logistic-accent focus:ring-logistic-accent sm:text-sm"
          value={smsTemplate}
          onChange={(e) => setSmsTemplate(e.target.value)}
        />
        <p className="mt-2 text-sm text-gray-500">
          Available placeholders: [Customer Name], [Order Number], [Delivery Date], [Estimated Time], [Tracking Link]
        </p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">SMS Character Count</label>
        <p className="mt-1 text-sm">
          {smsTemplate.length} characters used ({Math.ceil(smsTemplate.length / 160)} message{Math.ceil(smsTemplate.length / 160) > 1 ? 's' : ''})
        </p>
      </div>
      <div className="flex justify-end">
        <ActionButton variant="primary" onClick={handleSave}>
          Save Template
        </ActionButton>
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'email',
      label: 'Email Templates',
      content: <EmailTemplateTab />
    },
    {
      id: 'sms',
      label: 'SMS Templates',
      content: <SMSTemplateTab />
    }
  ];

  return (
    <PageLayout>
      <PageHeader 
        title="Notification Templates" 
        breadcrumbs={[{ name: 'Dashboard', href: '/dashboard' }, { name: 'Notification Templates', href: '/notifications' }]}
        actions={
          <ActionButton
            variant="outline"
            leftIcon={<Settings size={16} />}
          >
            Notification Settings
          </ActionButton>
        }
      />
      
      <div className="mt-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <Tabs tabs={tabs} defaultTab="sms" />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

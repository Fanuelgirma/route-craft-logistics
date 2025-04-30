
export interface Kpi {
  id: string;
  name: string;
  type: string;
  unit: string;
  target: number;
  calculation: string;
  value1: number;
  value2: number;
}

export interface NotificationPriority {
  id: string;
  emailRecipients: string[];
  escalationTime: number;
  message: string;
}

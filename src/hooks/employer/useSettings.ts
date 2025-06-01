import { useQuery } from '@tanstack/react-query';

export interface CompanyDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  registrationNumber: string;
  taxId: string;
}

export interface EmployeeStats {
  total: number;
  active: number;
  departments: {
    name: string;
    count: number;
  }[];
  designations: {
    name: string;
    count: number;
  }[];
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  notificationTypes: {
    type: string;
    enabled: boolean;
  }[];
}

export interface UserSettings {
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
}

export interface SettingsData {
  companyDetails: CompanyDetails;
  employeeStats: EmployeeStats;
  notificationSettings: NotificationSettings;
  userSettings: UserSettings;
}

const dummyData: SettingsData = {
  companyDetails: {
    name: 'MyAnexa Company',
    email: 'contact@myanexa.com',
    phone: '+1 234 567 8900',
    address: '123 Business Street, City, Country',
    website: 'www.myanexa.com',
    registrationNumber: 'REG123456',
    taxId: 'TAX789012',
  },
  employeeStats: {
    total: 45,
    active: 40,
    departments: [
      { name: 'Engineering', count: 15 },
      { name: 'Marketing', count: 8 },
      { name: 'Sales', count: 12 },
      { name: 'HR', count: 5 },
      { name: 'Finance', count: 5 },
    ],
    designations: [
      { name: 'Manager', count: 8 },
      { name: 'Senior', count: 12 },
      { name: 'Junior', count: 15 },
      { name: 'Lead', count: 5 },
      { name: 'Associate', count: 5 },
    ],
  },
  notificationSettings: {
    emailNotifications: true,
    smsNotifications: false,
    notificationTypes: [
      { type: 'Loan Requests', enabled: true },
      { type: 'Payment Reminders', enabled: true },
      { type: 'System Updates', enabled: true },
      { type: 'Employee Updates', enabled: false },
    ],
  },
  userSettings: {
    name: 'John Doe',
    email: 'john@myanexa.com',
    role: 'Admin',
    permissions: ['manage_employees', 'manage_loans', 'view_reports', 'manage_settings'],
    lastLogin: new Date().toISOString(),
  },
};

export function useSettings() {
  return useQuery({
    queryKey: ['employer_settings'],
    queryFn: () => Promise.resolve(dummyData),
  });
} 
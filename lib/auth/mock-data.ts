import { User } from '@/types/auth';

export const MOCK_USERS: User[] = [
  {
    id: 'usr_001',
    email: 'tudor@betterqa.com',
    name: 'Tudor Brad',
    role: 'superadmin',
    company: 'BetterQA',
    department: 'Executive',
    avatar: '/avatars/tudor.jpg',
    status: 'active',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: 'usr_002',
    email: 'admin@betterflow.eu',
    name: 'Sarah Mitchell',
    role: 'admin',
    company: 'BetterFlow Technologies',
    department: 'Management',
    avatar: '/avatars/sarah.jpg',
    status: 'active',
    createdAt: new Date('2024-02-15'),
    lastLogin: new Date()
  },
  {
    id: 'usr_003',
    email: 'john.doe@betterflow.eu',
    name: 'John Doe',
    role: 'user',
    company: 'BetterFlow Technologies',
    department: 'Development',
    avatar: '/avatars/john.jpg',
    status: 'active',
    createdAt: new Date('2024-03-20'),
    lastLogin: new Date()
  },
  {
    id: 'usr_004',
    email: 'client@newbridgefx.com',
    name: 'Joe Crook',
    role: 'client',
    company: 'NewbridgeFX',
    department: 'Client Relations',
    avatar: '/avatars/joe.jpg',
    status: 'active',
    createdAt: new Date('2024-04-10'),
    lastLogin: new Date()
  }
];

export const TEST_CREDENTIALS = {
  superadmin: { email: 'tudor@betterqa.com', password: 'SuperAdmin123!' },
  admin: { email: 'admin@betterflow.eu', password: 'Admin123!' },
  user: { email: 'john.doe@betterflow.eu', password: 'User123!' },
  client: { email: 'client@newbridgefx.com', password: 'Client123!' }
};

export const validateCredentials = (email: string, password: string): User | null => {
  const credentials = Object.values(TEST_CREDENTIALS);
  const validCredential = credentials.find(
    cred => cred.email === email && cred.password === password
  );

  if (validCredential) {
    return MOCK_USERS.find(user => user.email === email) || null;
  }

  return null;
};
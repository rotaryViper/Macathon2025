import { User, Conversation, Message } from './types';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'Jessica Chen',
    email: 'jessica@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'online',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'online',
  },
  {
    id: '3',
    name: 'Aisha Johnson',
    email: 'aisha@example.com',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'away',
    lastSeen: '2023-04-15T09:12:34Z',
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'offline',
    lastSeen: '2023-04-14T18:22:14Z',
  },
  {
    id: '5',
    name: 'Sara Patel',
    email: 'sara@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'online',
  },
  {
    id: '6',
    name: 'Team Alpha',
    email: 'team-alpha@example.com',
    avatar: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'online',
  },
];

// Mock conversations
export const conversations: Conversation[] = [
  {
    id: '1',
    participants: [users[0], users[1]],
    unreadCount: 3,
    updatedAt: '2023-04-15T10:30:00Z',
  },
  {
    id: '2',
    participants: [users[0], users[2]],
    unreadCount: 0,
    updatedAt: '2023-04-14T15:45:00Z',
  },
  {
    id: '3',
    participants: [users[0], users[3]],
    unreadCount: 1,
    updatedAt: '2023-04-13T09:15:00Z',
  },
  {
    id: '4',
    participants: [users[0], users[4]],
    unreadCount: 0,
    updatedAt: '2023-04-12T22:10:00Z',
  },
  {
    id: '5',
    participants: [users[0], users[1], users[2], users[3]],
    isGroup: true,
    groupName: 'Project Discussion',
    unreadCount: 5,
    updatedAt: '2023-04-15T11:00:00Z',
  },
  {
    id: '6',
    participants: [users[0], users[5]],
    isGroup: true,
    groupName: 'Team Alpha',
    unreadCount: 2,
    updatedAt: '2023-04-15T08:30:00Z',
  },
];

// Mock messages
export const messages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      senderId: '2',
      text: 'Hey Jessica, how\'s the presentation coming along?',
      timestamp: '2023-04-15T10:25:00Z',
      status: 'read',
    },
    {
      id: '102',
      senderId: '1',
      text: 'Almost done! Just finishing up the slides. Should be ready by 3 PM.',
      timestamp: '2023-04-15T10:26:30Z',
      status: 'read',
    },
    {
      id: '103',
      senderId: '2',
      text: 'Great! Looking forward to seeing it.',
      timestamp: '2023-04-15T10:27:45Z',
      status: 'read',
    },
    {
      id: '104',
      senderId: '2',
      text: 'By the way, do you have time for a quick call before the meeting?',
      timestamp: '2023-04-15T10:28:30Z',
      status: 'delivered',
    },
    {
      id: '105',
      senderId: '2',
      text: 'I have some feedback on the proposal that might be useful.',
      timestamp: '2023-04-15T10:29:00Z',
      status: 'delivered',
    },
    {
      id: '106',
      senderId: '2',
      text: 'Let me know what works for you!',
      timestamp: '2023-04-15T10:30:00Z',
      status: 'sent',
    },
  ],
  '2': [
    {
      id: '201',
      senderId: '3',
      text: 'Hey Jessica, are you joining the team lunch today?',
      timestamp: '2023-04-14T15:40:00Z',
      status: 'read',
    },
    {
      id: '202',
      senderId: '1',
      text: 'Yes, definitely! What time are we meeting?',
      timestamp: '2023-04-14T15:42:00Z',
      status: 'read',
    },
    {
      id: '203',
      senderId: '3',
      text: 'Around 12:30 PM at the usual spot.',
      timestamp: '2023-04-14T15:45:00Z',
      status: 'read',
    },
  ],
  '3': [
    {
      id: '301',
      senderId: '4',
      text: 'Hey, I just sent you the contract draft for review.',
      timestamp: '2023-04-13T09:10:00Z',
      status: 'read',
    },
    {
      id: '302',
      senderId: '1',
      text: 'Got it, thanks! I\'ll take a look today.',
      timestamp: '2023-04-13T09:12:00Z',
      status: 'read',
    },
    {
      id: '303',
      senderId: '4',
      text: 'Great, let me know if you have any questions or need any clarification.',
      timestamp: '2023-04-13T09:15:00Z',
      status: 'delivered',
    },
  ],
  '4': [
    {
      id: '401',
      senderId: '1',
      text: 'Hi Sara, just checking in on the project timeline.',
      timestamp: '2023-04-12T22:05:00Z',
      status: 'read',
    },
    {
      id: '402',
      senderId: '5',
      text: 'Hi Jessica! We\'re on track. The development team is making good progress.',
      timestamp: '2023-04-12T22:08:00Z',
      status: 'read',
    },
    {
      id: '403',
      senderId: '5',
      text: 'I\'ll send you a detailed report tomorrow morning.',
      timestamp: '2023-04-12T22:10:00Z',
      status: 'read',
    },
  ],
  '5': [
    {
      id: '501',
      senderId: '2',
      text: 'Hey everyone, I\'ve created a shared document for our project ideas.',
      timestamp: '2023-04-15T10:50:00Z',
      status: 'read',
      attachments: [
        {
          id: 'a1',
          type: 'file',
          url: '#',
          name: 'Project_Ideas.docx',
          size: 256000,
        }
      ]
    },
    {
      id: '502',
      senderId: '3',
      text: 'Thanks Michael! This is really helpful.',
      timestamp: '2023-04-15T10:52:00Z',
      status: 'read',
    },
    {
      id: '503',
      senderId: '4',
      text: 'I added a few more ideas to the document.',
      timestamp: '2023-04-15T10:55:00Z',
      status: 'delivered',
    },
    {
      id: '504',
      senderId: '2',
      text: 'Here\'s a mockup of the new homepage design:',
      timestamp: '2023-04-15T10:58:00Z',
      status: 'delivered',
      attachments: [
        {
          id: 'a2',
          type: 'image',
          url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
          name: 'Homepage_Mockup.png',
        }
      ]
    },
    {
      id: '505',
      senderId: '3',
      text: 'Looks great! I love the new layout.',
      timestamp: '2023-04-15T11:00:00Z',
      status: 'sent',
    },
  ],
  '6': [
    {
      id: '601',
      senderId: '6',
      text: 'Team update: We\'ll be having a sprint planning meeting tomorrow at 10 AM.',
      timestamp: '2023-04-15T08:25:00Z',
      status: 'read',
    },
    {
      id: '602',
      senderId: '1',
      text: 'I\'ll be there. Should we prepare anything specific?',
      timestamp: '2023-04-15T08:27:00Z',
      status: 'read',
    },
    {
      id: '603',
      senderId: '6',
      text: 'Please review the current sprint tasks and come with ideas for improvements.',
      timestamp: '2023-04-15T08:30:00Z',
      status: 'delivered',
    },
  ],
};

// Mock current user
export const currentUser: User = users[0];

// Helper functions
export const getConversationById = (id: string): Conversation | undefined => {
  return conversations.find(conversation => conversation.id === id);
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
  return messages[conversationId] || [];
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getOtherParticipant = (conversation: Conversation): User => {
  if (conversation.isGroup) {
    return conversation.participants.find(p => p.id !== currentUser.id) || currentUser;
  }
  return conversation.participants.find(p => p.id !== currentUser.id) || currentUser;
};
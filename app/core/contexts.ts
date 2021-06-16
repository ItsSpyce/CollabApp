import { Notification } from 'db';
import { createContext } from 'react';

export const NotificationsContext = createContext<Notification[]>([]);

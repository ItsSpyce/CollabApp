import { Booking, Notification } from 'db';
import { createContext } from 'react';

export const NotificationsContext = createContext<Notification[]>([]);

export const TodaysBookingsContext = createContext<Booking[]>([]);

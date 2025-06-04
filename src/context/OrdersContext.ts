// src/context/OrdersContext.ts

import { createContext } from 'react';
import { OrdersContextType } from '../types/OrdersContext';

export const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

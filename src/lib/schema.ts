import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export const transactionFilterSchema = z.object({
  status: z.enum(['all', 'success', 'pending', 'failed']).default('all'),
  search: z.string().default(''),
  sortBy: z.enum(['date', 'amount']).default('date'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export type TransactionFilter = z.infer<typeof transactionFilterSchema>;
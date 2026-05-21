import { z } from 'zod';
import { demoRoles } from '../model/types';

export const demoRoleSchema = z.object({
  role: z.enum(demoRoles, 'Неверная роль'),
});

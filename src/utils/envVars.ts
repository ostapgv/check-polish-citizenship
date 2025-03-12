import dotenv from 'dotenv';
dotenv.config();

export const envVars = {
  SHOULD_SEND_PUSH_NOTIFICATIONS: process.env.SHOULD_SEND_PUSH_NOTIFICATIONS === 'true',
  PUSHOVER_USER: process.env.PUSHOVER_USER,
  PUSHOVER_TOKEN: process.env.PUSHOVER_TOKEN
};
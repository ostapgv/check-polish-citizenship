import axios from "axios";
import { envVars } from "./envVars";

export const sendPushNotification = async (message: string) => {
  try {
    await axios.post('https://api.pushover.net/1/messages.json', {
      token: envVars.PUSHOVER_TOKEN,
      user: envVars.PUSHOVER_USER,
      message: message,
    });
    console.log('Notification sent:', message);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

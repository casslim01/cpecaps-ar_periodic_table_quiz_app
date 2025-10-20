import { Client, Account, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Your project ID
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!); // Set platform to Expo

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!; // Your database ID


export interface RealtimeResponse {
  events: string[];
  payload: any;
}
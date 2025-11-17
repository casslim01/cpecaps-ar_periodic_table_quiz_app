import { Client, Account, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID!;
export const COLLECTION_ID = process.env.EXPO_PUBLIC_SCORES_COLLECTION_ID!;

// Add debug logging
console.log('DATABASE_ID:', DATABASE_ID);
console.log('COLLECTION_ID:', COLLECTION_ID);
console.log('All env vars:', {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  dbId: process.env.EXPO_PUBLIC_DB_ID,
  collectionId: process.env.EXPO_PUBLIC_SCORES_COLLECTION_ID
});
import { Account, Client, Databases, OAuthProvider } from "appwrite";

const client: Client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APP_APPWRITE_PROJECT_ID);
const databases = new Databases(client);
const account = new Account(client);

const TRANSATION_DATABASE_ID = import.meta.env.VITE_APP_DATABASES;
const TRANSATION_COLLECTION_ID = import.meta.env.VITE_APP_COLLECTION;

export const appwrite = {
  databases,
  account,
  OAuthProvider,
  TRANSATION_COLLECTION_ID,
  TRANSATION_DATABASE_ID,
};

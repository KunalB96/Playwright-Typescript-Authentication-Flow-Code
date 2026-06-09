import 'dotenv/config';

export const credentials = {
  admin: {
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!
  },

  owner: {
    email: process.env.OWNER_EMAIL!,
    password: process.env.OWNER_PASSWORD!
  },

  storeManager: {
    email: process.env.STOREMANAGER_EMAIL!,
    password: process.env.STOREMANAGER_PASSWORD!
  }
};
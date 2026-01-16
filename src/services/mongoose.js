import {connect, connection} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const sanitizeMongoUri = uri =>
  uri.replace(/(mongodb(?:\+srv)?:\/\/)([^@]+)@/g, '$1***:***@');

export const connectDB = async () => {
  if (!MONGODB_URI) {
    const error = new Error('MONGODB_URI no está configurada.');
    // @ts-expect-error - adjuntamos un código para identificar el error
    error.code = 'DB_NOT_CONFIGURED';
    throw error;
  }

  if (connection.readyState) {
    return;
  }

  try {
    if (process.env.DEBUG_DB === 'true') {
      console.log('[db] MONGODB_URI:', sanitizeMongoUri(MONGODB_URI));
    }
    await connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 10000,
    });
  } catch (error) {
    throw error;
  }
};

process.on('SIGINT', async () => {
  await connection.close();
  process.exit(0);
});

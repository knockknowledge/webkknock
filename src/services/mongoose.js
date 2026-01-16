import {connect, connection} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI no está configurada.');
  }

  if (connection.readyState) {
    return;
  }

  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};

process.on('SIGINT', async () => {
  await connection.close();
  process.exit(0);
});

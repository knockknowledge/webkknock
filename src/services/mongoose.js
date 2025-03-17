import {connect, connection} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  console.log(MONGODB_URI, 'MIRAA');

  if (connection.readyState) {
    console.log('La base de datos ya está conectada.');
    return;
  }

  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      'Conexión a la base de datos exitosa:',
      connection.db.databaseName,
    );
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

connection.on('connected', () => {
  console.log('Conexión a MongoDB establecida.');
});

connection.on('error', err => {
  console.error('Error en la conexión a MongoDB:', err.message);
});

process.on('SIGINT', async () => {
  await connection.close();
  process.exit(0);
});

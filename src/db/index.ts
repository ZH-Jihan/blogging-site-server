import mongoose from 'mongoose';
import config from '../config';

const connectDatabase = async () => {
  try {
    const databaseConnection = await mongoose.connect(
      `${config.database_url}/${config.database_name}`,
    );
    console.log(
      `MongoDB Conacted host: ${databaseConnection.connections[0].host}`,
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDatabase;

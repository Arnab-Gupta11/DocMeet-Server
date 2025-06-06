import mongoose from 'mongoose';

//Connect To Database.
const connectToDatabase = async (uri: string): Promise<void> => {
  try {
    const connectionInstance = await mongoose.connect(uri);
    console.log(
      `🛢️ MongoDB connected successfully !! host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
};

//Disconnect Database.
const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('🛑 MongoDB disconnected');
  } catch (error) {
    console.error('❌ Error while disconnecting MongoDB:', error);
  }
};

export { connectToDatabase, disconnectDatabase };

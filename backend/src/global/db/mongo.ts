import 'dotenv/config';
import mongoose from 'mongoose';

class MongoDB {
  private url;

  constructor() {
    mongoose.set('strictQuery', false);
    this.url = process.env.MONGO_DB_URL!;
  }

  async connect() {
    try {
      const { connection } = await mongoose.connect(this.url);
      console.log(`MongoDB connected to ${connection.port}.`);
    } catch (e) {
      console.log(e);
    }
  }
}

export default MongoDB;

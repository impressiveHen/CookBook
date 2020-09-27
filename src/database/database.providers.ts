import * as mongoose from 'mongoose';
import { DB_PROVIDER } from '../constants'; 

export const databaseProviders = [
  {
    provide: DB_PROVIDER,
    useFactory: (): Promise<typeof mongoose> => 
      mongoose.connect(process.env.MONGO_URI),
  },
];

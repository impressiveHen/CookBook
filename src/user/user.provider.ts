import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { USER_MODEL_PROVIDER, DB_PROVIDER } from 'src/constants';

export const userProviders = [
    {
        provide: USER_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('user', UserSchema),
        inject: [DB_PROVIDER],
    },
];
import { Connection } from 'mongoose';
import { RestaurantSchema } from './restaurant.schema';
import { RESTAURANT_MODEL_PROVIDER, DB_PROVIDER } from 'src/constants';

export const restaurantProviders = [
    {
        provide: RESTAURANT_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('restaurant', RestaurantSchema),
        inject: [DB_PROVIDER],
    },
];
import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { DatabaseModule } from 'src/database/database.module';
import { restaurantProviders } from './restaurant.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    RestaurantService,
    ...restaurantProviders
  ],
  controllers: [RestaurantController]
})
export class RestaurantModule {}

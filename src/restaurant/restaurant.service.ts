import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { RESTAURANT_MODEL_PROVIDER } from 'src/constants';
import { Restaurant } from './interfaces/restaurant.interface';
import { CreateRetaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantService {
    constructor(
        @Inject(RESTAURANT_MODEL_PROVIDER)
        private RestaurantModel: Model<Restaurant>,
    ) {}

    async create(createRetaurantDto: CreateRetaurantDto): Promise<Restaurant> {
        const createdRetaurant = new this.RestaurantModel(createRetaurantDto);
        return createdRetaurant.save();
    }

    async findAll(): Promise<Restaurant[]> {
        return await this.RestaurantModel.find().exec();
    }

    async findById(id): Promise<Restaurant> {
        const restaurant = await this.RestaurantModel.findById(id).exec();
        return restaurant;
    }

    async find(req): Promise<any> {
        return await this.RestaurantModel.find(req).exec();
    }

    async update(id, createRestaurantDto: CreateRetaurantDto): Promise<Restaurant> {
        return await this.RestaurantModel.findByIdAndUpdate(id, createRestaurantDto, {new: true});
    }

    async delete(id): Promise<Restaurant> {
        return await this.RestaurantModel.findByIdAndRemove(id);
    }
}

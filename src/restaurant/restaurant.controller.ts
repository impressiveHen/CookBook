import { Controller, Post, Res, Body, HttpStatus, Get, Query, NotFoundException, Put, Delete, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRetaurantDto } from './dto/create-restaurant.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('restaurant')
export class RestaurantController {
    constructor(
        private readonly restaurantService: RestaurantService
    ) {}

    @Post('/create')
    async addRestaurant(@Res() res, @Body() createRestaurantDto: CreateRetaurantDto) {
        const data = await this.restaurantService.create(createRestaurantDto);

        return res.status(HttpStatus.CREATED).json({
            message: "New restaurant created successfully",
            data
        })
    }

    @Get('/all')
    async findAll(@Res() res) {
        const data = await this.restaurantService.findAll();
        return res.status(HttpStatus.OK).json(data)
    }

    @Get('/id')
    async findById(@Res() res, @Query('id') id: string) {
        const data = await this.restaurantService.findById(id);
        if (data) throw new NotFoundException("Id of restaurant doesn't exist!");
        return res.status(HttpStatus.OK).json(data);
    }

    @Put('/update')
    async update(@Res() res, @Query('id') id: string, @Body() createRestaurantDto: CreateRetaurantDto) {
        const data = this.restaurantService.update(id, createRestaurantDto);
        if (!data) throw new NotFoundException("Id of restaurant doesn't exist!");
        return res.status(HttpStatus.OK).json({
            message: 'Restaurant has been successfully updated',
            data
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async delete(@Res() res, @Query('id') id: string) {
        const data = await this.restaurantService.delete(id);
        if (!data) throw new NotFoundException("Id of restaurant does't exist!");
        return res.status(HttpStatus.OK).json({
            message: 'Restaurant has been deleted',
            data
        })
    }
}

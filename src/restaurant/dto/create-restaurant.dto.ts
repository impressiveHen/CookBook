import { ApiProperty } from '@nestjs/swagger';

export class CreateRetaurantDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly rate: number;
    
    @ApiProperty()
    readonly address: string;
   
    @ApiProperty()
    readonly category: string;
}
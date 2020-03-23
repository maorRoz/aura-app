import {
  IsDateString,
  IsIn,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category, categories } from '../types';

export class UserFiltersDto {
  @ApiProperty({ required: true, example: '1992-03-23T21:19:19.692Z' })
  @IsDateString()
  birthdate: string;

  @ApiProperty({
    required: true,
    example: ['House And Home', 'Maps And Navigation', 'Health And Fitness']
  })
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsIn(Object.values(categories), { each: true })
  prefferedCategories: Category[];

  @ApiProperty({ required: true, example: 1 })
  @Min(1)
  @Max(5)
  rating: number;
}

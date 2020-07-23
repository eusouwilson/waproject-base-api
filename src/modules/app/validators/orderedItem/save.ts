import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { IOrderedItem } from 'modules/database/interfaces/orderedItem';

export class SaveValidator implements IOrderedItem {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: false, type: 'integer' })
  public orderId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: false, type: 'integer' })
  public itemId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ required: false, type: 'integer' })
  public amount: number;
}

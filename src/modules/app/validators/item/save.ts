import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IItem } from 'modules/database/interfaces/item';

export class SaveValidator implements IItem {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 60 })
  public description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'string' })
  public price: string;
}

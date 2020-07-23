import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationValidator } from 'modules/common/validators/pagination';

export class ListValidator extends PaginationValidator {
  @IsString()
  @IsOptional()
  @IsIn(['orderId', 'itemId', 'amount', 'createdDate', 'updatedDate', 'item'])
  @ApiProperty({ required: false, enum: ['orderId', 'itemId', 'amount', 'createdDate', 'updatedDate', 'item'] })
  public orderBy: string;
}

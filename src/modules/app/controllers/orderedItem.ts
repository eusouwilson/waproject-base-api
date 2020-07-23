import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { OrderedItem } from 'modules/database/models/orderedItem';

import { OrderedItemRepository } from '../repositories/orderedItem';
import { OrderedItemService } from '../services/orderedItem';
import { SaveValidator } from '../validators/orderedItem/save';

@ApiTags('App: Orders')
@Controller('/orders')
@AuthRequired()
export class OrderedItemController {
  constructor(private orderedItemRepository: OrderedItemRepository, private orderedItemService: OrderedItemService) {}
  @Get(':orderId')
  @ApiResponse({ status: 200, type: OrderedItem })
  public async details(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderedItemRepository.findById(orderId);
  }

  @Post()
  @ApiResponse({ status: 200, type: OrderedItem })
  public async save(@Body() model: SaveValidator) {
    return this.orderedItemService.save(model);
  }
}

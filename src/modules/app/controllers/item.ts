import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Item } from 'modules/database/models/item';

import { ItemRepository } from '../repositories/item';
import { ItemService } from '../services/item';
import { ListValidator } from '../validators/item/list';
import { SaveValidator } from '../validators/item/save';

@ApiTags('App: Item')
@Controller('/item')
@AuthRequired()
export class ItemController {
  constructor(private itemRepository: ItemRepository, private itemService: ItemService) {}
  @Get()
  @ApiResponse({ status: 200, type: [Item] })
  public async list(@Query() model: ListValidator) {
    return this.itemRepository.list(model);
  }
  @Get(':itemId')
  @ApiResponse({ status: 200, type: Item })
  public async details(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemRepository.findById(itemId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Item })
  public async save(@Body() model: SaveValidator) {
    return this.itemService.save(model);
  }
}

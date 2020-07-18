import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { Item } from 'modules/database/models/item';

import { ItemRepository } from '../repositories/item';
import { ListValidator } from '../validators/user/list';

@ApiTags('App: Item')
@Controller('/item')
@AuthRequired([enRoles.admin])
export class ItemController {
  constructor(private itemRepository: ItemRepository) {}

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
}

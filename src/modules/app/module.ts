import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ItemController } from './controllers/item';
import { OrderController } from './controllers/order';
import { OrderedItemController } from './controllers/orderedItem';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { ItemRepository } from './repositories/item';
import { OrderRepository } from './repositories/order';
import { OrderedItemRepository } from './repositories/orderedItem';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { ItemService } from './services/item';
import { OrderService } from './services/order';
import { OrderedItemService } from './services/orderedItem';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, OrderedItemController, ItemController, OrderController],
  providers: [
    AuthService,
    UserService,
    ItemService,
    OrderService,
    OrderedItemService,
    UserRepository,
    DeviceRepository,
    OrderRepository,
    OrderedItemRepository,
    ItemRepository
  ]
})
export class AppModule {}

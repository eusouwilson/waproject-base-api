import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ItemController } from './controllers/item';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { ItemRepository } from './repositories/item';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { ItemService } from './services/item';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, ItemController],
  providers: [AuthService, UserService, ItemService, UserRepository, DeviceRepository, ItemRepository]
})
export class AppModule {}

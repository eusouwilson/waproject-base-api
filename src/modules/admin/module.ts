import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ItemController } from './controllers/item';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { ItemService } from './services/item';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule, ItemController],
  controllers: [AuthController, UserController, TestController, ItemService],
  providers: [AuthService, UserRepository, UserService]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}

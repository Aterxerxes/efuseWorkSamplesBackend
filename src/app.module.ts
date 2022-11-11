import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
console.log('==================================');
console.log('Bacon MongoDB Connection String:', process.env.MONGODB_CONNSTRING);
console.log('==================================');
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      // @ts-expect-error: This doesn't need a get or set, which the store expects.
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNSTRING),
    PostModule,
  ],
})
export class AppModule {}

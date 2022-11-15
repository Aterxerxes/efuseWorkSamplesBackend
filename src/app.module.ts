import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

const getConnectionString = (database) => {
  const result =
    process.env.MONGODB_CONNSTRING +
    database +
    process.env.MONGODB_CONN_OPTIONS;
  return result;
};

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
    MongooseModule.forRoot(getConnectionString('efuse')),
    PostModule,
    CommentModule,
  ],
})
export class AppModule {}

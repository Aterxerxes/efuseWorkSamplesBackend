import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({
    index: true,
    unique: true,
    required: true,
  })
  id: string;

  @Prop()
  user_id: string;

  @Prop()
  created_time: string;

  @Prop()
  updated_time: string;

  @Prop()
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

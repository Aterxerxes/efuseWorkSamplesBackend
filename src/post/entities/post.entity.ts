import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { Comment, CommentSchema } from 'src/comment/entities/comment.entity';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: {
    createdAt: 'created_time',
    updatedAt: 'upddated_time',
  },
})
export class Post {
  @Prop({
    required: true,
  })
  user_id: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop({ type: [CommentSchema] })
  comments: [Comment];
}

export const PostSchema = SchemaFactory.createForClass(Post);

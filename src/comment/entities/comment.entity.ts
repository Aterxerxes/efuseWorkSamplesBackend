import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({
    required: true,
  })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

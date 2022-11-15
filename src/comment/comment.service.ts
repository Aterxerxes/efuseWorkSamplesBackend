import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const post = await this.postModel.findById(createCommentDto.postId);
      const comment = {
        text: createCommentDto.text,
      };
      post.comments.push(comment);
      post.save();
      return {
        succes: true,
        updated: post.comments[post.comments.length - 1],
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(postId: string) {
    try {
      const post = await this.postModel.findById(postId);
      return {
        comments: post.comments,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(postId: string, commentId: string) {
    try {
      const post = await this.postModel.findById(postId);
      const comment = post.comments.find((item) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: _id actually does exist, not sure why it's complaining.
        return item._id == commentId;
      });
      return {
        found: !!comment,
        comment,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    postId: string,
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ) {
    try {
      const post = await this.postModel.findById(postId);
      const index = post.comments.findIndex((item) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: _id actually does exist, not sure why it's complaining.
        return item._id == commentId;
      });
      post.comments[index].text = updateCommentDto.text;
      await post.save();
      return {
        success: true,
        updated: post.comments[index],
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(postId: string, commentId: string) {
    try {
      const post = await this.postModel.findById(postId);
      const index = post.comments.findIndex((item) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: _id actually does exist, not sure why it's complaining.
        return item._id == commentId;
      });
      post.comments.splice(index, 1);
      await post.save();
      return {
        success: true,
        remaining: post.comments,
      };
    } catch (error) {
      throw error;
    }
  }
}

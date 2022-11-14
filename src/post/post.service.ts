import { HttpStatus, HttpException, Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = new this.postModel({
      ...createPostDto,
    });

    try {
      const result = await newPost.save();
      delete result._id;
      return {
        message: 'Successfully Saved',
        post: result,
      };
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return {
          message: 'Invalid Parameters',
          errors: Object.keys(error.errors),
        };
      }
      throw new HttpException('Error creating Post.', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const posts = await this.postModel.find();
      return {
        posts,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const post = await this.postModel.findById(id);
      return {
        post,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(updatePostDto: UpdatePostDto) {
    try {
      const response = await this.postModel.updateOne(
        { _id: updatePostDto.id },
        { content: updatePostDto.content },
      );
      if (response.acknowledged) {
        const post = await this.postModel.findById(updatePostDto.id);
        return {
          succes: true,
          updated: post,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const post = await this.postModel.findByIdAndRemove(id);
      return {
        success: !!post,
        removed: post,
      };
    } catch (error) {
      throw error;
    }
  }
}

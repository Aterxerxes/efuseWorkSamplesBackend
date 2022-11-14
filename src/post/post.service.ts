import { HttpStatus, HttpException, Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import mongoose, { Model, Connection } from 'mongoose';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel('Post') private readonly postModel: Model<Post>,
  ) {}

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

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

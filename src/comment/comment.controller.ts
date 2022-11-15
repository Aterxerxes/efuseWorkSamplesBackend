import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get('all/:postId')
  findAll(@Param('postId') postId: string) {
    return this.commentService.findAll(postId);
  }

  @Get(':postId/:commentId')
  findOne(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.findOne(postId, commentId);
  }

  @Patch(':postId/:commentId')
  update(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(postId, commentId, updateCommentDto);
  }

  @Delete(':postId/:commentId')
  remove(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.remove(postId, commentId);
  }
}

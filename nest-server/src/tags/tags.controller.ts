import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { TagsService } from './tags.service';

@ApiUseTags('tags')
@Controller('api/tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async getTags(): Promise<{ tags: string[] }> {
    return this.tagsService.getTags();
  }
}

import { Controller, Get, StreamableFile, Response } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  getFile(@Response({ passthrough: true }) res): StreamableFile {
    const file = createReadStream(join(process.cwd(), '/public/profile.jpg'));

    res.set({
      'Content-Type': 'image/jpeg|image/png|application/pdf',
      'Content-Disposition': 'inline',
    });
    return new StreamableFile(file);
  }
}

import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const docFileInterceptor = FileInterceptor('file', {
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match('image/jpeg|image/png|application/pdf')) {
      cb(null, true);
    } else {
      cb(new BadRequestException(), false);
    }
  },
});

export const stampFileInterceptor = FileInterceptor('file', {
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match('image/jpeg|image/png')) {
      cb(null, true);
    } else {
      cb(new BadRequestException(), false);
    }
  },
});

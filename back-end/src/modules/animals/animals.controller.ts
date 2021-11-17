import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SafeControllerFactory } from 'src/lib/safe-crud/safe-crud.controller';
import { Animal } from 'src/models/animal.entity';
import { AnimalsService } from './animals.service';

@Controller('animals')
@ApiTags("동물 API")
export class AnimalsController extends SafeControllerFactory<Animal>(Animal) {
  constructor(private readonly animalsService: AnimalsService) {
    super(animalsService);
  }
}

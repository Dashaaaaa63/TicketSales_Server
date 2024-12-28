import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ToursService } from "../../services/tours/tours.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import e from "express";
import { Error } from "mongoose";
import { ITourClient } from "../../interfaces/ITourClient";
import { RolesGuard } from "../../guards/roles/roles.guard";
import { ITour } from "../../interfaces/ITour";

@Controller('tour-item')
export class TourItemController {

  static imgName: string;

  constructor(private toursService: ToursService) {
  }

  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: './public/',
      filename: (
        req: e.Request,
        file: Express.Multer.File,
        callback: (error: (Error | null), filename: string) => void
      ) => {
        const imgType = file.mimetype.split('/');
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const imgName = `${file.fieldname}-${uniqueSuffix}.${imgType[1]}`;

        callback(null, imgName);
        TourItemController.imgName = imgName;
      }
    })
  })
  )
  initTours(@Body() body: ITourClient): void {
    body.img = TourItemController.imgName;
    this.toursService.uploadTour(body);
  }

  @Get(':tourName')
  getToursByName(@Param('tourName') tourName: string): Promise<ITour[]> {
    return this.toursService.getToursByName(tourName);
  }



}

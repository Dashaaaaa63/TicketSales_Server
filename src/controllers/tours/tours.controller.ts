import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ToursService } from "../../services/tours/tours.service";
import { JwtAuthGuard } from "../../services/authentication/jwt-auth.guard";
import { Tour } from "../../schemas/tour";
import { ITour } from "../../interfaces/ITour";
import { ValidationParamIdPipe } from "../../pipes/param-id.pipe";

@Controller('tours')
export class ToursController {

  constructor(private toursService: ToursService) {
  }

  @Get()
  getAllTours(): Promise<Tour[]> {
    return this.toursService.getAllTours();
  }

  @Get(':id')
  getTourById(@Param('id', ValidationParamIdPipe) tourId: string): Promise<Tour> {
    return this.toursService.getTourById(tourId);
  }



  // @UseGuards(JwtAuthGuard)
  @Post()
  async initTours(): Promise<ITour[]> {
    await this.toursService.generateTours();
    return this.toursService.getAllTours();
  }

  @Delete()
  removeAllTours(): void {
    this.toursService.deleteTours();
  }
}

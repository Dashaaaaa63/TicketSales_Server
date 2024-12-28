import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Tour, TourDocument } from "../../schemas/tour";
import { Model } from "mongoose";
import { TourDto } from "../../dto/TourDto";
import { ITourClient } from "../../interfaces/ITourClient";
import { ITour } from "../../interfaces/ITour";

@Injectable()
export class ToursService {
  private toursCount: number = 10;
  
  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument> ) {
  }
  
  async generateTours(): Promise<any> {
    for (let i = 0; i <= this.toursCount; i++) {
      const tour = new TourDto(`test-${i}`, 'test dsc', 'test operator', `${(300 + (i / 10)).toFixed(2)}$`, '');
      const tourData = new this.tourModel(tour);
      await tourData.save();
    }
  }

  async deleteTours(): Promise<any> {
    return this.tourModel.deleteMany({});
  }

  async getTourById(tourId: string): Promise<Tour> {
    return this.tourModel.findById(tourId);
  }

  async getToursByName(name): Promise<ITour[]> {
    return this.tourModel.find({name: { "$regex": name, "$options": "i" }})
  }

  async getAllTours(): Promise<Tour[]> {
    return this.tourModel.find();
  }

  async uploadTour(data: ITourClient) {
    const tour = new TourDto(data.name, data.description, data.tourOperator, data.price, data.img);
    const tourData = new this.tourModel(tour);
    await tourData.save();
  }
}

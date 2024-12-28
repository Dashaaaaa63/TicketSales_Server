import { ITour } from "../interfaces/ITour";

export class TourDto implements ITour {
  _id: string;
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img: string;
  id: string;
  type: string;
  date: string;

  constructor(name: string, description: string, tourOperator: string, price: string, img) {
    this.name = name;
    this.description = description;
    this.tourOperator = tourOperator;
    this.price = price;
    this.img = img;
  }

}
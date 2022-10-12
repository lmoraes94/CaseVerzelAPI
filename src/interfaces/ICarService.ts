/* eslint-disable no-unused-vars */
import { Car } from "@prisma/client";
import { CarRows } from "../types/CarRows";

export interface ICarService {
  store(data: Pick<Car, "name" | "model" | "brand" | "price">): Promise<Car>;
  findAndCountAll(page: number, pageSize: number, q: string): Promise<CarRows>;
  findByPk(id: Car["id"]): Promise<Car | null>;
  updateImage(id: Car["id"], image: Car["image"]): Promise<Car | null>;
  update(id: number, data: Car): Promise<Car | null>;
  destroy(id: number): Promise<void>;
}

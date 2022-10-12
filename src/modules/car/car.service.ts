/* eslint-disable prefer-destructuring */
import { platform } from "process";
import { unlink } from "fs";
import { Car } from "@prisma/client";
import { ICarService } from "../../interfaces/ICarService";
import prismaClient from "../../database/index";
import { CarRows } from "../../types/CarRows";

const updateCarImage = async (image: string, id: number) => {
  let newImage = image;

  if (platform === "win32") newImage = image.split("\\")[3];
  else if (platform === "linux") newImage = image.split("/")[3];

  const newData = {
    image: `${process.env.APP_URL}/car-images/${newImage}`,
  };

  const updatedCar = await prismaClient.car.update({
    where: { id },
    data: newData,
  });

  return updatedCar;
};

class CarService implements ICarService {
  async store(
    data: Pick<Car, "model" | "brand" | "price" | "name">
  ): Promise<Car> {
    const car = await prismaClient.car.create({
      data: {
        ...data,
      },
    });

    return car;
  }

  async findAndCountAll(
    page: number,
    pageSize: number,
    q: string
  ): Promise<CarRows> {
    const totalCars = await prismaClient.car.count({
      where: {
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            brand: {
              contains: q,
            },
          },
          {
            model: {
              contains: q,
            },
          },
        ],
      },
    });

    const cars = await prismaClient.car.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            brand: {
              contains: q,
            },
          },
          {
            model: {
              contains: q,
            },
          },
        ],
      },
      take: +pageSize || 5,
      skip: +pageSize ? page * pageSize : 0,
      orderBy: {
        brand: "asc",
      },
    });

    return {
      count: totalCars,
      rows: cars,
      pageSize: +pageSize || 5,
      page: +page || 0,
    };
  }

  async findByPk(id: number): Promise<Car | null> {
    const user = await prismaClient.car.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async updateImage(id: number, image: Car["image"]): Promise<Car | null> {
    const user = await this.findByPk(id);

    const oldAvatarPath = user?.image?.split("/car-images/")[1];

    unlink(`./src/tmp/car-images/${oldAvatarPath}`, (e) => {
      if (e) console.log(e);
    });

    const updatedCar = updateCarImage(String(image), id);

    return updatedCar;
  }

  async removeImage(id: number): Promise<Car | null> {
    const car = await this.findByPk(id);

    const oldAvatarPath = car?.image?.split("/car-images/")[1];

    unlink(`./src/tmp/car-images/${oldAvatarPath}`, (e) => {
      if (e) console.log(e);
    });

    await prismaClient.car.update({
      where: { id },
      data: {
        image: null,
      },
    });

    return car;
  }

  async update(id: number, data: Car): Promise<Car | null> {
    const car = await this.findByPk(id);

    await prismaClient.car.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return car;
  }

  async destroy(id: number): Promise<void> {
    const car = await this.findByPk(id);

    if (car) {
      await this.removeImage(car.id);
      await prismaClient.car.delete({ where: { id } });
    }
  }
}

export default CarService;

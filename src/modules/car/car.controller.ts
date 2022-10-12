import { Request, Response } from "express";
import CarService from "./car.service";

class CarController {
  private carService: CarService;

  constructor() {
    this.carService = new CarService();
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const car = await this.carService.store(data);

      return res.status(201).json({
        message: "Veículo adicionado.",
        car,
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro ao adicionar veículo." });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const { page, pageSize, q } = req.query;

      let cars;

      if (page && pageSize) {
        cars = await this.carService.findAndCountAll(
          +page,
          +pageSize,
          String(q)
        );
      }

      return res.status(200).json(cars);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro ao receber veículo." });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const car = await this.carService.findByPk(+id);

      if (car === null) return res.status(204).json();

      return res.status(200).json(car);
    } catch (e) {
      console.log(e);

      return res
        .status(500)
        .json({ message: "Erro ao receber dados do veículo." });
    }
  }

  async updateImage(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const image = req.file?.path;

      let car;

      car = await this.carService.findByPk(+id);

      if (car === null) return res.status(204).json();

      if (image) car = await this.carService.updateImage(+id, image);

      return res.status(200).json({
        message: "Imagem atualizado.",
        car,
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro ao atualizar imagem." });
    }
  }

  async removeImage(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      let car;

      car = await this.carService.findByPk(+id);

      if (car === null) return res.status(204).json();

      await this.carService.removeImage(+id);

      car = await this.carService.findByPk(+id);

      return res.status(200).json({ message: "Imagem removida.", car });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro ao remover imagem." });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = req.body;

      let car;

      car = await this.carService.findByPk(+id);

      if (car === null) return res.status(204).json();

      await this.carService.update(+id, data);

      car = await this.carService.findByPk(+id);

      return res.status(200).json({
        message: "Veículo atualizado.",
        car,
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro ao atualizar veículo." });
    }
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const car = await this.carService.findByPk(+id);

      if (car === null) return res.status(204).json();

      await this.carService.destroy(+id);

      return res.status(200).json({ message: "Veículo removido." });
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Erro ao remover veículo." });
    }
  }
}

export default CarController;

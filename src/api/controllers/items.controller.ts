import { Request, Response } from 'express';

import { ItemMapper } from '../../mappers';
import { ItemsService } from '../../services';

interface IItemsController {
  getItems(req: Request, res: Response): Promise<any>;
  getItem(req: Request, res: Response): Promise<any>;
}

export class ItemsController implements IItemsController {
  itemsService: ItemsService;
  itemMapper: ItemMapper;

  constructor(itemsService: ItemsService, itemMapper: ItemMapper) {
    this.itemsService = itemsService;
    this.itemMapper = itemMapper;
  }

  async getItems(req: Request, res: Response) {
    try {
      const { q = null } = req.query;

      if (!q) {
        throw new Error('Se requiere un texto de busqueda');
      }

      // Se obtiene el listado de items
      const json: any = await this.itemsService.getItems(q as string);

      // Se obtiene el arbol de categorias con más items
      const categories = await this.itemsService.getCategoriesWithMaxResult(json.results);

      // Se mapea la respuesta
      const result = {
        author: {
          name: 'Baldassare',
          lastname: 'Cinao',
        },
        categories: [...categories],
        items: json.results.map((item: any) => this.itemMapper.toDTO(item)),
      };

      res.status(200).json(result);

    } catch (err: any) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }

  async getItem(req: Request, res: Response) {
    try {
      const { id = null } = req.params;

      if (!id) {
        throw new Error('Se requiere el id de un producto');
      }

      // Se obtiene la info del item
      const [jsonItem, jsonDescription] = await this.itemsService.getItem(id);

      // Se obtiene el arbol de categorias con más items
      const categories = await this.itemsService.getCategoriesWithMaxResult([jsonItem]);

      // Se mapea la respuesta
      const result = {
        author: {
          name: 'Baldassare',
          lastname: 'Cinao',
        },
        categories: [...categories],
        item: this.itemMapper.toDTO({ ...jsonItem, ...jsonDescription }),
      };

      res.status(200).json(result);

    } catch (err: any) {
      console.error(err);
      res.status(500).send(err.message);
    }
  }
}

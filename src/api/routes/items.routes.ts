import { Router } from 'express';
import { ItemsController } from '../controllers';
import { ItemsService } from '../../services';
import { ItemMapper } from '../../mappers';

export const itemsRoutes = Router();

const controller = new ItemsController(new ItemsService(), new ItemMapper());

itemsRoutes.get('/', (req, res) => controller.getItems(req, res));
itemsRoutes.get('/:id', (req, res) => controller.getItem(req, res));

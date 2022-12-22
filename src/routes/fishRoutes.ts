import { Request, Response, Router } from 'express';
import FishController from '../controllers/fishWikiController';

const fishWikiRoutes = Router();

const fishWikiController = new FishController();

fishWikiRoutes.post('/', (req: Request, res: Response) => {
  fishWikiController.createFish(req, res);
});

fishWikiRoutes.get('/', (req: Request, res: Response) => {
  fishWikiController.getAllFish(req, res);
});

fishWikiRoutes.get('/:id', (req: Request, res: Response) => {
  fishWikiController.getOneFishWiki(req, res);
});

fishWikiRoutes.delete('/:id', (req: Request, res: Response) => {
  fishWikiController.deleteFish(req, res);
});

fishWikiRoutes.patch('/:id', (req: Request, res: Response) => {
  fishWikiController.updateFish(req, res);
});

export default fishWikiRoutes;

import { Response, Router } from 'express';
import FishController from '../controllers/fishWikiController';
import { RequestWithUserRole } from '../Interface/fishLogInterfaces';

import AuthService from '../middlewares/auth';

const fishWikiRoutes = Router();

const authService = new AuthService();

const fishWikiController = new FishController();

fishWikiRoutes.post(
  '/',
  authService.authorize,
  (req: RequestWithUserRole, res: Response) => {
    fishWikiController.createFish(req, res);
  }
);

fishWikiRoutes.get('/', (req: RequestWithUserRole, res: Response) => {
  fishWikiController.getAllFish(req, res);
});

fishWikiRoutes.get('/:id', (req: RequestWithUserRole, res: Response) => {
  fishWikiController.getOneFishWiki(req, res);
});

fishWikiRoutes.delete(
  '/:id',
  authService.authorize,
  (req: RequestWithUserRole, res: Response) => {
    fishWikiController.deleteFish(req, res);
  }
);

fishWikiRoutes.patch(
  '/:id',
  authService.authorize,
  (req: RequestWithUserRole, res: Response) => {
    fishWikiController.updateFish(req, res);
  }
);

export default fishWikiRoutes;

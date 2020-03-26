import { Router } from 'express';

import NgoController from './controllers/NgoController';
import IncidentController from './controllers/IncidentController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';

const routes = Router();

routes.post('/session', SessionController.create);
routes.get('/profile', ProfileController.index);

routes.get('/ngos', NgoController.index);
routes.post('/ngos', NgoController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

export default routes;
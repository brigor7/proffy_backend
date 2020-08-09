import express from 'express';
import ClassController from './controller/ClassesController';

const routes = express.Router();
const classesController = new ClassController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

export default routes;

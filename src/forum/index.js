import { Router } from 'express';
import forumControler from './controler.js'

const forumRouter = new Router();

//роути 
forumRouter.get('/', forumControler.get);
forumRouter.get('/:id', forumControler.getByCountOfSpeaks);
forumRouter.post('/', forumControler.post);
forumRouter.delete('/:id', forumControler.delete_id);

export default forumRouter;
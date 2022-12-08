import { Router } from 'express';

export interface Routers {
  path: string;
  router: Router;
  initRouter: () => void;
}

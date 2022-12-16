import { Router } from 'express';

import ImageLocalUploader from '../middlewares/image/local';
import ImageController from '../controllers/image/image';
import { Routers } from '../types/layers';
import { ImageUploader } from '../types/uploader';

class ImageRouter implements Routers {
  public path;
  public router;
  private imageUploader: ImageUploader;
  private imageController;

  constructor() {
    this.path = '/api/images';
    this.router = Router();
    this.imageUploader = new ImageLocalUploader();
    this.imageController = new ImageController();

    this.initRouter();
  }

  initRouter() {
    this.router.post('/profile', this.imageUploader.upload('profileImage'), this.imageController.upload());
  }
}

export default ImageRouter;

import multer from 'multer';

import ImageUploaderConfig from '../../global/uploader/image';
import AuthRequestHandler from '../../types/auth';
import { ImageUploader } from '../../types/uploader';

class ImageLocalUploader implements ImageUploader {
  private config;
  private uploader;

  constructor() {
    this.config = new ImageUploaderConfig();
    this.uploader = multer(this.config.options);
  }

  upload(fieldname: string): AuthRequestHandler {
    return this.uploader.single(fieldname);
  }
}

export default ImageLocalUploader;

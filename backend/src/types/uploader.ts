import { Request } from 'express';
import { FileFilterCallback } from 'multer';

import AuthRequestHandler from './auth';

export interface UploaderFilterHandler {
  (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void;
}

export interface ImageUploader {
  upload(fieldname: string): AuthRequestHandler;
}

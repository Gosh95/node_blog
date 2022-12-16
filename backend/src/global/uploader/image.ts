import multer, { StorageEngine, Options } from 'multer';
import fs from 'fs';

import { UploaderFilterHandler } from '../../types/uploader';
import { IMAGE_LOCAL_PATH, SUPPORTED_IMAEG_EXTENSIONS, MAX_FILE_SIZE } from '../consts/image';

class ImageUploaderConfig {
  private _options: Options;

  constructor() {
    this.createImageDir();
    this._options = {
      storage: this.initStorage(),
      fileFilter: this.initFileFilter(),
      limits: this.initLimits(),
    };
  }

  get options(): Options {
    return this._options;
  }

  private createImageDir() {
    if (!fs.existsSync(IMAGE_LOCAL_PATH)) {
      fs.mkdirSync(IMAGE_LOCAL_PATH);
    }
  }

  private initStorage(): StorageEngine {
    return multer.diskStorage({
      destination: (_req, _file, cb) => {
        cb(null, IMAGE_LOCAL_PATH);
      },
      filename: (_req, file, cb) => {
        cb(null, this.createNewFileName(file));
      },
    });
  }

  private initFileFilter(): UploaderFilterHandler {
    return (_req, file, cb) => {
      if (SUPPORTED_IMAEG_EXTENSIONS.includes(file.mimetype)) {
        return cb(null, true);
      }
      cb(new Error(`Unsupported image extension. (supported: [${SUPPORTED_IMAEG_EXTENSIONS.toString()}])`));
    };
  }

  private initLimits() {
    return { fileSize: MAX_FILE_SIZE };
  }

  private createNewFileName(file: Express.Multer.File) {
    const splitByDot = file.originalname.split('.');
    return `${splitByDot[0]}_${new Date().getTime()}.${splitByDot[1]}`;
  }
}

export default ImageUploaderConfig;

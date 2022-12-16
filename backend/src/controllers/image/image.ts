import AuthRequestHandler from '../../types/auth';

class ImageController {
  constructor() {}

  upload(): AuthRequestHandler {
    return (req, res, next) => {
      try {
        this.checkForEmptyFiles(req.file);

        return res.status(200).json({ imageUrl: req.file!.path });
      } catch (e) {
        next(e);
      }
    };
  }

  private checkForEmptyFiles(files?: Express.Multer.File | Express.Multer.File[]) {
    if (!files) {
      throw new Error('File is empty.');
    }
  }
}

export default ImageController;

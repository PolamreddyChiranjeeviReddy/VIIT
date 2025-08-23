declare namespace Express {
  interface Multer {
    File: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    }
  }

  interface Request {
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
  }
}
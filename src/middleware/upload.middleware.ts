import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directories exist
const destinationsDir = 'uploads/destinations';
const packagesDir = 'uploads/travel-packages';

[destinationsDir, packagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for destinations
const destinationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destinationsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `destination-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// Configure storage for travel packages
const packageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, packagesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `package-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter to only allow images
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer for destinations
export const uploadDestination = multer({
  storage: destinationStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

// Configure multer for travel packages
export const uploadPackage = multer({
  storage: packageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

// For memory storage (if you want to store in cloud services like Cloudinary)
export const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});
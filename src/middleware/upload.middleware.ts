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

// Helper function to save base64 image
export const saveBase64Image = (base64String: string, type: 'destination' | 'package'): string => {
  const uploadsDir = type === 'destination' ? destinationsDir : packagesDir;
  
  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  
  // Generate unique filename
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const filename = `${type}-${uniqueSuffix}.jpg`;
  const filepath = path.join(uploadsDir, filename);
  
  // Save the file
  fs.writeFileSync(filepath, buffer);
  
  return filename;
};

// Helper function to get full image URL
export const getImageUrl = (filename: string | null, type: 'destination' | 'package'): string | null => {
  if (!filename) return null;
  const uploadsDir = type === 'destination' ? 'destinations' : 'travel-packages';
  return `${process.env.API_URL || 'http://localhost:5000'}/uploads/${uploadsDir}/${filename}`;
};

// Helper function to delete image
export const deleteImage = (filename: string, type: 'destination' | 'package'): void => {
  const uploadsDir = type === 'destination' ? destinationsDir : packagesDir;
  const filepath = path.join(uploadsDir, filename);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};
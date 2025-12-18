const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const createUploadDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Storage configuration for different file types
const createStorage = (destination) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '..', 'uploads', destination);
      createUploadDir(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      // Generate unique filename with timestamp
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      const name = file.fieldname + '-' + uniqueSuffix + ext;
      cb(null, name);
    }
  });
};

// File filter for different file types
const createFileFilter = (allowedTypes) => {
  return (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`), false);
    }
  };
};

// Resume upload configuration (for candidates)
const resumeStorage = createStorage('resumes');
const resumeFileFilter = createFileFilter([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]);

const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Profile image upload configuration (for candidates and employers)
const profileImageStorage = createStorage('profiles');
const imageFileFilter = createFileFilter([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif'
]);

const uploadProfileImage = multer({
  storage: profileImageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  }
});

// Company logo upload configuration (for employers)
const companyLogoStorage = createStorage('company-logos');

const uploadCompanyLogo = multer({
  storage: companyLogoStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  }
});

// Documents upload configuration (general documents)
const documentsStorage = createStorage('documents');
const documentFileFilter = createFileFilter([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png'
]);

const uploadDocuments = multer({
  storage: documentsStorage,
  fileFilter: documentFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          message: 'File size too large'
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          success: false,
          message: 'Too many files uploaded'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          message: 'Unexpected field name'
        });
      default:
        return res.status(400).json({
          success: false,
          message: 'File upload error: ' + err.message
        });
    }
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

// Utility function to delete uploaded file
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  uploadResume: uploadResume.single('resume'),
  uploadProfileImage: uploadProfileImage.single('profileImage'),
  uploadCompanyLogo: uploadCompanyLogo.single('companyLogo'),
  uploadDocuments: uploadDocuments.array('documents', 5), // Allow up to 5 documents
  uploadMultiple: uploadDocuments.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'documents', maxCount: 3 }
  ]),
  handleMulterError,
  deleteFile
};
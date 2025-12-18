// Example usage of multer middleware in routes

/*
1. Import the multer middleware in your route file:
   const { uploadResume, uploadProfileImage, uploadCompanyLogo, handleMulterError } = require('../middlewares/multerConfig');

2. Use in routes:

// For uploading resume (single file)
router.post('/upload-resume', uploadResume, handleMulterError, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded'
    });
  }
  
  // File information available in req.file
  const fileInfo = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: req.file.path,
    size: req.file.size,
    mimetype: req.file.mimetype
  };
  
  res.json({
    success: true,
    message: 'Resume uploaded successfully',
    file: fileInfo
  });
});

// For uploading profile image
router.post('/upload-profile-image', uploadProfileImage, handleMulterError, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image uploaded'
    });
  }
  
  res.json({
    success: true,
    message: 'Profile image uploaded successfully',
    file: {
      filename: req.file.filename,
      path: req.file.path
    }
  });
});

// For uploading company logo
router.post('/upload-company-logo', uploadCompanyLogo, handleMulterError, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No logo uploaded'
    });
  }
  
  res.json({
    success: true,
    message: 'Company logo uploaded successfully',
    file: {
      filename: req.file.filename,
      path: req.file.path
    }
  });
});

// For uploading multiple documents
router.post('/upload-documents', uploadDocuments, handleMulterError, (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No files uploaded'
    });
  }
  
  const uploadedFiles = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    path: file.path,
    size: file.size
  }));
  
  res.json({
    success: true,
    message: 'Documents uploaded successfully',
    files: uploadedFiles
  });
});

// For mixed upload (multiple field types)
router.post('/upload-profile', uploadMultiple, handleMulterError, (req, res) => {
  const uploadedFiles = {};
  
  if (req.files.resume) {
    uploadedFiles.resume = req.files.resume[0];
  }
  
  if (req.files.profileImage) {
    uploadedFiles.profileImage = req.files.profileImage[0];
  }
  
  if (req.files.documents) {
    uploadedFiles.documents = req.files.documents;
  }
  
  res.json({
    success: true,
    message: 'Files uploaded successfully',
    files: uploadedFiles
  });
});

3. Frontend usage example (HTML form):

<form enctype="multipart/form-data">
  <input type="file" name="resume" accept=".pdf,.doc,.docx" />
  <input type="file" name="profileImage" accept="image/*" />
  <input type="file" name="documents" multiple accept=".pdf,.doc,.docx,image/*" />
</form>

4. Frontend usage example (JavaScript/Fetch):

const formData = new FormData();
formData.append('resume', resumeFile);
formData.append('profileImage', imageFile);

fetch('/api/upload-resume', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Upload successful:', data);
})
.catch(error => {
  console.error('Upload failed:', error);
});

5. To delete uploaded files:

const { deleteFile } = require('../middlewares/multerConfig');

// Usage in route
router.delete('/delete-file', async (req, res) => {
  try {
    const filePath = req.body.filePath;
    await deleteFile(filePath);
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting file' });
  }
});

File Types Supported:
- Resumes: PDF, DOC, DOCX (max 5MB)
- Profile Images: JPEG, JPG, PNG, GIF (max 2MB)
- Company Logos: JPEG, JPG, PNG, GIF (max 2MB)
- Documents: PDF, DOC, DOCX, JPEG, JPG, PNG (max 10MB)

File Storage:
- Files are stored in backend/uploads/ directory
- Organized by type: resumes/, profiles/, company-logos/, documents/
- Filenames are automatically generated with timestamps for uniqueness
*/
const router = require('express').Router();
const controller = require('../controllers/document.controller');
const auth = require('../middlewares/auth.middleware');
const upload = require('../middlewares/multer.middleware');

router.use(auth('user', false));

// For single file upload
router.patch(
    '/save-single-document',
    upload.single('file'),
    controller.saveSingleDocument,
);

// For multiple file upload
router.patch(
    '/save-multi-document',
    upload.array('files', 100),
    controller.saveMultipleDocument
);

// Get existing document
router.get('/my-documents', controller.getMyDocuments);

module.exports = router;

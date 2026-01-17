const router = require('express').Router();
const controller = require('../../controllers/admin/career.controller');
const auth = require('../../middlewares/auth.middleware');
const upload = require('../../middlewares/multer.middleware');
const validationSchema = require('../../validators/admin/career.validator');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

router.use(auth('admin'));

router.get('/get/:page/:limit', controller.getCareer);

router.get('/clist', controller.getCareerListWithoutPagination);

router.post(
  '/add-career',
  upload.single('careerLogo'),
  validator.body(validationSchema.addCareer),
  controller.addCareer,
);

router.get(
  '/edit-career/:id',
  validator.params(validationSchema.singleId),
  controller.editCareer,
);

router.patch(
  '/update-career/:id',
  upload.single('careerLogo'),
  //validator.body(validationSchema.updateCareer),
  controller.updateCareer,
);

router.delete(
  '/delete-career/:id',
  validator.params(validationSchema.singleId),
  controller.deleteCareer,
);

router.post(
  '/search-career',
  controller.searchCareer,
);

module.exports = router;

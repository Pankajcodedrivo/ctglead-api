const router = require('express').Router();
const controller = require('../../controllers/ctglead/profile.controller');
const auth = require('../../middlewares/auth.middleware');
const validationSchema = require('../../validators/profile.validator');
const validator = require('express-joi-validation').createValidator({
    passError: true,
});
const upload = require('../../middlewares/multer.middleware');

router.use(auth('agency', false));

router.get(
    '/get-user/:id',
    validator.params(validationSchema.singleId),
    controller.edituser,
);

router.get('/users-list', controller.listusers);

router.delete('/delete', controller.deleteAccount);

router.patch(
    '/change-password',
    validator.body(validationSchema.passchange),
    controller.passwordChange,
);
router.get('/', controller.getProfile);

router.patch('/update', controller.updateProfile);

router.patch(
    '/notification',
    validator.body(validationSchema.notificationToggle),
    controller.notificationToggle,
);

module.exports = router;

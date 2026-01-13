const router = require('express').Router();
const controller = require('../controllers/support.controller');
const auth = require('../middlewares/auth.middleware');
const validationSchema = require('../validators/support.validator');
const validator = require('express-joi-validation').createValidator({
    passError: true,
});
router.use(auth('user', false));

router.post(
    '/create-support-request',
    validator.body(validationSchema.supportValidation),
    controller.createSupport,
);

module.exports = router;

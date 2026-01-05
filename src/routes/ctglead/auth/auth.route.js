const router = require('express').Router();
const controller = require('../../../controllers/ctglead/auth.controller');
const validationSchema = require('../../../validators/auth.validator');
const validator = require('express-joi-validation').createValidator({
    passError: true,
});

router.post(
    '/login',
    validator.body(validationSchema.login),
    controller.leadLogin,
);

router.post(
    '/forgot-password',
    validator.body(validationSchema.forgot),
    controller.forgotPassword,
);

router.patch(
    '/reset-password',
    validator.body(validationSchema.ctgreset),
    controller.reset,
);

router.post(
    '/resend-otp',
    validator.body(validationSchema.forgot),
    controller.forgotPasswordResend,
);

router.post(
    '/verify-otp',
    validator.body(validationSchema.verifyCtg),
    controller.verify,
);

router.post('/refresh-tokens', controller.refreshTokenslead);

module.exports = router;


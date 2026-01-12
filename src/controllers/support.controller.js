const catchAsync = require('../helpers/asyncErrorHandler');
const service = require('../services/support.service');
const otp = require('../services/auth/otp.service');

const createSupport = catchAsync(async (req, res) => {
    userID = req.user._id;
    const data = {
        userID,
        ...req.body,
    };
    await service.saveSupport(data);
    await otp.sendSupportEmail('pankajk@scaleupsoftware.io', 'd-83a42a3e5d28433fb1451d86d5bd574a', data);
    res.status(200).json({
        message: 'Support request raised successfully'
    });
});

module.exports = {
    createSupport
};

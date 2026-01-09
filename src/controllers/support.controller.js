const catchAsync = require('../../helpers/asyncErrorHandler');
const service = require('../../services/auth/auth.service');

const createSupport = catchAsync(async (req, res) => {
    userId = req.user._id;
    const data = {
        userId,
        ...req.body,
    };
    await service.addSupport(data);
    res.status(200).json({
        message: 'Support request raised successfully'
    });
});

module.exports = {
    createSupport
};

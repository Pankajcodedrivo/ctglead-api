const router = require('express').Router();

const authRouter = require('./auth/auth.route');
const adminAuth = require('./admin/auth/auth.route');
const Profile = require('./profile/profile.route');
const settings = require('./site-settings/sitesettings.route');
const pages = require('../routes/page.route');
const userSupport = require('../routes/support.route');

//admin profile
const adminProfile = require('./admin/profile.route');
const userManagement = require('./admin/user.route');

const adminSetting = require('./admin/setting.route');
const adminDashboard = require('./admin/dashboard.route');

// ctg lead
const leadAuth = require('./ctglead/auth/auth.route');
const leadProfile = require('./ctglead/profile.route');
const leadSupport = require('./ctglead/support.route');

// all routes
router.use('/auth', authRouter);
router.use('/profile', Profile);
router.use('/settings', settings);
router.use('/pages', pages);
router.use('/support', userSupport);

// all admin route
router.use('/admin', adminAuth);
router.use('/admin/dashboard', adminDashboard);
router.use('/admin/profile', adminProfile);
router.use('/admin/user-management', userManagement);
router.use('/admin/setting', adminSetting);

// ctg lead route
router.use('/lead', leadAuth);
router.use('/lead/profile', leadProfile);
router.use('/lead/support', leadSupport);

module.exports = router;

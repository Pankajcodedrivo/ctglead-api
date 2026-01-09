const Support = require('../models/support.model');

const saveSupport = async (data) => {
    return await Support.create(data);
}

module.exports = {
    saveSupport
};

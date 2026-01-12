const Support = require('../models/support.model');

const saveSupport = async (data) => {
    try {
        return await Support.create(data);
    } catch (error) {
        throw new Error(`Failed to save support request: ${error.message}`);
    }
};

module.exports = { saveSupport };

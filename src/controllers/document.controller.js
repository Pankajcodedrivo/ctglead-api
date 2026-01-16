const catchAsync = require('../helpers/asyncErrorHandler');
const service = require('../services/document.service');

// Single Document
const saveSingleDocument = catchAsync(async (req, res) => {
    const userID = req.user._id;
    if (req.file) {
        req.body.dlDocURL = req.file.location;
    }
    const data = {
        userID,
        ...req.body,
    };
    await service.saveSingleDoc(userID, data);
    res.status(200).json({
        message: 'Document added successfully'
    });
});

// Multiple Document
const saveMultipleDocument = catchAsync(async (req, res) => {
    const userID = req.user._id;
    const files = req.files;
    const { types = [], names = [], docFor } = req.body;

    if (!files || !files.length) {
        return res.status(400).json({ message: 'No files uploaded' });
    }

    const documents = files.map((file, index) => ({
        url: file.location,
        type: docFor === 'DEC' ? types[index] : '',
        name: names[index] || '',
    }));

    await service.saveMultipleDoc({
        userID,
        docFor,
        documents,
    });

    res.status(200).json({
        message: 'Documents added successfully',
    });
});

// Get Document
const getMyDocuments = catchAsync(async (req, res) => {
    const userID = req.user._id;
    const mydoc = await service.getMyDoc(userID);
    res.status(200).json({
        data: mydoc,
    });
});

module.exports = {
    saveSingleDocument,
    saveMultipleDocument,
    getMyDocuments
};

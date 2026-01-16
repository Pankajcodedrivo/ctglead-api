const Document = require('../models/document.model');

// Single Document
const saveSingleDoc = async (userID, data) => {
    const updatedDoc = await Document.findOneAndUpdate(
        { userID },
        { $set: data },
        { upsert: true, new: true }
    );
    return updatedDoc;
};


// Multiple Document
const saveMultipleDoc = async ({ userID, docFor, documents }) => {
    const isDEC = docFor === 'DEC';
    const formattedDocs = documents.map(doc => {
        if (isDEC) {
            return {
                decType: doc.type,
                decName: doc.name,
                decURL: doc.url,
            };
        }

        // LOE
        return {
            loeName: doc.name,
            loeURL: doc.url,
        };
    });

    return Document.findOneAndUpdate(
        { userID: userID },
        {
            $push: {
                [isDEC ? 'decDoc' : 'loeDoc']: {
                    $each: formattedDocs,
                },
            },
        },
        { upsert: true, new: true }
    );
};

// Get Document
const getMyDoc = async (userID) => {
    const doc = await Document.findOne({ userID: userID });
    return doc;
};

module.exports = {
    saveSingleDoc,
    saveMultipleDoc,
    getMyDoc
};

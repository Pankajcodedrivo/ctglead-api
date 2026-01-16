const mongoose = require("mongoose");

const decDocSchema = new mongoose.Schema(
    {
        decType: {
            type: String,
            trim: true,
            required: true, // Auto / Home / etc
        },
        decURL: {
            type: String,
            default: "",
        },
        decName: {
            type: String,
            trim: true,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const loeDocSchema = new mongoose.Schema(
    {
        loeURL: {
            type: String,
            default: "",
        },
        loeName: {
            type: String,
            trim: true,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const documentSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        decDoc: [decDocSchema],
        loeDoc: [loeDocSchema],
        dlDocURL: {
            type: String,
            default: "",
        },
        dlStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);

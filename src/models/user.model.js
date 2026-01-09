const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const bcrypt = require('bcrypt');
const ApiError = require('../helpers/apiErrorConverter');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    relationship: {
      type: String,
      trim: true,
    },

    method: {
      type: String,
      enum: ["invite", "manual"],
      required: true,
    },

    inviteType: {
      type: String,
      enum: ["email", "phone"],
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate(value) {
        if (value && !validator.isEmail(value)) {
          throw new ApiError("Invalid member email", 400);
        }
      },
    },

    phone: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
  },
  { _id: false }
);

/* ================= USER ================= */
const userSchema = new mongoose.Schema(
  {
    /* BASIC INFO */
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: Date,
    },

    maritalStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    /* CONTACT */
    phoneNumber: {
      type: String,
      trim: true,
      validate(value) {
        if (value && !validator.isMobilePhone(value, "any")) {
          throw new ApiError("Invalid phone number", 400);
        }
      },
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new ApiError("Invalid email", 400);
        }
      },
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    profileimageurl: {
      type: String,
      default: "",
    },

    /* AUTH */
    password: {
      type: String,
      trim: true,
      minlength: 8,
      private: true,
    },

    address: {
      type: String,
      required: false,
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "user", "agency", "agents"],
      default: "user",
    },

    // Notification Pref
    emailNotification: {
      type: Boolean,
      default: true,
    },
    textNotification: {
      type: Boolean,
      default: true,
    },
    pushNotification: {
      type: Boolean,
      default: true,
    },
    communicationPref: {
      type: String,
      default: 'email',
    },

    /* ADDRESS */
    address: String,
    unit: String,
    city: String,
    state: String,
    zipCode: String,
    isTexas: Boolean,

    /* PRODUCTS */
    products: [
      {
        type: String,
        enum: ["auto", "life", "property", "renters", "business", "recreational"],
      },
    ],

    /* MEMBERS */
    members: [memberSchema],

    /* QUESTIONS / ANSWERS */
    answers: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 'text', email: 'text' });

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

// add apgination plugin
userSchema.plugin(paginate);

// check is user password is matching
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

// hash the user password before saving data to db
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// login user
userSchema.statics.loginUser = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError('Invalid email or password', 400);
  }

  if (user.block) {
    throw new ApiError('You are blocked by admin', 400);
  }

  return user;
};

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

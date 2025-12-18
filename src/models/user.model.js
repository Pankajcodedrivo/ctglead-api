const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const bcrypt = require('bcrypt');
const ApiError = require('../helpers/apiErrorConverter');

const userSchema = new mongoose.Schema(
  {
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

    DOB: {
      type: Date,
      required: false,
    },

    maritalStatus: {
      type: String,
      enum: ['single', 'married', 'divorced', 'widowed'],
      required: false,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: false,
    },

    phoneNumber: {
      type: String,
      required: false,
      trim: true,
      validate(value) {
        if (!validator.isMobilePhone(value, 'any')) {
          throw new ApiError('Invalid phone number', 400);
        }
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new ApiError('Invalid email', 400);
        }
      },
    },

    profileimageurl: {
      type: String,
      default: '',
    },

    password: {
      type: String,
      required: false,
      trim: true,
      minlength: 8,
      private: true,
    },

    role: {
      type: String,
      enum: ['admin', 'user', 'agency', 'agents'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
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

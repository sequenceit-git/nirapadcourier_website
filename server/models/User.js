const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['merchant', 'admin', 'rider'],
      default: 'merchant'
    },
    businessName: {
      type: String,
      trim: true
    },
    payoutDetails: {
      method: {
        type: String,
        enum: ['bKash', 'Nagad', 'Rocket', 'Bank'],
        default: 'bKash'
      },
      accountNumber: String,
      bankName: String,
      branchName: String
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'suspended'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


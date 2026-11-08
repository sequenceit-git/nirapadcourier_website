const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema(
  {
    trackingCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false // Optional for guest bookings or seeded data
    },
    recipient: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      district: { type: String, required: true },
      upazila: { type: String, required: true },
      zone: {
        type: String,
        enum: ['inside_dhaka', 'dhaka_suburb', 'outside_dhaka'],
        default: 'inside_dhaka'
      }
    },
    packageDetails: {
      weightKg: { type: Number, default: 1 },
      codAmount: { type: Number, required: true, default: 0 },
      deliveryFee: { type: Number, required: true, default: 60 },
      codFee: { type: Number, default: 0 },
      totalPayable: { type: Number, default: 0 }
    },
    status: {
      type: String,
      enum: [
        'order_placed',
        'picked_up',
        'in_transit',
        'out_for_delivery',
        'delivered',
        'cancelled',
        'returned'
      ],
      default: 'order_placed'
    },
    otp: {
      type: String
    },
    isOtpVerified: {
      type: Boolean,
      default: false
    },
    timeline: [
      {
        status: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        location: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Parcel', parcelSchema);


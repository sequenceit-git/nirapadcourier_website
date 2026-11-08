const Parcel = require('../models/Parcel');

// Fallback in-memory parcel store for development/demo when local MongoDB is offline
const fallbackParcels = [
  {
    trackingCode: 'NC-202611',
    recipient: {
      name: 'Rahim Ahmed',
      phone: '01712345678',
      address: 'House 42, Road 7, O.R. Nizam Road',
      district: 'Chittagong',
      upazila: 'Panchlaish',
      zone: 'outside_dhaka'
    },
    packageDetails: {
      weightKg: 1.5,
      codAmount: 1450,
      deliveryFee: 130,
      codFee: 14.5,
      totalPayable: 1464.5
    },
    status: 'in_transit',
    otp: '5829',
    isOtpVerified: false,
    timeline: [
      {
        status: 'order_placed',
        title: 'Consignment Created',
        description: 'Merchant registered booking online',
        location: 'Dhaka Central Hub',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000)
      },
      {
        status: 'picked_up',
        title: 'Picked Up by Hero Rider',
        description: 'Collected from merchant warehouse at Tejgaon',
        location: 'Tejgaon Sorting Center',
        timestamp: new Date(Date.now() - 18 * 3600 * 1000)
      },
      {
        status: 'in_transit',
        title: 'In Transit to Chittagong Hub',
        description: 'Dispatched via express highway logistics container',
        location: 'Comilla Bypass Hub',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000)
      }
    ]
  },
  {
    trackingCode: 'NC-778899',
    recipient: {
      name: 'Farhana Sultana',
      phone: '01898765432',
      address: 'Flat 4B, Green Road',
      district: 'Dhaka',
      upazila: 'Dhanmondi',
      zone: 'inside_dhaka'
    },
    packageDetails: {
      weightKg: 0.8,
      codAmount: 850,
      deliveryFee: 60,
      codFee: 8.5,
      totalPayable: 858.5
    },
    status: 'delivered',
    otp: '9123',
    isOtpVerified: true,
    timeline: [
      {
        status: 'order_placed',
        title: 'Consignment Created',
        description: 'Booking confirmed',
        location: 'Mirpur Hub',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000)
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Doorstep Handover',
        description: 'Assigned to Rider Tanvir (01911223344)',
        location: 'Dhanmondi Hub',
        timestamp: new Date(Date.now() - 4 * 3600 * 1000)
      },
      {
        status: 'delivered',
        title: 'Delivered & COD Collected',
        description: 'OTP verified handover completed successfully',
        location: 'Dhanmondi, Dhaka',
        timestamp: new Date(Date.now() - 1 * 3600 * 1000)
      }
    ]
  }
];

// Helper: Calculate standard delivery fees
const calculateRate = (zone, weightKg) => {
  let baseFee = 60;
  if (zone === 'dhaka_suburb') baseFee = 100;
  if (zone === 'outside_dhaka') baseFee = 130;

  const extraWeight = Math.max(0, Math.ceil(weightKg - 1));
  const extraCharge = extraWeight * 20; // 20 BDT per additional kg
  return baseFee + extraCharge;
};

// @desc    Track parcel publicly by Tracking Code
// @route   GET /api/v1/parcels/track/:trackingCode
// @access  Public
exports.trackParcel = async (req, res) => {
  try {
    const code = req.params.trackingCode.trim().toUpperCase();

    let parcel = null;
    try {
      parcel = await Parcel.findOne({ trackingCode: code }).populate('merchant', 'name businessName phone');
    } catch (e) {
      // If DB is offline, continue to fallback
    }

    if (!parcel) {
      parcel = fallbackParcels.find((p) => p.trackingCode === code);
    }

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: `Consignment '${code}' not found. Please verify your tracking number.`
      });
    }

    res.json({
      success: true,
      data: parcel
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Calculate rate
// @route   GET /api/v1/parcels/rate
// @access  Public
exports.getRate = (req, res) => {
  const { zone = 'inside_dhaka', weight = 1, cod = 0 } = req.query;
  const weightKg = parseFloat(weight) || 1;
  const codAmount = parseFloat(cod) || 0;

  const deliveryFee = calculateRate(zone, weightKg);
  const codFee = Math.round(codAmount * 0.01); // 1% COD fee
  const total = deliveryFee + codFee;

  res.json({
    success: true,
    data: {
      zone,
      weightKg,
      deliveryFee,
      codFee,
      totalPayable: total
    }
  });
};

// @desc    Create new consignment (Merchant)
// @route   POST /api/v1/parcels
// @access  Private (Merchant)
exports.createParcel = async (req, res) => {
  try {
    const { recipient, packageDetails } = req.body;

    if (!recipient || !recipient.name || !recipient.phone || !recipient.address) {
      return res.status(400).json({ success: false, message: 'Recipient details are required' });
    }

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingCode = `NC-${randomSuffix}`;

    const weightKg = packageDetails?.weightKg || 1;
    const codAmount = packageDetails?.codAmount || 0;
    const zone = recipient.zone || 'inside_dhaka';

    const deliveryFee = calculateRate(zone, weightKg);
    const codFee = Math.round(codAmount * 0.01);
    const totalPayable = deliveryFee + codFee;

    const initialTimeline = [
      {
        status: 'order_placed',
        title: 'Booking Confirmed',
        description: 'Consignment placed in merchant portal',
        location: recipient.district || 'Dhaka',
        timestamp: new Date()
      }
    ];

    let newParcel;
    try {
      newParcel = await Parcel.create({
        trackingCode,
        merchant: req.user?._id,
        recipient: { ...recipient, zone },
        packageDetails: {
          weightKg,
          codAmount,
          deliveryFee,
          codFee,
          totalPayable
        },
        otp: Math.floor(1000 + Math.random() * 9000).toString(),
        timeline: initialTimeline
      });
    } catch (dbErr) {
      // In-memory fallback
      newParcel = {
        trackingCode,
        recipient: { ...recipient, zone },
        packageDetails: { weightKg, codAmount, deliveryFee, codFee, totalPayable },
        status: 'order_placed',
        timeline: initialTimeline,
        createdAt: new Date()
      };
      fallbackParcels.push(newParcel);
    }

    res.status(201).json({
      success: true,
      message: 'Consignment booked successfully',
      data: newParcel
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get merchant consignments
// @route   GET /api/v1/parcels/my-parcels
// @access  Private
exports.getMyParcels = async (req, res) => {
  try {
    let parcels = [];
    try {
      parcels = await Parcel.find({ merchant: req.user._id }).sort('-createdAt');
    } catch (e) {
      parcels = fallbackParcels;
    }

    res.json({ success: true, count: parcels.length, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


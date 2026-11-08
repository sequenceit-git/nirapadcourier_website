const express = require('express');
const router = express.Router();
const {
  trackParcel,
  getRate,
  createParcel,
  getMyParcels
} = require('../controllers/parcelController');
const { protect } = require('../middleware/auth');

router.get('/track/:trackingCode', trackParcel);
router.get('/rate', getRate);
router.post('/', protect, createParcel);
router.get('/my-parcels', protect, getMyParcels);

module.exports = router;


const { Vendor } = require('../models');
const { validateVendor, checkValidation } = require('../middleware/validation');

// Create Vendor
exports.createVendor = [
  ...validateVendor,
  checkValidation,
  async (req, res) => {
    try {
      const createData = req.body;
      createData["createdAt"] = req.user.id;
      createData["updatedAt"] = req.user.id;
      const vendor = await Vendor.create(createData);
      res.status(201).json(vendor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all Vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (vendor) {
      res.status(200).json(vendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Vendor
exports.updateVendor = [
  ...validateVendor,
  checkValidation,
  async (req, res) => {
    try {
      const [updated] = await Vendor.update(req.body, { where: { id: req.params.id } });
      if (updated) {
        const vendor = await Vendor.findByPk(req.params.id);
        res.status(200).json(vendor);
      } else {
        res.status(404).json({ message: 'Vendor not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Delete Vendor
exports.deleteVendor = async (req, res) => {
  try {
    const deleted = await Vendor.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const { body, param, validationResult } = require('express-validator');
const { ContractorCategory, ContractorUnit, Dispatch, ItemCategory, ItemFeature,  MaterialInward, Item, Contractor, Vendor, UserTable } = require('../models');

// Validation for ContractorCategory
exports.validateContractorCategory = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required')
];


// Validation for Contractor
exports.validateContractor = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Email must be valid')
    .notEmpty().withMessage('Email is required')
];

// Validation for ContractorUnit
exports.validateContractorUnit = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),
  body('contractorId')
    .isInt().withMessage('Contractor ID must be an integer')
    .custom(async (contractorId) => {
      const contractor = await Contractor.findByPk(contractorId);
      if (!contractor) {
        throw new Error('Contractor ID does not exist');
      }
    }),
  body('categoryId')
    .isInt().withMessage('Category ID must be an integer')
    .custom(async (categoryId) => {
      const category = await ContractorCategory.findByPk(categoryId);
      if (!category) {
        throw new Error('Category ID does not exist');
      }
    })
];

// Validation for ContractorUnitAssignment
exports.validateContractorUnitAssignment = [
  body('contractorId')
    .isInt().withMessage('Contractor ID must be an integer')
    .custom(async (contractorId) => {
      const contractor = await Contractor.findByPk(contractorId);
      if (!contractor) {
        throw new Error('Contractor ID does not exist');
      }
    }),
  body('unitId')
    .isInt().withMessage('Unit ID must be an integer')
    .custom(async (unitId) => {
      const unit = await ContractorUnit.findByPk(unitId);
      if (!unit) {
        throw new Error('Unit ID does not exist');
      }
    })
];

// Validation for Dispatch
exports.validateDispatch = [
	body('name')
			.isString().withMessage('Name must be a string')
			.notEmpty().withMessage('Name is required'),
	// Add more validations as needed
	];

	// Validation for ItemCategory
	exports.validateItemCategory = [
	body('name')
			.isString().withMessage('Name must be a string')
			.notEmpty().withMessage('Name is required')
	];

	// Validation for Item
	exports.validateItem = [
	body('categoryId')
			.isInt().withMessage('Category ID must be an integer')
			.custom(async (categoryId) => {
			const category = await ItemCategory.findByPk(categoryId);
			if (!category) {
					throw new Error('Category ID does not exist');
			}
			}),
	body('item')
			.isString().withMessage('Item must be a string')
			.notEmpty().withMessage('Item is required'),
	body('featureId')
			.isInt().withMessage('Feature ID must be an integer')
			.custom(async (featureId) => {
			const feature = await ItemFeature.findByPk(featureId);
			if (!feature) {
					throw new Error('Feature ID does not exist');
			}
			})
	];

	// Validation for ItemFeature
	exports.validateItemFeature = [
	body('feature')
			.isString().withMessage('Feature must be a string')
			.notEmpty().withMessage('Feature is required')
	];

	// Validation for MaterialInward
exports.validateMaterialInward = [
  body('itemId')
    .isInt().withMessage('Item ID must be an integer')
    .custom(async (itemId) => {
      const item = await Item.findByPk(itemId);
      if (!item) {
        throw new Error('Item ID does not exist');
      }
    }),
  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be an integer greater than 0'),
  body('contractorId')
    .isInt().withMessage('Contractor ID must be an integer')
    .custom(async (contractorId) => {
      const contractor = await Contractor.findByPk(contractorId);
      if (!contractor) {
        throw new Error('Contractor ID does not exist');
      }
    }),
  body('vendorId')
    .isInt().withMessage('Vendor ID must be an integer')
    .custom(async (vendorId) => {
      const vendor = await Vendor.findByPk(vendorId);
      if (!vendor) {
        throw new Error('Vendor ID does not exist');
      }
    })
];

// Validation for UserTable
exports.validateUserTable = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Email must be valid')
    .notEmpty().withMessage('Email is required'),
  body('password')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password is required')
];

// Validation for Vendor
exports.validateVendor = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required')
];
  

// Middleware to check validation results
exports.checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

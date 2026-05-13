import { body } from "express-validator";

export const orderValidation = [
  body("customerName")
    .trim()
    .notEmpty().withMessage("Customer name is required"),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/).withMessage("Enter a valid 10-digit Indian phone number"),

  body("address.street")
    .trim()
    .notEmpty().withMessage("Street address is required"),

  body("address.city")
    .trim()
    .notEmpty().withMessage("City is required"),

  body("address.state")
    .trim()
    .notEmpty().withMessage("State is required"),

  body("address.pincode")
    .trim()
    .notEmpty().withMessage("Pincode is required")
    .matches(/^\d{6}$/).withMessage("Enter a valid 6-digit pincode"),

  body("items")
    .isArray({ min: 1 }).withMessage("Order must have at least one item"),

  body("items.*.product")
    .notEmpty().withMessage("Product ID is required for each item"),

  body("items.*.name")
    .trim()
    .notEmpty().withMessage("Item name is required"),

  body("items.*.price")
    .isFloat({ min: 0 }).withMessage("Item price must be a positive number"),

  body("items.*.quantity")
    .isInt({ min: 1 }).withMessage("Quantity must be at least 1"),

  body("totalAmount")
    .isFloat({ min: 0 }).withMessage("Total amount must be a positive number"),
];

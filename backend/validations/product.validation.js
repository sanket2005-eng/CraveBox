import { body } from "express-validator";

export const productValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name must be under 100 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ max: 500 }).withMessage("Description must be under 500 characters"),

  body("category")
    .trim()
    .notEmpty().withMessage("Category is required"),

  body("image")
    .trim()
    .notEmpty().withMessage("Image URL is required")
    .isURL().withMessage("Image must be a valid URL"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5"),

  body("available")
    .optional()
    .isBoolean().withMessage("Available must be a boolean"),

  body("featured")
    .optional()
    .isBoolean().withMessage("Featured must be a boolean"),
];

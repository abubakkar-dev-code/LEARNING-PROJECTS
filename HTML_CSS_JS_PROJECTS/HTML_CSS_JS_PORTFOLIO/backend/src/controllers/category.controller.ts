import { NextFunction, Request, response, Response } from "express";
import ApiError from "../utils/api-error";
import SkillCategory from "../models/skill.category.model";
import ApiResponse from "../utils/api-response";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, order } = req.body;
    if (!name || !order) {
      throw new ApiError(400, "Please provide required fields");
    }
    const existingCategory = await SkillCategory.findOne({ name });
    if (existingCategory) {
      throw new ApiError(400, "Category already exists");
    }
    const category = await SkillCategory.create({
      name,
      order,
    });
    return res
      .status(200)
      .json(new ApiResponse("created successfully", category));
  } catch (error) {
    next(error);
    console.log(error);
  }
};
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await SkillCategory.find();
    if (!categories) {
      throw new ApiError(404, "No skill categories found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse("skill categories fetched successfully", categories),
      );
  } catch (error) {
    next(error);
  }
};
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, order } = req.body;
    const { categoryId } = req.params;
    if (!name && !order) {
      throw new ApiError(400, "Please provide required fields");
    }
    const category = await SkillCategory.findByIdAndUpdate(
      categoryId,
      {
        name: name ?? undefined,
        order: order ?? undefined,
      },
      { new: true }
    );
    if (!category) {
      throw new ApiError(404, "No category found with this id");
    }
    return res
      .status(201)
      .json(new ApiResponse("updated successfully", category));
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { categoryId } = req.params;
    const category = await SkillCategory.findByIdAndDelete(categoryId);
    if (!category) {
      throw new ApiError(404, "category not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("deleted successfully", category));
  } catch (error) {
    next(error);
  }
};

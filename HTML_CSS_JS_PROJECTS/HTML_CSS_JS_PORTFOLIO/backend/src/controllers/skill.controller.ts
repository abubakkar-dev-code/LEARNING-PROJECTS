import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import Skill from "../models/skill.model";
import ApiResponse from "../utils/api-response";

export const createSkill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, category, order } = req.body;
    if (!name || !category || !order) {
      throw new ApiError(400, "all fields are required");
    }
    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      throw new ApiError(400, "skill already exists");
    }
    const skill = await Skill.create({
      name,
      category,
      order,
    });
    return res
      .status(201)
      .json(new ApiResponse("skill created successfully", skill));
  } catch (error) {
    next(error);
  }
};
export const getSkill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const skills = await Skill.find().populate("category");
    if (!skills) {
      throw new ApiError(400, "No skills found");
    }
    return res
      .status(200)
      .json(new ApiResponse("skills fetched successfully", skills));
  } catch (error) {
    next(error);
  }
};
export const updateSkill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, category, order } = req.body;
    const { skillId } = req.params;
    if (!name && !category && !order) {
      throw new ApiError(400, "Please provide the fields to be updated");
    }
    const existingSkill = await Skill.findByIdAndUpdate(
      skillId,
      { name, category, order },
      { new: true },
    );
    if (!existingSkill) {
      throw new ApiError(404, "skill nor found");
    }
    return res
      .status(200)
      .json(new ApiResponse("skill updated successfully", existingSkill));
  } catch (error) {
    next(error);
  }
};
export const deletSkill = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { skillId } = req.params;
    const skill = await Skill.findByIdAndDelete(skillId);
    if (!skill) {
      throw new ApiError(404, "skill not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("skill deleted successfully", skill));
  } catch (error) {
    next(error);
  }
};

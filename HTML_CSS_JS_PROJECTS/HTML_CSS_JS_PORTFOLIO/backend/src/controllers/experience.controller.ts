import { Response, Request, NextFunction } from "express";
import ApiError from "../utils/api-error";
import Experience from "../models/experience.model";
import ApiResponse from "../utils/api-response";

export const createExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      company,
      role,
      startDate,
      endDate,
      location,
      description,
      technologies,
      order,
    } = req.body;
    if (!company || !role || !startDate || !endDate) {
      throw new ApiError(400, "Please provide the required details");
    }
    const existingExperience = await Experience.findOne({ company });
    if (existingExperience) {
      throw new ApiError(400, "Experience with same company already exists");
    }
    const experience = await Experience.create({
      company,
      role,
      startDate,
      endDate,
      location,
      description,
      technologies,
      order,
    });
    return res
      .status(201)
      .json(new ApiResponse("Experience created successfully", experience));
  } catch (error) {
    next(error);
  }
};
export const getExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    if (experience.length == 0) {
      throw new ApiError(404, "No experience found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Experience Fetched", experience));
  } catch (error) {
    next(error);
  }
};
export const getExperienceById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { experienceId } = req.params;
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      throw new ApiError(404, "Experience not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Experience Fetched", experience));
  } catch (error) {
    next(error);
  }
};
export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { experienceId } = req.params;
    const {
      role,
      company,
      startDate,
      endDate,
      location,
      description,
      technologies,
      order,
    } = req.body;
    if (
      !role &&
      !company &&
      !startDate &&
      !endDate &&
      !location &&
      !description &&
      technologies &&
      order
    ) {
      throw new ApiError(400, "please provide the updating fields");
    }
    const existingExperience = await Experience.findById(experienceId);
    if (!existingExperience) {
      throw new ApiError(404, "Experience not found");
    }
    if (company && existingExperience.company !== company) {
      const experience = await Experience.findOne({
        company,
        _id: { $ne: experienceId },
      });
      if (experience) {
        throw new ApiError(400, "Experience with same company already exists");
      }
    }
    existingExperience.company = company ?? existingExperience.company;
    existingExperience.role = role ?? existingExperience.role;
    existingExperience.startDate = startDate ?? existingExperience.startDate;
    existingExperience.endDate = endDate ?? existingExperience.endDate;
    existingExperience.location = location ?? existingExperience.location;
    existingExperience.description =
      description ?? existingExperience.description;
    existingExperience.technologies =
      technologies ?? existingExperience.technologies;
    existingExperience.order = order ?? existingExperience.order;
    await existingExperience.save();
    return res
      .status(200)
      .json(
        new ApiResponse("Experience updated successfully", existingExperience),
      );
  } catch (error) {
    next(error);
  }
};
export const deleteExperience = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { experienceId } = req.params;
    const experience = await Experience.findByIdAndDelete(experienceId);
    if (!experience) {
      throw new ApiError(404, "Experience not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Experience deleted successfully", experience));
  } catch (error) {
    next(error);
  }
};

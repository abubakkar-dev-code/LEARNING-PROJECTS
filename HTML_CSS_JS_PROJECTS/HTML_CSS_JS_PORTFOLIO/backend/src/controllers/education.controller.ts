import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/api-error";
import Education from "../models/education.model";
import ApiResponse from "../utils/api-response";
export const createEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { degeree, institution, field, startYear, endYear, order } = req.body;
    if (!degeree || !institution || !field) {
      throw new ApiError(400, "Please provide all the required fields");
    }
    const existingEducation = await Education.findOne({ degeree });
    if (existingEducation) {
      throw new ApiError(400, "Education with same name is already present");
    }
    const education = await Education.create({
      degeree,
      institution,
      field,
      startYear,
      endYear,
      order,
    });
    return res.status(201).json({
      success: true,
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    next(error);
  }
};
export const getEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const education = await Education.find();
    if (!education) {
      throw new ApiError(404, "No Education found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Educations fetched successfully", education));
  } catch (error) {
    next(error);
  }
};
export const getSingleEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { educationId } = req.params;
    const education = await Education.findById(educationId);
    if (!education) {
      throw new ApiError(404, "No Education found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Education fetched successfully", education));
  } catch (error) {
    next(error);
  }
};
export const updateEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { educationId } = req.params;
    const { degeree, institution, field, startYear, endYear, order } = req.body;
    if (
      !degeree &&
      !institution &&
      !field &&
      !startYear &&
      !endYear &&
      !order
    ) {
      throw new ApiError(400, "Please provide the details to update");
    }
    const education = await Education.findById(educationId);
    if (!education) {
      throw new ApiError(404, "No education found");
    }
    if (degeree && degeree !== education.degeree) {
      const education = await Education.findOne({
        degeree,
        _id: { $ne: educationId },
      });
      if (education) {
        throw new ApiError(400, "Education with same name already exists");
      }
    }
    education.degeree = degeree ?? education.degeree;
    education.institution = institution ?? education.institution;
    education.field = field ?? education.field;
    education.startYear = startYear ?? education.startYear;
    education.endYear = endYear ?? education.endYear;
    education.order = order ?? education.order;
    await education.save();
    return res
      .status(200)
      .json(new ApiResponse("Education updated successfully", education));
  } catch (error) {
    next(error);
  }
};
export const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { educationId } = req.params;
    const education = await Education.findByIdAndDelete(educationId);
    if (!education) {
      throw new ApiError(404, "No education found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Education deleted successfully", education));
  } catch (error) {
    next(error);
  }
};

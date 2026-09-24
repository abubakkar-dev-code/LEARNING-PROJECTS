import { NextFunction, Request, Response } from "express";
import Resume from "../models/resume.model";
import ApiError from "../utils/api-error";
import cloudinary from "../config/cloudinary";
import { error } from "node:console";
import ApiResponse from "../utils/api-response";

export const uploadResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resume = await Resume.findOne();
    if (resume) {
      throw new ApiError(
        400,
        "There's already one resume is exist,try to update instead",
      );
    }
    const file = req.file;
    if (!file) {
      throw new ApiError(400, "Please provide the resume");
    }
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resume",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("CLOUDINARY ERROR:", error);
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(file.buffer);
    });
    const newResume = await Resume.create({
      publicId: result.public_id,
      url: result.secure_url,
      originalFileName: file.originalname,
    });
    newResume.save();
    return res
      .status(201)
      .json(new ApiResponse("Resume is uploaded successfully", newResume));
  } catch (error) {
    next(error);
  }
};
export const getResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Resume is fetched successfully", resume));
  } catch (error) {
    next(error);
  }
};
export const updateResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }
    const file = req.file;
    if (!file) {
      throw new ApiError(400, "Please provide the file");
    }
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "resume",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(file.buffer);
    });
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });
    resume.publicId = result.public_id;
    resume.url = result.secure_url;
    resume.originalFileName = file.originalname;
    await resume.save();
    return res
      .status(200)
      .json(new ApiResponse("Resume is updated successfully", resume));
  } catch (error) {
    next(error);
  }
};
export const deleteResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      throw new ApiError(404, "Resume not found");
    }
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });
    await Resume.findByIdAndDelete(resume._id);
    return res
      .status(200)
      .json(new ApiResponse("Resume is deleted successfully", resume));
  } catch (error) {
    next(error);
  }
};

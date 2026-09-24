import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/api-error";
import Profile from "../models/profile.model";
import ApiResponse from "../utils/api-response";
import Project from "../models/project.model";

export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      email,
      role,
      aboutDescription,
      profileImg,
      location,
      socialLinks,
    } = req.body;
    if (!name || !email || !role || !aboutDescription) {
      throw new ApiError(400, "Please provide all the required fieids");
    }
    const existingProfile = await Profile.findOne();
    if (!existingProfile) {
      const profile = await Profile.create({
        name,
        email,
        role,
        aboutDescription,
        profileImg,
        location,
        socialLinks,
      });
      return res.status(201).json(new ApiResponse("profile created", profile));
    }
    throw new ApiError(400, "There's an already profile Exist");
  } catch (error) {
    next(error);
  }
};
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      throw new ApiError(404, "There's no profile exists");
    }
    return res.status(200).json(new ApiResponse("profile fetched", profile));
  } catch (error) {
    next(error);
  }
};
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      email,
      role,
      aboutDescription,
      profileImg,
      location,
      socialLinks,
    } = req.body;
    if (
      !name &&
      !email &&
      !role &&
      !aboutDescription &&
      !profileImg &&
      !location &&
      !socialLinks
    ) {
      throw new ApiError(400, "Please required fieilds to update");
    }
    const profile = await Profile.findOne();
    if (!profile) {
      throw new ApiError(404, "Theres no profile found");
    }
    profile.name = name ?? profile.name;
    profile.email = email ?? profile.email;
    profile.role = role ?? profile.role;
    profile.aboutDescription = aboutDescription ?? profile.aboutDescription;
    profile.profileImg = profileImg ?? profile.profileImg;
    profile.location = location ?? profile.location;
    profile.socialLinks = socialLinks ?? profile.socialLinks;
    await profile.save();
    return res
      .status(200)
      .json(new ApiResponse("profile updated successfully", profile));
  } catch (error) {
    next(error);
  }
};
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Project deleted successfully", project));
  } catch (error) {
    next(error);
  }
};

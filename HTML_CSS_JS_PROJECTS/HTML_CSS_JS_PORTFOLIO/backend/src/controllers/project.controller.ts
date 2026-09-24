import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import Project from "../models/project.model";
import ApiResponse from "../utils/api-response";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      shortDescription,
      description,
      technologies,
      features,
      images,
      githubUrl,
      liveDemo,
      isFeatured,
      order,
    } = req.body;
    if (!title || !shortDescription || !description) {
      throw new ApiError(400, "Please provide the required Details");
    }
    const exisitingProject = await Project.findOne({ title });
    if (exisitingProject) {
      throw new ApiError(400, "Project with same title already exists");
    }
    const project = await Project.create({
      title,
      shortDescription,
      description,
      technologies,
      features,
      images,
      githubUrl,
      liveDemo,
      isFeatured,
      order,
    });
    res.status(201).json(new ApiResponse("Project Created", project));
  } catch (error) {
    next(error);
  }
};
export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    if (projects.length === 0) {
      throw new ApiError(404, "No projets found");
    }
    res.status(200).json(new ApiResponse("Projects Fetched", projects));
  } catch (error) {
    next(error);
  }
};
export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      throw new ApiError(404, "project not found");
    }
    res.status(200).json(new ApiResponse("Project Fetched", project));
  } catch (error) {
    next(error);
  }
};
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.params;
    const {
      title,
      shortDescription,
      description,
      technologies,
      features,
      images,
      githubUrl,
      liveDemo,
      isFeatured,
      order,
      status
    } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      throw new ApiError(400, "Project not found");
    }
    if (title && title !== project.title) {
      const exisitingProject = await Project.findOne({
        title,
        _id: { $ne: projectId },
      });
      if (exisitingProject) {
        throw new ApiError(400, "Project with same title already exists");
      }
    }
    project.title = title ?? project.title;
    project.shortDescription = shortDescription ?? project.shortDescription;
    project.description = description ?? project.description;
    project.technologies = technologies ?? project.technologies;
    project.features = features ?? project.features;
    project.images = images ?? project.images;
    project.githubUrl = githubUrl ?? project.githubUrl;
    project.liveDemo = liveDemo ?? project.liveDemo;
    project.isFeatured = isFeatured ?? project.isFeatured;
    project.order = order ?? project.order;
    project.status = status ?? project.status;
    await project.save();
    res
      .status(200)
      .json(new ApiResponse("project updated successfully", project));
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
      throw new ApiError(404, "project not found");
    }
    res
      .status(200)
      .json(new ApiResponse("Project deleted successfully", project));
  } catch (error) {
    next(error);
  }
};

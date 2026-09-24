import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import Contact from "../models/contact.module";
import ApiResponse from "../utils/api-response";

export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, contact,message} = req.body;
    if (!name || !email || !contact ||!message) {
      throw new ApiError(400, "Please provide all the fields");
    }
    const existingAddress = await Contact.findOne({ name });
    if (existingAddress) {
      throw new ApiError(400, "Address is already exist,try to update instead");
    }
    const newAddress = await Contact.create({
      name,
      email,
      contact,
      message
    });
    return res
      .status(201)
      .json(new ApiResponse("Address is created successfully", newAddress));
  } catch (error) {
    next(error);
  }
};
export const getContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const contact = await Contact.find();
    if (!contact) {
      throw new ApiError(404, "Contact is not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Address is fetched successfully", contact));
  } catch (error) {
    next(error);
  }
};
export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { contactId } = req.params;
    const { name, email, contact,message
    } = req.body;
    if (!name && !email && !contact &&!message) {
      throw new ApiError(400, "please provide the required fields");
    }
    const existingContact = await Contact.findByIdAndUpdate(contactId, {
      name,
      email,
      contact,
      message
    });
    if (!existingContact) {
      throw new ApiError(404, "contact not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Contact updated successfully", existingContact));
  } catch (error) {
    next(error);
  }
};
export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { contactId } = req.params;
    const existingContact = await Contact.findByIdAndDelete(contactId);
    if (!existingContact) {
      throw new ApiError(404, "contact not found");
    }
    return res
      .status(200)
      .json(new ApiResponse("Contact deleted successfully", existingContact));
  } catch (error) {
    next(error);
  }
};

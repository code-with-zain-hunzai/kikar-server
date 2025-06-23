import { Request, Response } from "express";
import { prisma } from "../../../config/db";
import { ApiResponse, HttpStatus } from "../../../types/api.types";

export const submitContactForm = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    console.log('Received contact form data:', req.body);
    const { fullName, email, phone, message, destination, travelType } = req.body;
    
    // Check if email or phone already exists
    const existingContact = await prisma.contact.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingContact) {
      res.status(409).json({
        success: false,
        message: "You have already submitted a contact form. Please contact us on WhatsApp for further assistance.",
        data: {
          whatsapp: "03421083883"
        }
      });
      return;
    }

    const contactData = {
      name: fullName,
      email,
      phone,
      message: `${message}\nDestination: ${destination}\nTravel Type: ${travelType}`
    };
    console.log('Attempting to save contact data:', contactData);

    const contact = await prisma.contact.create({
      data: contactData
    });
    
    console.log('Contact saved successfully:', contact);
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Form submitted successfully!",
      data: contact,
    });
  } catch (error: any) {
    console.error("Error submitting form:", error);
    // Log the full error details
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
    
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllContacts = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<void> => {
  try {
    const contacts = await prisma.contact.findMany();
    
    res.status(HttpStatus.OK).json({
      success: true,
      message: "Contacts fetched successfully",
      data: contacts
    });
  } catch (error: any) {
    console.error("Error fetching contacts:", error);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};


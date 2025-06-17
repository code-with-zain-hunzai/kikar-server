"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContacts = exports.submitContactForm = void 0;
const db_1 = require("../../config/db");
const api_types_1 = require("../../types/api.types");
const submitContactForm = async (req, res) => {
    try {
        console.log('Received contact form data:', req.body);
        const { fullName, email, phone, message, destination, travelType } = req.body;
        // Check if email or phone already exists
        const existingContact = await db_1.prisma.contact.findFirst({
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
        const contact = await db_1.prisma.contact.create({
            data: contactData
        });
        console.log('Contact saved successfully:', contact);
        res.status(api_types_1.HttpStatus.CREATED).json({
            success: true,
            message: "Form submitted successfully!",
            data: contact,
        });
    }
    catch (error) {
        console.error("Error submitting form:", error);
        // Log the full error details
        console.error("Error details:", {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });
        res.status(api_types_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
exports.submitContactForm = submitContactForm;
const getAllContacts = async (req, res) => {
    try {
        const contacts = await db_1.prisma.contact.findMany();
        res.status(api_types_1.HttpStatus.OK).json({
            success: true,
            message: "Contacts fetched successfully",
            data: contacts
        });
    }
    catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(api_types_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to fetch contacts",
            error: error.message,
        });
    }
};
exports.getAllContacts = getAllContacts;
//# sourceMappingURL=contactController.js.map
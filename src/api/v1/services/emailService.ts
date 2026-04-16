import nodemailer from "nodemailer";

/**
 * Sends an email using Nodemailer.
 */
export const sendEmail = async (
    to: string,
    subject: string,
    text: string
): Promise<void> => {

    // 🔹 check if env variables exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log("Email not configured. Skipping send.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};
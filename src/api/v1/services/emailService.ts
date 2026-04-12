import nodemailer from "nodemailer";

/**
 * Sends an email using Nodemailer.
 *
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text email body
 */
export const sendEmail = async (
    to: string,
    subject: string,
    text: string
): Promise<void> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    });
};
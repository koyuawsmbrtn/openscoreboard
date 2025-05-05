import { Resend } from 'resend';

const sendEmail = async ({
    to,
    subject,
    html,
    plainText,
}: {
    to: string;
    subject: string;
    html: string;
    plainText?: string;
}) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const response = await resend.emails.send({
            from: 'OpenScoreboard <no-reply@notifications.koyu.space>',
            to,
            subject,
            html,
            text: plainText || html.replaceAll(/<[^>]+>/g, ''),
        });
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export { sendEmail };
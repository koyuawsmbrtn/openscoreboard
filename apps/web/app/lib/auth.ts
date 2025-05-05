/* eslint-disable turbo/no-undeclared-env-vars */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                html: `Click <a href="${url}">here</a> to reset your password.`,
                plainText: `Click here to reset your password: ${url}`,
            });
        }
    },
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
    },
    user: {
        additionalFields: {
            website: {
                type: "string",
                required: false,
                default: "",
                input: true,
            },
        },
        deleteUser: {
            enabled: true,
        }
    },
    emailVerification: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sendVerificationEmail: async ( { user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Verify your email",
                html: `Click <a href="${url}">here</a> to verify your email.`,
                plainText: `Click here to verify your email: ${url}`,
            });
        }
    },
});
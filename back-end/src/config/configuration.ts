import { env } from "process";

export default () => ({
    db: {
        host: process.env.TK_KEY,
        name: process.env.DB_NAME,
    },
    token: {
        key: process.env.TK_KEY,
        name: process.env.TK_NAME,
    },
    busNumValidation: {
        api_key: process.env.BUSNUM_API_KEY,
        url: process.env.BUSNUM_URL,
    },
    mailerModule: {
        transport: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            ignoreTLS: process.env.MAIL_IGNORE_TLS,
            secure: process.env.MAIL_SECURE,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASS,
            }
        },
        defaults: {
            from: process.env.MAIL_FROM
        },
    }
})
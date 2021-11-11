export default () => (
    {
        db: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            name: process.env.DB_NAME,
            use_auth: process.env.DB_USE_AUTH,
            id: process.env.DB_ID,
            pwd: process.env.DB_PWD,
        },
        token: {
            key: process.env.TK_KEY,
            name: process.env.TK_NAME,
        },
        busNumValidation: {
            api_key: process.env.BUSNUM_API_KEY,
            url: process.env.BUSNUM_URL,
        },
        authMailTokenName: process.env.AUTH_EMAIL_TK_NAME,
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
        },
        fileStorage: {
            root: process.env.FILE_STORAGE,
            crn_path: process.env.CRN_PATH,
            mrn_path: process.env.MRN_PATH
        }
    }
)

export const getCrnPath = (): string => {
    return process.env.FILE_STORAGE + process.env.CRN_PATH;
}

export const getMrnPath = (): string => {
    return process.env.FILE_STORAGE + process.env.MRN_PATH;
}

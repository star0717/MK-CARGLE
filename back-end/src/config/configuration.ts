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
    }
})
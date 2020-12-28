if (!process.env.FRONTEND_URL) {
    throw new Error("Aborting! Environment variable FRONTEND_URL was not specified")
}
export const FRONTEND_URL = process.env.FRONTEND_URL
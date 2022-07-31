import jwt from 'jsonwebtoken'

export const isAuthenticated = (model, tokenName) => async (req, res, next) => {
    const tokens = req.cookies;
    let accessToken;

    try {

        for (let token in tokens) {
            if (tokenName === token) {
                accessToken = tokens[tokenName]
                break
            }
        }
        // console.log("accessToken ", accessToken);
        if (!accessToken) {
            throw new Error("Unauthorized : No token provided ! Please login")
        }
        const varifiedToken = jwt.verify(accessToken, process.env.PRIVATE_KEY);
        let data = await model.findById(varifiedToken.id);
        if (data) {
            if (data.modelType === "seller") {
                req.seller = data
            }
            else if (data.modelType === "buyer") {
                req.buyer = data
            }
        }
        next();

    } catch (error) {
        console.log("error in auth.s file ", error.message);
        res.status(401).json({ error: `${error.message}`, tokens })
    }
}
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.Role)) {
            return res.status(501).json({ error: `Role : ${req.user.Role} is cannot access this resource | you are not super admin` })
        }
        next();
    }
}
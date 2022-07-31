import buyer from "../../model/buyer-model.js";
import bcrypt from 'bcryptjs'



const tokenName = "buyerAccessToken"

// login buyer
export const buyerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Invalid credentials")
        }

        const user = await buyer.findOne({ email: email }).select("+password");
        if (!user) {
            throw new Error("Invalid credentials ! please Try again latter")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        console.log("buyer password is matched ............", isPasswordMatch);
        if (!isPasswordMatch) {
            throw new Error("Invalid credentials ! please Try again latter")
        };

        sendToken(user, tokenName, res)

    } catch (error) {
        return res.json({ success: false, message: `${error.message}` });
    }
}



// logout user
export const logoutbuyer = async (req, res) => {
    try {
        res.cookie(tokenName, null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.json({ success: true, message: "logout successfully" })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}
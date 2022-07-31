
import bcrypt from 'bcryptjs'
import buyer from '../../model/buyer-model.js';
import seller from "../../model/seller-model.js";
import sendToken from '../../utils/jwtToken.js';



let tokenName;

// login user
export const userLogin = async (req, res) => {
    try {
        const { email, password, modelType } = req.body;

        // if (modelType !== "seller" || modelType !== "buyer") throw new Error("modelType must be seller or buyer")

        if (!email || !password) throw new Error("Invalid credentials")

        let user, isPasswordMatch;

        if (modelType === "seller") {
            user = await seller.findOne({ email: email }).select("+password");
            if (!user) throw new Error("Invalid credentials ! please Try again latter")

            isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) throw new Error("Invalid credentials ! please Try again latter")

            tokenName = "sellerAccessToken"
            sendToken(user, tokenName, res)
        }
        else if (modelType === "buyer") {
            user = await buyer.findOne({ email: email }).select("+password");
            if (!user) throw new Error("Invalid credentials ! please Try again latter")
            isPasswordMatch = await bcrypt.compare(password, user.password)

            console.log("user password is matched ............", isPasswordMatch);
            if (!isPasswordMatch)  throw new Error("Invalid credentials ! please Try again latter")

            tokenName = "buyerAccessToken"
            sendToken(user, tokenName, res)
        }
    } catch (error) {
        return res.json({ success: false, message: `${error.message}` });
    }
}



// logout user
export const logoutuser = async (req, res) => {
    try {
        if (req.seller) tokenName = "sellerAccessToken"
        else if (req.buyer) tokenName = "buyerAccessToken"
        else if (!req.seller || !req.buyer) throw new Error("Please login before logout")
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

 
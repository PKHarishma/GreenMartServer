import jwt from 'jsonwebtoken';

export const AuthSeller = async (req, res, next) => {
    try {
        const { sellerToken } = req.cookies;

        if (!sellerToken) {
            return res.status(401).json({
                success: false,
                message: "Seller not authorized"
            });
        }

        const tokenDecode = jwt.verify(
            sellerToken,
            process.env.JWT_SECRET
        );

        if (tokenDecode.email !== process.env.SELLER_EMAIL) {
            return res.status(401).json({
                success: false,
                message: "Seller not authorized"
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};
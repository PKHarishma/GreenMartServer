import jwt from 'jsonwebtoken';

export const logInSeller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (process.env.SELLER_EMAIL === email && process.env.SELLER_PASSWORD === password) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 3600000,
            });
            return res.status(200).json({ success:true,message: 'Login successful' });
        }

        return res.status(401).json({ success:false,message: 'Invalid credentials' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}

export const isAuthenticated = (req, res) => {
    try{
        return res.json({success: true, message: 'Seller is authenticated'});
    }
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

export const logOutSeller=(req,res)=>{
    try{
        res.clearCookie('sellerToken',{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production'?'none':'strict',
      })
      return res.json({success:true,message:'Logged Out'})
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

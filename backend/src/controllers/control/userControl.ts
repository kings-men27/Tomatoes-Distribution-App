import { Request, Response } from "express";

/# The sign up or register code should be here i don't get what you are doing here ???/
/*export const register = async (req: Request, res: Response) => {
    try {
        const errors = validateRegister(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }
        const user = await registerUser(req.body);
        return res.status(201).json({ success: true, data: user });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};*/ 

/# Where is the login code ? what is this for ?/
/*export const login = async (req: Request, res: Response) => {
    try {
        const result = await loginUser(req.body);
        return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        return res.status(401).json({ success: false, message: error.message })
    }
}

;*/
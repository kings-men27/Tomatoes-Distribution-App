//MIDDLEWARE FOR AUTH IS EXPECTED HERE ALL VALIDATORS IN VALIDATOR FILE
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const validateRegister = (data: any) => {
    const errors: string[] = [];

    if (!data.first_name) errors.push('First name is required');
    if (!data.last_name) errors.push('Last name is required');
    if (!data.email) errors.push('Email is required');
    if (!data.password) errors.push('Password is required');
    if (!data.password && data.password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    return errors;
};

export const authenticate = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
           success: false,
           message: 'Invalid or expired token.' 
        });
    }
};

export const authorizeRoles = (...roles: string[]) => {
    return (req:any, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.'
            });
        }
        next();
    };
};
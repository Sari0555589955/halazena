import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from './authentication.middleWare'
export const checkRole = (...roles: Array<any>) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send("Access Forbidden")
        }
        next()
    }
}
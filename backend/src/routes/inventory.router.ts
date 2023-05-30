import { Router } from 'express'


import { Authentication } from '../middleWares/authentication.middleWare';
import { checkRole } from '../middleWares/checkRoles.middleWare';
import { Roles } from '../enum/enums.enum';
import { getHistoryInv, } from '../controller/inventroy.controller';
const router: Router = Router();


router.route('/getHistory/:invId').get(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), getHistoryInv)
export default router;
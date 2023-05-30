import { Router } from 'express'
import { createOrder, deleteOrder, getALLOrders, getHowManyOrdersInOneDay, getOrderById, getOrdersByUser, UpdateOrder } from '../controller/order.controller';
import { Roles } from '../enum/enums.enum';
import { Authentication } from '../middleWares/authentication.middleWare';
import { checkRole } from '../middleWares/checkRoles.middleWare';
import { validate } from '../middleWares/validator.middleWare';
import { orderValidation } from '../model/order.model';


const router: Router = Router();

router.route('/add').post(Authentication, checkRole(Roles.USER,Roles.ADMIN,Roles.SUPER_ADMIN), validate(orderValidation, 'post'), createOrder)
router.route('/getAll/:params?').get(Authentication, checkRole(Roles.ADMIN, Roles.SUB_ADMIN, Roles.USER, Roles.SUPER_ADMIN)
, getALLOrders)
router.route('/getOrdersByUser').get(Authentication,checkRole(Roles.USER,Roles.ADMIN,Roles.SUPER_ADMIN,Roles.SUB_ADMIN),getOrdersByUser)
router.route('/delete/:orderId').delete(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), deleteOrder)
router.route('/update/:orderId').put(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), UpdateOrder)
router.route('/getById/:orderId').get(Authentication, checkRole(Roles.ADMIN, Roles.SUB_ADMIN, Roles.USER, Roles.SUPER_ADMIN)
    , getOrderById)
router.route('/howmanyInDay').get(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN,Roles.SUB_ADMIN), getHowManyOrdersInOneDay)


export default router;
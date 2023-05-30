import { Router } from 'express'
import { addToCart, deleteCartByUser, deleteFromCart, getCartWithUser, updateQuantityInCart, } from '../controller/cart.controller';
import { Roles } from '../enum/enums.enum';
import { Authentication } from '../middleWares/authentication.middleWare';
import { checkRole } from '../middleWares/checkRoles.middleWare';
const router: Router = Router();

router.route('/add').post(Authentication,checkRole(Roles.USER,Roles.ADMIN), addToCart)
// router.route('/deleteItem').delete(deleteProductFromTheCart)
router.route('/getAllByUser').get(Authentication,checkRole(Roles.ADMIN,Roles.USER), getCartWithUser)
router.route('/delete/:productId').delete(Authentication, checkRole(Roles.ADMIN, Roles.USER) ,deleteFromCart)
router.route("/updateQuantity/").put(Authentication, checkRole(Roles.ADMIN, Roles.USER) ,updateQuantityInCart)
router.route('/deleteAllByUser').delete(Authentication, checkRole(Roles.ADMIN, Roles.USER) ,deleteCartByUser)


export default router;
import { Router } from 'express';
import { addToSavedProduct, deleteProductFromTheSavedProduct, getAllSavedProducts, getSavedProductByUser } from '../controller/savedProduct.controller';
import { Roles } from '../enum/enums.enum';
import { Authentication } from '../middleWares/authentication.middleWare';
import { checkRole } from '../middleWares/checkRoles.middleWare';
import { validate } from '../middleWares/validator.middleWare';
import { savedProductValidation } from '../model/savedProduct';

const router = Router();

router.route('/getAll').get(Authentication,checkRole(Roles.USER,Roles.ADMIN,Roles.SUPER_ADMIN,Roles.SUB_ADMIN),getAllSavedProducts)
router.route("/getByUser/:userId").get(Authentication, checkRole(Roles.USER,Roles.ADMIN,Roles.SUPER_ADMIN,Roles.SUB_ADMIN), getSavedProductByUser)
router.route("/add").post(Authentication, checkRole(Roles.USER,Roles.ADMIN,Roles.SUPER_ADMIN), validate(savedProductValidation, 'post'), addToSavedProduct)

router.route('/delete/:productId').delete(Authentication, checkRole(Roles.USER,Roles.ADMIN,Roles.SUPER_ADMIN) ,deleteProductFromTheSavedProduct)


export default router;

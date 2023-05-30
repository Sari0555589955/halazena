import { getAllSubCategories } from './../controller/category.controller';
import { Router } from "express";
import { addCategory, addSubCategory, categoryTotalAmount_TotalSum, deleteCategory, getAllCategory, getCategoryById, updateCategory } from "../controller/category.controller";
import { Roles } from "../enum/enums.enum";
import { Authentication } from "../middleWares/authentication.middleWare";
import { checkRole } from "../middleWares/checkRoles.middleWare";
import { validate } from "../middleWares/validator.middleWare";
import { categoryValidation } from "../model/category.model";

const router: Router = Router();

router.route('/add').post(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), validate(categoryValidation, 'post'), addCategory)
router.route('/addSub/:id').post(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), validate(categoryValidation, 'post'), addSubCategory)
router.route('/getAll').get(getAllCategory)
router.route('/getAllSub/:id').get(getAllSubCategories)
router.route('/getById/:id').get(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.SUB_ADMIN), getCategoryById)
router.route('/update/:id').put(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), updateCategory)
router.route('/delete/:id').delete(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), deleteCategory)
router.route('/totalAmount_TotalSum').get(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), categoryTotalAmount_TotalSum)
export default router;
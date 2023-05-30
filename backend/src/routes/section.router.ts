import { Router } from 'express'
import { addSection, deleteSection, getAllSections, getSectionById, updateSection } from '../controller/section.controller';
import { Roles } from '../enum/enums.enum';
import { Authentication } from '../middleWares/authentication.middleWare';
import { checkRole } from '../middleWares/checkRoles.middleWare';
import { validate } from '../middleWares/validator.middleWare';
import { sectionValidation } from '../model/section.model';

const router: Router = Router();


router.route('/add').post(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), validate(sectionValidation, 'post'), addSection)
router.route('/getAll').get(getAllSections)
router.route('/getById').get(Authentication, checkRole(Roles.ADMIN,Roles.SUB_ADMIN,Roles.SUPER_ADMIN), getSectionById)
router.route('/update/:sectionId').put(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), updateSection)
router.route('/delete/:sectionId').delete(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), deleteSection)
export default router;
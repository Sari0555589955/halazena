import { Router } from 'express'
import { createContact, deleteContact, getAllContact, getContactById } from '../controller/contact.controller';
import { Roles } from '../enum/enums.enum';
import { Authentication } from '../middleWares/authentication.middleWare';
import { checkRole } from '../middleWares/checkRoles.middleWare';
import { validate } from '../middleWares/validator.middleWare';
import { contactValidation } from '../model/contact.model';
const router: Router = Router();

router.route('/add').post(validate(contactValidation, 'post'), createContact)

router.route('/getAll/:contactType?').get(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.SUB_ADMIN), getAllContact)
router.route('/getById/:contactId').get(Authentication, checkRole(Roles.ADMIN, Roles.SUB_ADMIN, Roles.SUPER_ADMIN), getContactById)

router.route('/delete/:complaintId').delete(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), deleteContact)

export default router;
import { Router } from 'express'
import { validate } from '../middleWares/validator.middleWare';
import { userValidation } from '../model/user.model';
import { addRole, addUserWithRole, adminCreateUser, adminLogin, createUser, deleteUser, getAllusers, getMe, getUserAndGuestInDay, getUserById, loginUser, updateUser, userLogout } from './../controller/user.controller';
import { Authentication } from '../middleWares/authentication.middleWare';
import { checkRole } from '../middleWares/checkRoles.middleWare';
import { Roles } from '../enum/enums.enum';
const router: Router = Router();

router.post('/register', Authentication, checkRole(Roles.ADMIN, Roles.USER,Roles.SUPER_ADMIN), validate(userValidation, 'post'), createUser)
router.post('/adminCreateUser', Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), validate(userValidation, 'post'), adminCreateUser)
router.post('/login', loginUser)
router.post('/adminLogin', adminLogin)
router.route('/addUserWithRole').post(Authentication, checkRole(Roles.SUPER_ADMIN,Roles.SUPER_ADMIN), validate(userValidation, 'post'), addUserWithRole)

router.get('/getAll/:roleType?', Authentication, checkRole(Roles.ADMIN, Roles.SUB_ADMIN, Roles.SUPER_ADMIN), getAllusers)
router.get('/getById/:userId', Authentication, checkRole(Roles.ADMIN, Roles.SUB_ADMIN, Roles.SUPER_ADMIN), getUserById)
router.route('/me').get(Authentication, checkRole(Roles.ADMIN, Roles.USER,Roles.SUPER_ADMIN ), getMe)
router.route('/update/:userId').put(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN, Roles.USER), validate(userValidation, 'put'), updateUser)
router.route('/delete/:userId').delete(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), deleteUser)
router.route('/delete/admin/:userId').delete(Authentication, checkRole( Roles.SUPER_ADMIN), deleteUser)
router.route('/addRole/:userId').put(Authentication, checkRole(Roles.ADMIN, Roles.SUPER_ADMIN), validate(userValidation, 'put'), addRole)
router.route('/logout').put(Authentication, checkRole(Roles.USER, Roles.ADMIN,Roles.SUPER_ADMIN), userLogout)
router.route('/getUserAndGuestInDay').get(Authentication, checkRole(Roles.ADMIN,Roles.SUPER_ADMIN), getUserAndGuestInDay)
export default router;
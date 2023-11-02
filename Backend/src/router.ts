import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { createContact, deleteContact, editContact, getContact } from './handlers/contact';
import { handleInputError } from './modules/middleware';
import {getUser} from './handlers/user'
const router = Router();

router.get('/getUser/:id', getUser);
router.get('/getContact/:id', getContact);

export default router;
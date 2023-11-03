import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { createContact, deleteContact, editContact, getContact } from './handlers/contact';
import { handleInputError } from './modules/middleware';
import { getMediaLinks ,updateMedia} from './handlers/mediaLinks';
import {getUser,updateUser} from './handlers/user'
const router = Router();

router.get('/getUser/:id', getUser);
router.get('/getContact/:id', getContact);
router.put('/updateUser/:id', updateUser);
router.put('/updateContact/:id', editContact);
router.get('/getMediaLinks/:id', getMediaLinks);
router.put('/updateMediaLinks/:id', updateMedia);
export default router;
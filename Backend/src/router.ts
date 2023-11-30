import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { createContact, deleteContact, editContact, getContact } from './handlers/contact';
import { handleInputError } from './modules/middleware';
import { getMediaLinks ,updateMedia} from './handlers/mediaLinks';
import {getUser,updateUser} from './handlers/user'
import { createCampagin, getAllCampaign, getAllCampaignInfluencer } from './handlers/campaing';
const router = Router();

router.get('/getUser/:id', getUser);
router.get('/getContact/:id', getContact);
router.put('/updateUser/:id', updateUser);
router.put('/updateContact/:id', editContact);
router.get('/getMediaLinks/:id', getMediaLinks);
router.put('/updateMediaLinks/:id', updateMedia);
router.post('/createCampaign', createCampagin);
router.get('/allCampaigns/:id', getAllCampaign);
router.get('/allCampaigns', getAllCampaignInfluencer);
export default router;
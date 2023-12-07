import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { createContact, deleteContact, editContact, getContact } from './handlers/contact';
import { handleInputError } from './modules/middleware';
import { getMediaLinks ,updateMedia} from './handlers/mediaLinks';
import {getInfluencer, getUser,updateUser} from './handlers/user'
import { createCampagin, getAllCampaign, getAllCampaignInfluencer, getAllCampaign_byCampaign_id } from './handlers/campaing';
import { changeStatusOfProposal, getIndividualProposal, getProposal, postProposal } from './handlers/proposal';
import { getCollaborationInfluencer } from './handlers/collaboration';
import getTags from './handlers/campaign_tags';
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
router.post('/postProposal',postProposal)
router.get('/getProposal/:id',getProposal)
router.get('/getIndividualProposal/:id',getIndividualProposal)
router.put('/acceptOrRejectProposal/:id',changeStatusOfProposal)
router.get('/getCollaborationInfluencer/:id',getCollaborationInfluencer)
router.get('/getTags',getTags)
router.get('/getInfluencer',getInfluencer)
router.get('/getAllCampaign_byCampaign_id/:id',getAllCampaign_byCampaign_id)
export default router;
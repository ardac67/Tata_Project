import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import { createContact, deleteContact, editContact, getContact } from './handlers/contact';
import { handleInputError } from './modules/middleware';
import { getMediaLinks ,updateMedia} from './handlers/mediaLinks';
import {getInfluencer, getUser,updateUser, updateUser2} from './handlers/user'
import { createCampagin, deleteCampaign, getAllCampaign, getAllCampaignInfluencer, getAllCampaign_byCampaign_id } from './handlers/campaing';
import { changeStatusOfProposal, getIndividualProposal, getProposal, postProposal } from './handlers/proposal';
import { getCollaborationInfluencer } from './handlers/collaboration';
import getTags from './handlers/campaign_tags';
import getCollaborationAdvertiser from './handlers/CollaborationsAdv';
import { createMessage, returnBasedMessages } from './handlers/message';
import { updateCampaignStatus } from './handlers/updateCampaignStatus';
import { commentExists, commentExistsForAdvertiser, getRating, postRating } from './handlers/rating';
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
router.get('/getCollaborationAdvertiser/:id',getCollaborationAdvertiser)
router.get('/getTags',getTags)
router.get('/getInfluencer',getInfluencer)
router.get('/getAllCampaign_byCampaign_id/:id',getAllCampaign_byCampaign_id)
router.post('/createMessage',createMessage)
router.get('/returnBasedMessages/:id',returnBasedMessages)
router.put('/updateCampaignStatus/:campaign_id', updateCampaignStatus);
router.post('/postRating',postRating)
router.get('/commentExists/:user_id/:toUser_id',commentExists)
router.get('/getRating/:toUser_id',getRating)
router.get('/commentExists1/:user_id/:toUser_id/:campaign_id',commentExistsForAdvertiser)
router.delete('/deleteCampaign/:id',deleteCampaign)
export default router;
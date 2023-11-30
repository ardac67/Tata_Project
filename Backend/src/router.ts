import { Router } from 'express'
import { body, oneOf } from 'express-validator'
import {
  createContact,
  deleteContact,
  editContact,
  getContact
} from './handlers/contact'
import { handleInputError } from './modules/middleware'
import { getMediaLinks, updateMedia } from './handlers/mediaLinks'
import { getUser, updateUser } from './handlers/user'
import { createCampagin, getAllCampaign } from './handlers/campaing'
import multer from 'multer'
import path from 'path'
const router = Router()

router.get('/getUser/:id', getUser)
router.get('/getContact/:id', getContact)
router.put('/updateUser/:id', updateUser)
router.put('/updateContact/:id', editContact)
router.get('/getMediaLinks/:id', getMediaLinks)
router.put('/updateMediaLinks/:id', updateMedia)
router.post('/createCampaign', createCampagin)
router.get('/allCampaigns/:id', getAllCampaign)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../photos')
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const userId = req.params.id
    const originalName = file.originalname
    const fileExtension = originalName.split('.').pop()
    const newFileName = `${userId}.jpeg`
    cb(null, newFileName)
  }
})
const upload = multer({ storage })

// Set up a route to handle photo uploads
router.post('/uploadProfileImage/:id', upload.single('photo'), (req, res) => {
  res.send('Photo uploaded successfully')
})
export default router

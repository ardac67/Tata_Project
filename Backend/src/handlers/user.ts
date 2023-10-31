import prisma from '../db'
import { hashPassword, createJWT, comparePasswords } from '../modules/aut'

export const createNewUser = async (req, res) => {
  try {
    const hash = await hashPassword(req.body.password);
    await prisma.$transaction(async tx => {
      const user = await tx.user.create({
        data: {
          user_name: req.body.user_name,
          password: hash,
          Type: req.body.type,
          name: req.body.name,
          description: req.body.description
        }
      })
      await tx.contact.create({
        data: {
          email: req.body.contact.email,
          phone: req.body.contact.phone,
          user_id: user.user_id,
          address: req.body.contact.address
        }
      })
      await tx.media_links.create({
        data: {
          platform: req.body.media_links.media_links,
          user_id: user.user_id,
          link_of_platform: req.body.media_links.link_of_platform,
          subscribers: req.body.media_links.subscribers
        }
      })
      const token = createJWT(user);
      res.json({
        data: {
          user_id:user.user_id,
          type: user.Type,
          token: token

        }
      })
    })
    
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export const signin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_name: req.body.user_name
      }
    })
    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
      res.status(401)
      res.json({ message: 'Invalid credidentials' })
      return
    }
    const token = createJWT(user)
    res.status(200)
    res.json({ token: token, user_id: user.user_id })
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

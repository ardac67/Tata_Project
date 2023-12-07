import prisma from '../db'
import { hashPassword, createJWT, comparePasswords } from '../modules/aut'

export const createNewUser = async (req, res) => {
  try {
    const hash = await hashPassword(req.body.password)
    await prisma.$transaction(async tx => {
      const user = await tx.user.create({
        data: {
          user_name: req.body.user_name,
          email: req.body.email,
          password: hash,
          Type: req.body.type,
          name: req.body.name,
          description: req.body.description
        }
      })
      await tx.contact.create({
        data: {
          phone: req.body.contact.phone,
          user_id: user.user_id,
          address: req.body.contact.address
        }
      })
      await tx.media_links.create({
        data: {
          youtube: req.body.media_links.youtube,
          instagram: req.body.media_links.instagram,
          twitter: req.body.media_links.twitter,
          tiktok: req.body.media_links.tiktok,
          user_id: user.user_id
        }
      })
      const token = createJWT(user)
      res.json({
        data: {
          user_id: user.user_id,
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
    res.json({
      token: token,
      user_id: user.user_id,
      type: user.Type,
      user_name: user.user_name,
      full_name: user.name
    })
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: req.params.id
      }
    })
    res.json({ user })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}
export const updateUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        user_id: req.params.id
      },
      data: {
        user_name: req.body.user_name,
        email: req.body.email,
        name: req.body.full_name,
        description: req.body.description,
        updatedAt: new Date()
      }
    })
    res.json({ user })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export const getInfluencer = async (req, res) => {
  try {
    const influencer = await prisma.user.findMany({
      where:{
        Type:'Influencer'
      }
    })
    res.json({ influencer })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

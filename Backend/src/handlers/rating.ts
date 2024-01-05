import prisma from '../db'

export const postRating = async (req, res) => {
  try {
    const rating = await prisma.rating.create({
      data: {
        rating: req.body.rating,
        rating_text: req.body.rating_text,
        user_id: req.body.user_id,
        toUser_id: req.body.toUser_id,
        campaign_id: req.body.campaign_id
      }
    })
    res.json({ rating })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export const commentExists = async (req, res) => {
  try {
    const exists = await prisma.rating.findMany({
      where : {
        user_id: req.body.user_id,
        toUser_id: req.body.toUser_id,
      }
    })
    res.json({ exists })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}
export const getRating = async (req, res) => {
  try {
    const rating = await prisma.rating.findMany({
      where: {
        toUser_id: req.params.toUser_id
      },
      include :{
        belongToUser: true,
        belongToCampaign:{
          include:{
            campaing_tags: true
          }
        }
      }
    })  
    res.json({ rating })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}
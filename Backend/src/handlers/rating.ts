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
    var exists2 = await prisma.campaign.findMany({
      where: {
        campaign_id: req.params.toUser_id // Use req.params for route parameters
      }
    })
    var user_id = exists2[0].user_id
    console.log(user_id)

    const exists = await prisma.rating.count({
      where: {
        user_id: req.params.user_id, // Use req.params here as well
        toUser_id: user_id,
        campaign_id: req.params.toUser_id
      }
    })

    res.status(200).json({ exists }) // Combine status and json into one call
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: e.message }) // Combine status and json into one call
  }
}
export const commentExistsForAdvertiser = async (req, res) => {
  try {
    var exists2 = await prisma.rating.count({
      where: {
        campaign_id: req.params.campaign_id, // Use req.params for route parameters
        toUser_id: req.params.toUser_id,
        user_id: req.params.user_id
      }
    })
    res.status(200).json({ exists2 }) // Combine status and json into one call
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ error: e.message }) // Combine status and json into one call
  }
}

export const getRating = async (req, res) => {
  try {
    const rating = await prisma.rating.findMany({
      where: {
        toUser_id: req.params.toUser_id
      },
      include: {
        belongToUser: true,
        belongToCampaign: {
          include: {
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

import prisma from '../db'
export const createMediaLinks = async (req, res) => {}
export const getMediaLinks = async (req, res) => {
  try {
    const allInfo = await prisma.media_links.findMany({
      where: {
        user_id: req.params.id
      }
    })
    res.status(200)
    res.json({ data: allInfo })
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}
export const updateMedia = async (req, res) => {
  try {
      const user = await prisma.media_links.updateMany({
        where:{
          user_id: req.params.id
        },
        data:{
          youtube: req.body.youtube,
          twitter: req.body.twitter,
          tiktok: req.body.tiktok,
          instagram: req.body.instagram,
        }
      })
    res.json({user})
    res.status(200)
  } catch (e) { 
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}
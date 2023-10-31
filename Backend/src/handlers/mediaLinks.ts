import prisma from '../db'
export const createMediaLinks = async (req,res) => {
 
}
export const getMediaLinks = async (req,res) => {
    try{
      const allInfo = await prisma.media_links.findMany({
        where: {
          user_id: req.params.user_id
        }
      })
      res.status(200)
      res.json({ data: allInfo })
    }
    catch(e){
      console.log(e)
      res.status(500)
      res.json({ error: e })
    }
  }
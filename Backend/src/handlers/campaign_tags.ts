import prisma from '../db'
export const getTags = async (req, res) => {
  try {
    const tags = await prisma.campaing_tags.findMany({})
    res.json({ tags })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export default getTags

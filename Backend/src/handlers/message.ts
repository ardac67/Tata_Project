import prisma from '../db'
export const createMessage = async (req, res) => {
  try {
    const message = await prisma.messages.create({
      data: {
        collaboration_id: req.body.collaboration_id,
        message_body: req.body.message_body,
        user_name: req.body.user_name
      }
    })
    res.json({ message })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export const returnBasedMessages = async (req, res) => {
    try {
        const messages = await prisma.messages.findMany({
        where: {
            collaboration_id: req.params.id
        }
        })
        res.json({ messages })
        res.status(200)
    } catch (e) {
        console.log(e)
        res.status(500)
        res.json({ error: e })
    }
}
import prisma from '../db'

export const createContact = async (req, res) => {}
export const getContact = async (req, res) => {
  try {
    const user = await prisma.contact.findMany({
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
export const editContact = async (req, res) => {}
export const deleteContact = async (req, res) => {}

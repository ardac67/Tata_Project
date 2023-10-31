import prisma from '../db'

export const createDemography = async (req, res) => {
  try {
    await prisma.$transaction(async tx => {
      const user = await tx.audience_demography.create({
        data: {
          age_interval: req.body.age_interval,
          gender_information: req.body.gender_information,
          user_id: req.body.user_id,
        }
      })
      res.json({
        data: user
      })
    })
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}
export const getDemography = async (req, res) => {
    try {
      const demography = await prisma.audience_demography.findUnique({
        where: {
            demograph_id: req.params.demograph_id
        }
      })
      res.status(200)
      res.json({ data:demography })
    } catch (e) {
      console.log(e)
      res.status(500)
      res.json({ error: e })
    }
}
export const editDemography = async (req, res) => {
    try {
        const data_demograph=req.body
        const demography = await prisma.audience_demography.update({
        where: {
            demograph_id: req.params.demograph_id
        },
        data:data_demograph
      })
      res.status(200)
      res.json({ data:demography })
    } catch (e) {
      console.log(e)
      res.status(500)
      res.json({ error: e })
    }
}
//deleteDemography
export const deleteDemography = async (req, res) => {
    try {
        const demography = await prisma.audience_demography.delete({
        where: {
            demograph_id: req.params.demograph_id
        }
      })
      res.status(200)
      res.json({ data:demography })
    } catch (e) {
      console.log(e)
      res.status(500)
      res.json({ error: e })
    }
}
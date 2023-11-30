import prisma from '../db'

export const postProposal = async (req, res) => {
  try {
    const proposal = await prisma.proposal.create({
      data: {
        user_id: req.body.user_id,
        proposal_body: req.body.proposal_body,
        campaign_id: req.body.campaign_id,
        proposal_status: req.body.proposal_status,
        createdAt: new Date(),
      }
    })
    res.json({ proposal })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}
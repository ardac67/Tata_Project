import prisma from '../db'

export const postProposal = async (req, res) => {
  try {
    const proposal_find = await prisma.proposal.count({
      where: {
        user_id: req.body.user_id,
        belongsToCampaign: {
          campaign_id: req.body.campaign_id
        }
      }
    })
    if(proposal_find > 0){
      res.status(500)
      res.json({error: 'Proposal already sent'})
      return
    }
    const proposal = await prisma.proposal.create({
      data: {
        user_id: req.body.user_id,
        proposal_body: req.body.proposal_body,
        campaign_id: req.body.campaign_id,
        proposal_status: req.body.proposal_status,
        createdAt: new Date()
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

export const getProposal = async (req, res) => {
  try {
    const proposal = await prisma.proposal.findMany({
      include: {
        belongsToUser: true,
        belongsToCampaign:true
      },
      where: {
        campaign_id: req.params.id,
        proposal_status: 'pending'
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
export const getIndividualProposal = async (req, res) => {
  try {
    const proposal = await prisma.proposal.findMany({
      where: {
        user_id: req.params.id
      },
      include: {
        belongsToCampaign: {
          include: {
            user: true
          }
        },
        belongsToUser: true
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
export const changeStatusOfProposal = async (req, res) => {
  try {
    var proposal;
    if (req.body.status === 'Approved') {
       proposal = await prisma.proposal.update({
        data: {
          proposal_status: req.body.status
        },
        where: {
          proposal_id: req.params.id
        }
      })
      await prisma.collaboration.create({
        data:{
          campaign_id: req.body.campaign_id,
          user_id: req.body.user_id,
          proposed_user_id: req.body.proposed_user_id,
          createdAt: new Date()
        }
        

      })
    } else {
      proposal = await prisma.proposal.update({
        data: {
          proposal_status: req.body.status
        },
        where: {
          proposal_id: req.params.id
        }
      })
    }
    res.json({ proposal })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

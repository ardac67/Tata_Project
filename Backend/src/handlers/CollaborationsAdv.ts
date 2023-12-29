import prisma from '../db'
export const getCollaborationAdvertiser = async (req, res) => {
  try {
    var proposal = await prisma.collaboration.findMany({
      where: {
        user_id: req.params.id
      },
      include: {
        belongToCampaign:{
          include:{
            user:true
          }
        },
        belongToUser: true,
      }
    })
    var users_array = [];
    for(var i = 0; i < proposal.length; i++) {
      const users = await prisma.user.findUnique({
        where:{
          user_id: proposal[i].proposed_user_id
        }
      })
      users_array.push(users)
    }
      proposal = proposal.map((proposals) =>({
        ...proposals,
          user: users_array.find((user) => user.user_id === proposals.proposed_user_id)
      }) 
      
    )
    res.json({ proposal })
    res.status(200)
  } catch (e) {
    console.log(e)
    res.status(500)
    res.json({ error: e })
  }
}

export default getCollaborationAdvertiser

import prisma from "../db";



export const updateCampaignStatus = async (req, res) => {
  const { campaignId, newStatus } = req.body;

  try {
    const updatedCampaign = await prisma.campaign.update({
      where: {
        campaign_id: req.params.campaign_id,
      },
      data: {
        status: req.body.newStatus,
      },
    });

    res.json({
      data: {
        updatedCampaign,
      },
    });
  } catch (e) {
    console.error('Error updating campaign status', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




import prisma from "../db";

export const createCampagin = async (req, res) => {
  try {
    await prisma.$transaction(async (tx) => {
      const campaign = await tx.campaign.create({
        data: {
          user_id: req.body.user_id,
          campaign_header: req.body.campaign_header,
          campaign_description: req.body.campaign_description,
          status: req.body.status,
          startedAt: parseAndFormatDate(req.body.campaignStartDate),
          endedAt: parseAndFormatDate(req.body.campaignEndDate),
        },
      });
      const collaboration = await tx.collaboration_preferences.create({
        data: {
          target_audience: req.body.target_audience,
          age_interval: req.body.age_interval,
          gender_information: req.body.gender_information,
          statistical_interval: req.body.statistical_interval,
          campaign_id: campaign.campaign_id,
        },
      });
      const tags = await tx.campaing_tags.create({
        data: {
          tag1: req.body.tag1,
          tag2: req.body.tag2,
          tag3: req.body.tag3,
          tag4: req.body.tag4,
          tag5: req.body.tag5,
          campaign_id: campaign.campaign_id,
        },
      });
      const preffered_platforms = await tx.preffered_platforms.create({
        data: {
          platform: req.body.platform,
          preference_id: collaboration.preference_id,
        },
      });
      res.json({
        data: {
          campaign: campaign,
          collaboration: collaboration,
          tags: tags,
          preffered_platforms: preffered_platforms,
        },
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ error: e });
  }
};
export const getAllCampaign = async (req, res) => {
  try {
    const campaign = await prisma.campaign.findMany({
      where: {
        user_id: req.params.id,
      },
    });
    res.json({
      campaign: campaign,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ error: e });
  }
};

function parseAndFormatDate(dateString) {
  // Parse the date string to a JavaScript Date object
  const jsDate = new Date(dateString);

  return jsDate;
}

export const getAll = async (req, res) => {
  try {
    const campaign = await prisma.campaign.findMany({});
    res.json({
      campaign: campaign,
    });
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ error: e });
  }
};

const newsService = require('../services/newsService');

const redisClient = require('../cacheManager');
const getAllNews = async (req, res, next) => {
  try {
    const { user } = req;
    const news = await redisClient.GET('news-list');

    if (!news) {
      const dataFormApi = await newsService.getAllNews(user);
      await redisClient.SET(
        'news-list',
        // eslint-disable-next-line comma-dangle
        JSON.stringify(dataFormApi),
        {
          EX: 180,
          // NX: true,
          // eslint-disable-next-line comma-dangle
        }
      );
      return res.status(200).send({ fromCache: false, data: dataFormApi });
    }
    res.status(200).send({ fromCache: true, data: JSON.parse(news) });
  } catch (error) {
    next(error);
  }
};

const getPreferences = (req, res, next) => {
  try {
    const preferences = newsService.getPreferences(req.user);
    res.status(200).send(preferences);
  } catch (error) {
    next(error);
  }
};

const modifyPreferences = (req, res, next) => {
  const preferences = req.body;
  try {
    const updatedPreferences = newsService.modifyPreferences(
      req.user,
      // eslint-disable-next-line comma-dangle
      preferences
    );
    res.status(200).send(updatedPreferences);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllNews,
  getPreferences,
  modifyPreferences,
};

const newsService = require('../services/newsService');
const getAllNews = async (req, res) => {
  try {
    const { user } = req;
    const news = await newsService.getAllNews(user);
    res.status(200).send(news);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send(error?.message || 'Internal Server Error.');
  }
};

const getPreferences = (req, res) => {
  try {
    const preferances = newsService.getPreferences(req.user);
    res.status(200).send(preferances);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send(error?.message || 'Internal Server Error.');
  }
};

const modifyPreferences = (req, res) => {
  const preferances = req.body;
  try {
    const updatedPreferances = newsService.modifyPreferences(
      req.user,
      // eslint-disable-next-line comma-dangle
      preferances
    );
    res.status(200).send(updatedPreferances);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send(error?.message || 'Internal Server Error.');
  }
};

module.exports = {
  getAllNews,
  getPreferences,
  modifyPreferences,
};

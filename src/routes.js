const Router = require('koa-router');
const newsController = require('./newsController');

const router = new Router();

router.get('/news', newsController.getAllNews);
router.post('/news', newsController.createNews);
router.get('/news/:id', newsController.getNewsById);
router.put('/news/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);

module.exports = router;

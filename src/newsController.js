const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://mongo:27017';
const dbName = 'newsdb';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
    console.log('Connected to MongoDB');
});

const getAllNews = async (ctx) => {
    try {
        const { sort, filter } = ctx.query;
        const query = {};
        const options = {};

        if (filter) {
            query.title = new RegExp(filter, 'i');
        }

        if (sort) {
            const [field, order] = sort.split(':');
            options.sort = { [field]: order === 'desc' ? -1 : 1 };
        }

        const news = await db.collection('news').find(query).sort(options.sort || {}).toArray();
        ctx.body = news;
    } catch (err) {
        ctx.throw(500, 'Internal Server Error');
    }
};

const createNews = async (ctx) => {
    try {
        const { date, title, shortDescription, text } = ctx.request.body;
        if (!date || !title || !shortDescription || !text) {
            ctx.throw(400, 'All fields are required');
        }
        const newNews = { date, title, shortDescription, text };
        const result = await db.collection('news').insertOne(newNews);
        ctx.body = result.ops[0];
    } catch (err) {
        ctx.throw(500, 'Internal Server Error');
    }
};

const getNewsById = async (ctx) => {
    try {
        const { id } = ctx.params;
        const news = await db.collection('news').findOne({ _id: new ObjectId(id) });
        if (!news) {
            ctx.throw(404, 'News not found');
        }
        ctx.body = news;
    } catch (err) {
        ctx.throw(500, 'Internal Server Error');
    }
};

const updateNews = async (ctx) => {
    try {
        const { id } = ctx.params;
        const { date, title, shortDescription, text } = ctx.request.body;
        const updatedNews = { date, title, shortDescription, text };
        const result = await db.collection('news').updateOne({ _id: new ObjectId(id) }, { $set: updatedNews });
        if (result.matchedCount === 0) {
            ctx.throw(404, 'News not found');
        }
        ctx.body = { message: 'News updated' };
    } catch (err) {
        ctx.throw(500, 'Internal Server Error');
    }
};

const deleteNews = async (ctx) => {
    try {
        const { id } = ctx.params;
        const result = await db.collection('news').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            ctx.throw(404, 'News not found');
        }
        ctx.body = { message: 'News deleted' };
    } catch (err) {
        ctx.throw(500, 'Internal Server Error');
    }
};

module.exports = {
    getAllNews,
    createNews,
    getNewsById,
    updateNews,
    deleteNews,
};

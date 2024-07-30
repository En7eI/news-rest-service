const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const router = require('./routes');

const app = new Koa();

// Error handling middleware
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: err.message || 'Internal Server Error' };
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err, ctx) => {
    console.error('Server error', err);
});

// Middleware
app.use(bodyParser());
app.use(json());

// Routes
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

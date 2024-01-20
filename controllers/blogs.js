const express = require('express');
const { Op, fn,col, literal } = require('sequelize');
const router = express.Router();
const Blog = require("../models/blog"); 
const User = require("../models/user");
const tokenExtractor  = require('../middleware/tokenExtractor');
router.get('/', async (req, res) => {
    const where = {}
    if (req.query.search) {
        where[Op.or] = [
            {
                title: {
                    [Op.iLike]: '%' + req.query.search + '%'
                }
            },
            {
                author: {
                    [Op.iLike]: '%' + req.query.search + '%'
                }
            }
        ]
    }
    const blogs = await Blog.findAll({
        exclude: ['userId'],
        include: {
            model: User,
            attributes: ['name']
        },
        where,
        order: [[
            'likes', 'DESC'
        ]]
    });
    res.json(blogs);
});
router.get('/authors', async (req, res) => {
    try {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [fn('COUNT', '*'), 'articles'],
            [fn('SUM', col('likes')), 'likes']
        ],
        group: ['author'],
        raw: true
    });

    res.json(authors).end();
} catch (error) {
    console.log(error);
    res.status(500).end();
}

});
router.get('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        res.status(404).json({ message: 'Blog not found' }).end();
    } else {
        res.json(blog);
    }
});
router.post('/', async (req, res) => {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
});

router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        res.status(404).json({ message: 'Blog not found' }).end();
    }
    await blog.update(req.body);
    res.json(blog);
});

// DELETE api/blogs/:id (delete a blog)
router.delete('/:id', tokenExtractor ,async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
        res.status(404).json({ message: 'Blog not found' }).end();
    }
    if (blog.userId !== req.decodedToken.id) {
        return res.status(401).json({ error: 'unauthorized' });
    }
    await blog.destroy();
    res.json({ message: 'Blog deleted' });
});

module.exports = router;

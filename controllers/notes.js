const router = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const tokenExtractor = require('../middleware/tokenExtractor')
const { Op } = require('sequelize')
router.get('/', async (req, res) => {
  const where = {}

  if (req.query.important) {
    where.important = req.query.important === "true"
  }

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }

  const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })

  res.json(notes)
})
router.post('/',tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const note = await Note.create({...req.body, userId: user.id, date: new Date()})
  res.json(note)
});

router.get('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    await note.destroy();
  }
  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ReadingList = require('../models/readinglist');
const tokenExtractor = require('../middleware/tokenExtractor');
router.post('/', async (req, res) => {
    const { bookId, userId } = req.body;
    const readingList = await ReadingList.create({ bookId, userId });
    res.json(readingList);
})
router.put("/:id",tokenExtractor, async (req, res) => {
 const readingList = await ReadingList.update({
    state: "read",

 }, {
    where: {
        id: req.params.id,
    },
 });
    res.json(readingList);
}
)
module.exports = router;
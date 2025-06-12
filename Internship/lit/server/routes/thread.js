const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');

router.post('/', async (req, res) => {
  const { title, content, category } = req.body;

  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const newThread = new Thread({
      title,
      content,
      category,
      author: req.session.userId
    });

    await newThread.save();
    res.status(201).json({ message: 'Thread created', thread: newThread });
  } catch (err) {
    res.status(500).json({ message: 'Error creating thread', error: err.message });
  }
});

module.exports = router;

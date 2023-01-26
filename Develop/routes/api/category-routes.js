const router = require('express').Router();
const { Category, Product } = require('../../models');

// default route for all categories
router.get('/', (req, res) => {
  // find all categories with product included
  Category.findAll({
    include: [Product],
  })
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  // finding the category by its id value and including its product
  Category.findByPk(req.params.id, {
    include: [Product],
  })
    .then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // creating a new category
  Category.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a specific category by user inputted id
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a specific category by user inputted id
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  });
  
  module.exports = router;

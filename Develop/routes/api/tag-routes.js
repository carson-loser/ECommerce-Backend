const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// default route for all tags
router.get('/', (req, res) => {
  // find all tags
  // includes tag product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its id and include that id's product data
  Tag.findByPk(req.params.id, {
    inclde: [
      {
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});


router.post('/', (req, res) => {
  // create new tag
  Tag.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tags name by its id value input byuser
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete a tag by its id value that user inputs
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log(err);
      res.status(404).json(err);
    })
});

module.exports = router;

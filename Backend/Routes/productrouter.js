
const { ensureAuthenticated } = require('../Middlewares/Auth');
const router=require('express').Router();
const sampleProducts = [
  { id: 1, name: "Product A", price: 100 },
  { id: 2, name: "Product B", price: 200 },
  // Add more sample products
];
router.get('/', ensureAuthenticated, (req, res) => {
  res.status(200).json(sampleProducts);
});
module.exports=router;





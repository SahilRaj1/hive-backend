const express = require('express');
const userController = require(`${__dirname}/../controllers/userController`);
const fetchUser = require(`${__dirname}/../middlewares/fetchUser`);


const router = express.Router();

router.get('/', fetchUser ,userController.getAllUsers);
router.get('/:id', fetchUser ,userController.getUser);
router.put('/:id', fetchUser ,userController.updateMe);
router.delete('/:id', fetchUser ,userController.deleteUser);



module.exports = router;
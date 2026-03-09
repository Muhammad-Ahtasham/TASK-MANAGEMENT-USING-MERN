const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../Middlewares/Auth'); // aapke existing auth middleware ka path
const taskController = require('../Controllers/TaskController'); // task controller ka path

// Sab routes ke liye authentication chahiye
// router.use(ensureAuthenticated);

// router.post('/tasks', taskController.createTask);
// router.get('/tasks', taskController.getTasks);
// router.get('/tasks/:id', taskController.getTaskById);
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);


router.use(ensureAuthenticated);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;

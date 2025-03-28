const express = require('express');
const {
    getDepartments,
    addDepartment,
    updateDepartment,
} = require('../controllers/departmentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getDepartments).post(protect, addDepartment);
router.route('/:id').put(protect, updateDepartment);

module.exports = router;

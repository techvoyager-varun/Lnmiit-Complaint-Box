const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { createComplaint, listAllComplaints, listMyComplaints, updateComplaintStatus } = require('../controllers/complaintController');

const router = Router();

router.use(requireAuth);

router.get('/me', listMyComplaints);
router.post('/', createComplaint);

router.get('/', requireRole(['warden', 'maintenance']), listAllComplaints);
router.patch('/:id', requireRole(['warden', 'maintenance']), updateComplaintStatus);

module.exports = router;



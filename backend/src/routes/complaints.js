const { Router } = require('express');
const { requireAuth, requireRole } = require('../middleware/auth');
const { createComplaint, listAllComplaints, listMyComplaints, updateComplaintStatus } = require('../controllers/complaintController');

const router = Router();

router.use(requireAuth);

router.get('/me', listMyComplaints);
router.post('/', createComplaint);

router.get('/', requireRole(['warden', 'maintenance']), listAllComplaints);
// allow any authenticated user to attempt updates; controller will enforce ownership/role
router.patch('/:id', updateComplaintStatus);

module.exports = router;



import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createComplaint, listAllComplaints, listMyComplaints, updateComplaintStatus } from '../controllers/complaintController.js';

const router = Router();

router.use(requireAuth);

// student
router.get('/me', listMyComplaints);
router.post('/', createComplaint);

// warden/maintenance
router.get('/', requireRole(['warden', 'maintenance']), listAllComplaints);
router.patch('/:id', requireRole(['warden', 'maintenance']), updateComplaintStatus);

export default router;



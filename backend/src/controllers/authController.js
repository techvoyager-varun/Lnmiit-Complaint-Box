const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { User } = require('../models/User');

const signupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['student', 'warden', 'maintenance']).optional(),
  })
  .superRefine((data, ctx) => {
    const role = data.role ?? 'student';
    if (role === 'student' || role === 'warden') {
      if (!/@lnmiit\.ac\.in$/i.test(data.email)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Students and Wardens must use lnmiit.ac.in email',
          path: ['email'],
        });
      }
    }
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

async function signup(req, res) {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }
  const { name, email, password, role } = parsed.data;
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409).json({ message: 'Email already registered' });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
    role: role ?? 'student',
    rollNumber: req.body.rollNumber,
    roomNumber: req.body.roomNumber,
    building: req.body.building,
    assignedBuilding: req.body.assignedBuilding,
    profession: req.body.profession,
  });
  const token = signToken(user.id, user.role);
  res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      building: user.building,
      assignedBuilding: user.assignedBuilding,
      rollNumber: user.rollNumber,
      roomNumber: user.roomNumber,
      profession: user.profession,
    }
  });
}

async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }
  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const token = signToken(user.id, user.role);
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      building: user.building,
      assignedBuilding: user.assignedBuilding,
      rollNumber: user.rollNumber,
      roomNumber: user.roomNumber,
      profession: user.profession,
    }
  });
}

function signToken(userId, role) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return jwt.sign({ userId, role }, secret, { expiresIn: '7d' });
}

module.exports = { signup, login };



import { Request, Response } from 'express';
import prisma from '../prisma';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface JWTPayload {
  userId: string;
  name: string;
}

const generateToken = (payload: JWTPayload): string => {
  return JWT.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '30m',
  });
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ error: 'Missing user details. All fields are required.' });
    return;
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    const token = generateToken({ userId: newUser.id, name: newUser.firstName });

    res.status(201).json({
      message: 'Registration successful',
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      token,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.error('Error creating user: Email is already used', error);
      res.status(409).json({ error: 'This email is already linked to a profile' });
    } else {
      console.error('Error creating user', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Both email and password are required' });
    return;
  }

  try {
    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken({ userId: user.id, name: user.firstName });

    res.status(200).json({
      message: 'Login successful',
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { registerUser, loginUser };
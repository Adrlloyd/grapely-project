import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface JWTPayload {
  userID: string;
  name: string;
}

// POST
const registerUser = async (req: Request, res: Response): Promise<void> => {

  try {

    const { firstName, lastName, email, password} = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({error: 'Missing user details. All fields are required.'});
      return;
    }

    const normalizedEmail = email.toLowerCase();

    // Hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: normalizedEmail,
        password: hashedPassword
      }
    })

    // Create session token for user

    const token = JWT.sign(
      { userID: newUser.id, name: newUser.firstName } as JWTPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: '30m' }
    );

    res.status(201).json({
      message: 'Registration successful',
      id: newUser.id,
      name: newUser.firstName,
      email: newUser.email,
      token,
    });

  // TO UPDATE: REVISE WITH CORRECT TYPE
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.error('Error creating user: Email is already used', error)
      res.status(409).json({error: 'This email is already linked to a profile'});
      return;
    } else {
      console.error('Error creating user', error)
      res.status(500).json({error: 'Internal server error'});
    }
  }
};

// POST
const loginUser = async (req: Request, res: Response): Promise<void> => {

  try {

    const {email, password} = req.body;

    // Check request fields
    if (!email || !password) {
      res.status(400).json({error: 'Both email and password are required'});
      return;
    }

    const normalizedEmail = email.toLowerCase();    

    // Fetch user
    const user = await prisma.user.findUnique({
      where: {email: normalizedEmail}
    })

    if(!user) {
      res.status(401).json({error: 'Invalid email or password'});
      return;
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
      res.status(401).json({error: 'Invalid email or password'});
      return;
    }

    const token = JWT.sign(
      { userID: user.id, name: user.firstName } as JWTPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: '30m' }
    );

    // Response
    res.status(200).json({
      message: 'Login successful',
      id: user.id,
      name: user.firstName,
      email: user.email,
      token,
    });

  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({error: "Internal server error"});
  }
};

export {registerUser, loginUser};
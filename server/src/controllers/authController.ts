import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// POST
const registerUser = async (req: Request, res: Response): Promise<void> => {

  try {

    const { firstName, lastName, email, password} = req.body;

    // Check required fields
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({error: 'Missing user details. All fields are required.'});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    })

    // Response without password

    const userNoPwd = {
        firstName,
        lastName,
        email
      }

    res.status(201).json(userNoPwd);

  // TO UPDATE: TS ANY
  } catch (error: any) {

    // "Unique constraint failed on the {constraint}"
    if(error.code === 'P2002'){
      console.error('Error creating user: Email is already used', error)
      res.status(409).json({error: 'This email is already linked to a profile'});

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

    // Fetch user
    const user = await prisma.user.findUnique({
      where: {email: email}
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

    // TO DO: GENERATE TOKEN

    // Response
    res.status(200).json({message: "log in successful"});


  } catch (error) {

    console.error('Login error', error);
    res.status(500).json({error: "Internal Servor error"});

  }
};

export {registerUser, loginUser};
import express, { Request, Response } from 'express'

import { getUserByEmail, createUser } from '../db/users'
import { generateSalt, generateHash } from '../helpers'

export const register = async (req: Request, res: Response) => {
 try {
  const { email, password } = req.body
  if (!email || !password) {
   return res.status(400).send('Missing fields')
  }

  const emailExists = await getUserByEmail(email)
  if (emailExists) {
   return res.status(400).send('Email already exists')
  }

  const salt = generateSalt()

  const user = await createUser({
   email,
   authentication: {
    password: generateHash(password, salt),
    salt,
   },
  })

  return res.status(201).json(user).end()
 } catch (error) {
  console.log('Something went wrong on register: ', error)
  return res.status(500).send('Internal server error')
 }
}

export const login = async (req: Request, res: Response) => {
 try {
  const { email, password } = req.body

  if (!email || !password) {
   return res.status(400).send('Missing fields')
  }

  const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
  if (!user || !user.authentication) {
   return res.status(403).send('Invalid password or email')
  }

  const hash = generateHash(password, user.authentication.salt)
  if (hash !== user.authentication.password) {
   return res.status(403).send('Invalid password or email')
  }

  const salt = generateSalt()
  user.authentication.token = generateHash(user._id.toString(), salt)

  await user.save()

  res.cookie('trt-backend-auth', user.authentication.token, {
   domain: 'localhost',
   path: '/',
   httpOnly: true,
   secure: false,
   maxAge: 1000 * 60 * 60 * 24 * 7,
  })

  return res.status(200).json(user).end()
 } catch (error) {
  console.log('Something went wrong on login: ', error)
  return res.status(500).send('Internal server error')
 }
}

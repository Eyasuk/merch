import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import Admin from '../models/Admin';
import Creator from '../models/Creator';
import User from '../models/User';

export function registerHandle(req, res) {
  const { first_name, phone, email, password } = req.body;

  if (!phone || !password || !first_name) {
  }
}

export function activeHandle(req, res) {}

export function forgotPassword(req, res) {}

export function loginHandle(req, res) {}

export function logoutHandle(req, res) {
  req.logout();
  req.flash('message', 'you are logged out');
  res.redirect('/');
}

console.log(User);

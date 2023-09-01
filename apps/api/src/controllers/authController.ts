import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { validateInputs } from '../utils/validateForm';
import Admin from '../models/Admin';
import Creator from '../models/Creator';
import User from '../models/User';

export function registerHandle(req, res) {
  const data = validateInputs(req, res);
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

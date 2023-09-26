import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export function initializePassport(passport) {
  const authUser = async (id, password, done) => {
    const user = await User.findOne({
      $or: [{ email: id }, { phone: id }],
    });
    if (user == null) {
      return done(null, false, {
        message: 'No user with this email or password',
      });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new passportLocal.Strategy({ usernameField: 'id' }, authUser));
  passport.serializeUser((user, done) =>
    done(null, { id: user.id, role: user.role })
  );
  passport.deserializeUser(async (u, done) => {
    const user = await User.findById(u.id);
    return done(null, user);
  });
}

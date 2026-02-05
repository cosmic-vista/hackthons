import passport from 'passport';
import { signToken } from '../utils/token.js';

export const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email']
});

export const googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', { session: false }, async (err, user) => {
        if (err) return next(err);
        if (!user) return res.redirect('/auth/google');

        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token,
            data: { user }
        });
    })(req, res, next);
};

export const getMe = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { user: req.user }
    });
};

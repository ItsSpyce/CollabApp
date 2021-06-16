import { passportAuth } from 'blitz';
import { Profile, Strategy as TwitterStrategy } from 'passport-twitter';
import db from 'db';

async function verifyAuth(
  token: string,
  tokenSecret: string,
  profile: Profile,
  done: (err?: Error, user?: any) => void
) {
  const email = profile.emails && profile.emails[0]?.value;
  const photo = profile.photos && profile.photos[0]?.value;
  const { username: name, id } = profile;

  if (!email) {
    return done(new Error('Twitter account does not have a valid email'));
  }

  const user = await db.user.upsert({
    where: { id },
    create: {
      email,
      name,
      id,
      photo,
    },
    update: {
      email,
      name,
      photo,
    },
  });

  const publicData = {
    userId: user.id,
    roles: [user.role],
    source: 'twitter',
  };
  done(undefined, { publicData });
}

export default passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  strategies: [
    {
      strategy: new TwitterStrategy(
        {
          consumerKey: process.env.TWITTER_API_KEY as string,
          consumerSecret: process.env.TWITTER_API_SECRET_KEY as string,
          callbackURL: `${process.env.HOSTNAME}api/auth/twitter/callback`,
          includeEmail: true,
        },
        verifyAuth
      ),
    },
  ],
});

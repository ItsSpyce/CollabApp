import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetUser = z.object({
  id: z.string().nonempty(),
});

export default resolver.pipe(
  resolver.zod(GetUser),
  async ({ id }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        photo: true,
        timezoneOffset: true,
      }
    });
    return user;
  }
)

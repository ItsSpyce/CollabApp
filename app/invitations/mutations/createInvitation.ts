import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const CreateInvitation = z.object({
  bookingId: z.number(),
  toId: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateInvitation),
  resolver.authorize(),
  async (input) => {
    const invitation = await db.invitation.create({ data: input });
    // send notifications for each
  }
);

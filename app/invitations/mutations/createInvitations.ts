import { resolver } from 'blitz';
import db, { NotificationSource } from 'db';
import * as z from 'zod';

const CreateInvitation = z.array(
  z.object({
    bookingId: z.number(),
    toId: z.string(),
  })
);

export default resolver.pipe(
  resolver.zod(CreateInvitation),
  resolver.authorize(),
  async (data, ctx) => {
    const creator = await ctx.session.$getPrivateData();
    const invitations = await db.invitation.createMany({ data });
    const notifications = data.map((invitation) => ({
      source: NotificationSource.INVITATION,
      userId: ctx.session.userId,
      content: `You've been invited to a group by ${creator.name}`,
      toId: invitation.toId,
      bookingId: invitation.bookingId,
    }));
    await db.invitation.createMany({ data: notifications });
    return invitations;
  }
);

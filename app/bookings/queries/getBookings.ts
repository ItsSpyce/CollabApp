import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';
import { DateTime } from 'luxon';

const GetBooking = z.object({
  userId: z.string().nonempty(),
  month: z.number().min(1).max(12),
  year: z.number().min(2020),
});

export default resolver.pipe(
  resolver.zod(GetBooking),
  resolver.authorize(),
  async (data, ctx) => {
    const privateData = await ctx.session.$getPrivateData();
    const timezone = `UTC${privateData.timezoneOffset}`;
    const localTime = DateTime.utc(data.year, data.month).setZone(timezone);
    const startOfThisMonth = localTime.startOf('month').toJSDate();
    const endOfThisMonth = localTime.endOf('month').toJSDate();
    const bookings = await db.booking.findMany({
      where: {
        creatorId: data.userId,
      }
    });
    return bookings;
  }
)

import { resolver } from 'blitz';
import { v4 } from 'uuid';
import db from 'db';
import { z } from 'zod';

const CreateBooking = z.object({
  name: z.string().min(1),
  description: z.string(),
  color: z.string().length(6),
  startsAt: z.date(),
  endsAt: z.date(),
});

export default resolver.pipe(
  resolver.zod(CreateBooking),
  resolver.authorize(),
  async (data, ctx) => {
    if (data.endsAt.valueOf() < data.startsAt.valueOf()) {
      throw new Error('End date must occur after start date');
    }
    if (data.startsAt.valueOf() < Date.now()) {
      throw new Error('Start date must occur in the future');
    }
  }
);

import { resolver } from 'blitz';
import db from 'db';

export default resolver.pipe(
  resolver.authorize(),
  async (_, ctx) => {
    const id = ctx.session.id;
    const bookings = db.booking.findMany({
      where: {
        
      }
    })
  }
)
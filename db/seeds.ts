// import db from "./index"

import db from 'db';
import { DateTime } from 'luxon';

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
  const myUserId = '1324403685229809665';
  const now = DateTime.utc();
  for (let i = 0; i < 50; ++i) {
    await db.booking.create({
      data: {
        id: i.toString(),
        name: `Seeded ${i}`,
        description: `Seeded ${i}`,
        color: '333333',
        creatorId: myUserId,
        startsAt: now.plus({ days: i }).toJSDate(),
        endsAt: now.plus({ days: i, hours: now.hour + 2 }).toJSDate(),
      },
    });
  }
};

export default seed;

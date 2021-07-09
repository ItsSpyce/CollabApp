import { useState } from 'react';
import Card from 'app/core/components/Card';
import { Calendar, ResponsiveContext } from 'grommet';
import { useQuery } from 'blitz';
import getBookings from 'app/bookings/queries/getBookings';
import getUser from 'app/users/queries/getUser';
import { BookingsForThisMonth } from './styles';
import { DateTime } from 'luxon';

type BookingsViewProps = {
  user: string;
  date?: { month: number; year: number };
};

const BookingsView = (props: BookingsViewProps) => {
  const date = DateTime.utc(props.date?.year, props.date?.month);
  const [selectedDate, setSelectedDate] = useState([date.toISODate()]);
  const [user] = useQuery(getUser, { id: props.user });
  const [bookings] = useQuery(getBookings, {
    userId: props.user,
    year: date.year,
    month: date.month,
  });

  return (
    <Card title={user?.name}>
      <ResponsiveContext.Consumer>
        {(size) => (
          <>
            <BookingsForThisMonth></BookingsForThisMonth>
            <Calendar
              size={size === 'small' ? size : 'medium'}
              date={selectedDate}
              onSelect={(date) => {
                if (Array.isArray(date)) {
                  setSelectedDate(date as string[]);
                } else {
                  setSelectedDate([date]);
                }
              }}
            />
          </>
        )}
      </ResponsiveContext.Consumer>
    </Card>
  );
};

export default BookingsView;

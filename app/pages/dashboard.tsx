import Layout from 'app/core/layouts/Layout';
import { BlitzPage } from 'blitz';
import BookingsView from 'app/bookings/components/BookingsView';
import { useCurrentUser } from 'app/core/hooks';

const Dashboard: BlitzPage = (props) => {
  const [user] = useCurrentUser();

  return (
    <>
      <BookingsView user={user!.id} />
    </>
  )
};

Dashboard.getLayout = (page) => {
  return <Layout title="Dashboard">{page}</Layout>;
};

Dashboard.authenticate = {
  redirectTo: '/'
}

export default Dashboard;

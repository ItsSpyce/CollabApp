import Layout from 'app/core/layouts/Layout';
import { BlitzPage } from 'blitz';

const Dashboard: BlitzPage = (props) => {
  return <h1>Dashboard</h1>;
};

Dashboard.getLayout = (page) => {
  return <Layout title="Dashboard">{page}</Layout>;
};

export default Dashboard;

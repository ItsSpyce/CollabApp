import Layout from 'app/core/layouts/Layout';
import { BlitzPage, useRouter, Link } from 'blitz';
import { useCurrentUser } from 'app/core/hooks';

const Home: BlitzPage = () => {
  const [user] = useCurrentUser();
  const router = useRouter();
  if (user) {
    router.push('/dashboard');
    return <></>;
  }
  return (
    <div>
      <Link href="/login">Login</Link>
    </div>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;

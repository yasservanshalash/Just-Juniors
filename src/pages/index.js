// next
import Head from 'next/head';
// layouts
import MainLayout from 'src/layouts/main';
// sections
import CareerLandingView from 'src/pages/career/landing'
// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      <CareerLandingView />
    </>
  );
}

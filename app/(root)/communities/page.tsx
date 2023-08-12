import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import Searchbar from '@/components/shared/Searchbar';

import { fetchUser } from '@/lib/actions/user.actions';

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text">Communities</h1>

      <div className="mt-5">
        <Searchbar routeType="communities" />
      </div>

      <section className="mt-9 flex flex-wrap gap-4"></section>
    </>
  );
};

export default Page;

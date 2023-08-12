import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import Searchbar from '@/components/shared/Searchbar';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchCommunities } from '@/lib/actions/community.actions';

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await fetchCommunities({});

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

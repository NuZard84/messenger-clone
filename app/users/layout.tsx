import getUsers from "../actions/getUsera";

import Sidebar from "../components/sidebar/Sidebar";
import UsersList from "./components/UsersList";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    //@ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UsersList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}

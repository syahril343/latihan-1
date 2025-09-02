import MainLayout from "../layouts/MainLayout"; // Layout

const Users = () => {
  return (
    <>
      <MainLayout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Users page</h1>
          <p className="text-gray-700">
            Ini adalah contoh layout dengan Sidebar, Header, dan Main Content
            terpisah.
          </p>
        </div>
      </MainLayout>
    </>
  );
};

export default Users;

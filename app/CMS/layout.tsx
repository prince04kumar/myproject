import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]"; // Import NextAuth config
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/Login"); // Redirect to GitHub login
  }

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4">Dashboard Sidebar</aside>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

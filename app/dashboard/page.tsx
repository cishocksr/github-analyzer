import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/dashboard-content";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-gray-900">
                GitHub Profile Analyzer
              </h1>
              <Link
                href="/year-in-review"
                className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
              >
                🎉 Year in Review
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-700">
                  {session.user?.name}
                </span>
              </div>
              <SignOut />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {session.accessToken && (
          <DashboardContent accessToken={session.accessToken} />
        )}
      </main>
    </div>
  );
}

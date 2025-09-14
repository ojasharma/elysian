// app/test/page.tsx

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Correct path to your authOptions
import { SignInButton, SignOutButton } from "./AuthButtons"; // We'll create this component next

export default async function TestPage() {
  // Use getServerSession with your authOptions
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          User Session Information (NextAuth v4)
        </h1>

        {session?.user ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Welcome, {session.user.name || "User"}!
            </h2>
            <p className="mt-2 text-gray-600">You are signed in.</p>

            <div className="mt-4 p-4 text-sm text-left bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">Full Session Object:</h3>
              <pre className="overflow-x-auto whitespace-pre-wrap">
                <code>{JSON.stringify(session, null, 2)}</code>
              </pre>
            </div>

            <div className="mt-6 flex justify-center">
              <SignOutButton />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">You are not signed in.</p>
            <div className="mt-6">
              <SignInButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
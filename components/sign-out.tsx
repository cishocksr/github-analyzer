import { signOutAction } from "@/lib/actions";

export function SignOut() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </form>
  );
}

import { redirect } from "next/navigation";
import YearInReview from "@/components/year-in-review";
import { auth } from "@/lib/auth";

export default async function YearInReviewPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (!session.accessToken) {
    redirect("/");
  }

  return <YearInReview accessToken={session.accessToken} />;
}

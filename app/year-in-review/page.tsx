import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import  YearInReview  from "@/components/year-in-review"

export default async function YearInReviewPage() {
    const session = await auth()

    if (!session) {
        redirect("/")
    }

    return <YearInReview accessToken={session.accessToken!} />
}
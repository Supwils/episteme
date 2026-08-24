import { redirect } from "next/navigation";
import { pickRandomArticleUrl } from "@/lib/random-article";

export const dynamic = "force-dynamic";

/** Shape-of-World style "随机来一个" — server redirect into a random article. */
export default function RandomArticlePage() {
  redirect(pickRandomArticleUrl());
}

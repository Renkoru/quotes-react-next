import CreateQuote from "./CreateQuote";
import QuotesList from "@components/QuotesList";
import { getSession } from "@lib/utils";

export default async function UserProfile({ params }) {
  const session = getSession();
  const userId = params.id;

  return (
    <>
      {!!session && String(session.user.id) === userId && (
        <CreateQuote userId={userId} />
      )}
      <QuotesList addedBy={userId} />
    </>
  );
}

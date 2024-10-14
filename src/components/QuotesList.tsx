import { Button } from "@mui/material";
import Quote from "./Quote";

export default async function QuotesList() {
  const quotes = await fetch(`http://localhost:1337/api/quotes`, { cache: 'no-store' })
    .then((response) => response.json())
    .then((data) => data.data);

  console.log(quotes)

  return (
    <>
      {quotes.map((quote) => (
        <Quote key={quote.documentId} data={quote}></Quote>
      ))}

      <Button variant="contained">Hello world changes</Button>
    </>
  );

}

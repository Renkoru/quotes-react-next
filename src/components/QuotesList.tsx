import qs from "qs";
import { Button, Stack } from "@mui/material";
import Quote from "./Quote";

export default async function QuotesList({ addedBy }: { addedBy?: number }) {
  const queryParams: any = {
    populate: {
      addedBy: {
        fields: ["username"],
      },
      author: {
        fields: ["name"],
      },
    },
  };

  if (addedBy) {
    queryParams.filters = {
      addedBy: {
        $eq: addedBy,
      },
    };
  }

  let url = `${process.env.BACKEND_URL}/api/quotes?${qs.stringify(queryParams, { encode: false })}`;

  const quotes = await fetch(url, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((data) => data.data);

  // console.log("QuotesList", quotes);

  return (
    <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
      {quotes.map((quote) => (
        <Quote key={quote.documentId} data={quote}></Quote>
      ))}
    </Stack>
  );
}

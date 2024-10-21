import Quote from "@components/Quote";
import qs from "qs";

export async function generateMetadata({ params }) {
  // const data = await fetch(`http://localhost:1337/api/quotes/${quoteId}`, { cache: 'no-store' })
  //   .then((response) => response.json());

  return { title: "Quote" };
}

export default async function QuotePage({ params }) {
  const quoteId = params.quoteId;

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

  let url = `${process.env.STRAPI_BACKEND_URL}/api/quotes/${quoteId}?${qs.stringify(queryParams, { encode: false })}`;

  const data = await fetch(url, { cache: "no-store" })
    .then((response) => response.json())
    .then((data) => data.data);

  return <Quote data={data} />;
}

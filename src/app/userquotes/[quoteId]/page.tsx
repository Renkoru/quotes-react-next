export async function generateMetadata({params}) {
  
  // const data = await fetch(`http://localhost:1337/api/quotes/${quoteId}`, { cache: 'no-store' })
  //   .then((response) => response.json());

  return { title: "Quote"};
}

export default async function Quote({params}) {
  const quoteId = params.quoteId;

  // console.log(params);
  // console.log(quoteId);

  const data = await fetch(`http://localhost:1337/api/quotes/${quoteId}`, { cache: 'no-store' })
    .then((response) => response.json());

  console.log(data);


  return <p>Quote: {JSON.stringify(data)}</p>;
}

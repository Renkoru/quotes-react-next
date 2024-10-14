import { Button, Card, CardActions, CardContent } from "@mui/material";
import Link from "next/link";

export default async function Quote({ data: {content, documentId} }) {
  return (
    <Card variant="outlined">
      <CardContent>
        {content}
      </CardContent>

      <CardActions>
        <Button size="small" component={Link} href={`/userquotes/${documentId}`}>View</Button>
      </CardActions>
    </Card>
  );

}
    //   <Typography variant="h5" component="div">
    //     be{bull}nev{bull}o{bull}lent
    //   </Typography>
    //   <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
    //   <Typography variant="body2">
    //     well meaning and kindly.
    //     <br />
    //     {'"a benevolent smile"'}
    //   </Typography>
    // </CardContent>

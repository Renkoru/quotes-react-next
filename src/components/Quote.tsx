import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default async function Quote({
  data: { content, documentId, addedBy, author },
}) {
  return (
    <Card
      variant="outlined"
      sx={{ width: "400px", display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flexGrow: 1, pt: 4, px: 4 }}>
        <Typography sx={{ lineHeight: 1.8 }}>{content}</Typography>
        {author && (
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              fontSize: 14,
              mt: 1,
              textAlign: "end",
            }}
          >
            {author.name}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ px: 3, borderTop: "1px solid #efefef" }}>
        {addedBy?.username && (
          <Typography
            gutterBottom
            sx={{
              color: "text.secondary",
              fontSize: 14,
            }}
          >
            <Link href={`/users/${addedBy.id}`}>{addedBy.username}</Link>
          </Typography>
        )}
        <Button size="small" component={Link} href={`/quotes/${documentId}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

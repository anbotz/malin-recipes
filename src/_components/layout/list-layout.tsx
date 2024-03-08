import { Divider, List, ListItem, Typography } from "@mui/material";

export const ListLayout = ({
  items,
  title,
  noContent,
}: {
  items: any[];
  title: string;
  noContent: string;
}) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <List dense>
        {items.length > 0 ? (
          items.map((item) => <ListItem key={item}>{item}</ListItem>)
        ) : (
          <>{noContent}</>
        )}
      </List>
      <Divider />
    </>
  );
};

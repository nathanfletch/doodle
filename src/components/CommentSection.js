import React from "react";
import Comment from "./Comment";
import {
  List,
  Paper,
  TextField,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItem,
} from "@mui/material";
// import { sampleComments } from "../sample-comments";

export default function Comments({ comments = [] }) {
  // const [comments, setComments] = useState(sampleComments = [])

  const listJsx = comments.map((comment) => (
    <Comment key={comment.time} comment={comment} />
  ));
  return (
    <List>
      {listJsx}

      <Paper sx={{ margin: "10px" }}>
        <ListItem alignItems="center">
          <ListItemAvatar>
            <Avatar>M</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <TextField
                label="Leave a comment:"
                fullWidth
                // variant="standard"
              />
            }
          />
          <ListItemButton
            variant="outlined"
            sx={{
              padding: "auto",
              margin: "10px",
              maxWidth: "80px",
              width: "auto",
            }}
          >
            Submit
          </ListItemButton>
        </ListItem>
      </Paper>
    </List>
  );
}

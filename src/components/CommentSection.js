import React, { useState } from "react";
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

/*

*/

export default function Comments({ handleCommentSubmit, handleCommentDelete, comments = [] }) {
  const [commentInput, setCommentInput] = useState("");

  const listJsx = comments.map((comment) => (
    <Comment key={comment.time} handleCommentDelete={handleCommentDelete} comment={comment} />
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(commentInput);
                }}
              >
                <TextField
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  label="Leave a comment:"
                  fullWidth
                />
              </form>
            }
          />
          <ListItemButton
            onClick={() => handleCommentSubmit(commentInput)}
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

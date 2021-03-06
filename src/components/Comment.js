import React, { useEffect, useState } from "react"; //
import { timeDifference } from "../utilities";
// import { styled } from '@mui/system';
import {
  ListItem,
  Paper,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Typography,
} from "@mui/material";

const Comment = ({ comment, handleCommentDelete, doodleUid, user }) => {
  const [displayTime, setDisplayTime] = useState(timeDifference(comment.time));

  useEffect(() => {
    const timeUpdateInterval = setInterval(() => {
      setDisplayTime(timeDifference(comment.time));
    }, 5000);

    return () => {
      clearInterval(timeUpdateInterval);
    };
  }, [comment.time]);

  return (
    <React.Fragment key={comment.time}>
      <Paper key={comment.time} sx={{ margin: "10px" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={comment.username}>
              {comment.username[0].toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography>{`${comment.username}  ${displayTime}`}</Typography>
            }
            secondary={
              <Typography component="span" variant="body2" color="textPrimary">
                {comment.body}
              </Typography>
            }
          />
          {user.uid === comment.uid || user.uid === doodleUid ? <ListItemButton
            onClick={() => handleCommentDelete(comment.time)}
            variant="outlined"
            sx={{
              padding: "auto",
              margin: "10px",
              maxWidth: "80px",
              width: "auto",
            }}
            align-items="center"
          >
            Delete
          </ListItemButton> : null}
        </ListItem>
      </Paper>
    </React.Fragment>
  );
};

export default Comment;

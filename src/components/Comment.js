import React from "react";
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

// const useStyles = styled(theme => ({
//   root: {
//     width: "100%",
//     backgroundColor: theme.palette.background.paper
//   },
//   fonts: {
//     fontWeight: "bold"
//   },
//   inline: {
//     display: "inline"
//   }
// }));

const Comment = ({ comment }) => {
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
              <Typography>{`${comment.username} - ${comment.time}`}</Typography>
            }
            secondary={
              <Typography component="span" variant="body2" color="textPrimary">
                {comment.body}
              </Typography>
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
            align-items="center"
          >
            Report
          </ListItemButton>
        </ListItem>
      </Paper>
    </React.Fragment>
  );
};

export default Comment;

import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function DoodleList({ fakeDb }) {
  const cols = Math.floor((window.innerWidth - 100) / 248);
  console.log(cols);
  return (
    <Box
      sx={{
        width: window.innerWidth - 100,
        // overflowY: "scroll",
        margin: "auto",
      }}
    >
      <ImageList variant="masonry" cols={3} gap={1}>
        {fakeDb.map((item) => {
          console.log(item.dataUrl);
          return (
            <ImageListItem key={item.time}>
              <img
                src={item.dataUrl}
                // srcSet={`${item.dataUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              {/* <ImageListItemBar position="above" title={item.username} /> */}
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}

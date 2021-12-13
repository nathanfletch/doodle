import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
// import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function DoodleList({ doodles, handleSelect }) {

  return (
    <Box
      sx={{
        width: window.innerWidth - 100,
        margin: "auto",
      }}
    >
      <ImageList variant="masonry" cols={3} gap={1}>
        {doodles.map((item) => {
          console.log(item.dataUrl);
          return (
            <ImageListItem key={item.time}>
              <img
                onClick={() => {
                  handleSelect(item);
                }}
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

import Picker from "emoji-picker-react";
import React, { useState } from "react";
import { Chip } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";

export default function EmojiBar({ user }) {
  const [chosenEmojis, setChosenEmojis] = useState([]);
  const [pickerVisible, setPickerVisible] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    let chosenEmojisCopy = [...chosenEmojis];
    const emojiWithCounter = { ...emojiObject, counter: 1, uid: user.uid };

    const prevUserEmojiIndex = chosenEmojis.findIndex(
      (emoji) => emoji.uid === user.uid
    );
    //remove if present
    if (prevUserEmojiIndex >= 0) {
      // remove: if counter is one, splice from copy. if counter is > 1, dec counter
      if (chosenEmojis[prevUserEmojiIndex].counter === 1) {
        chosenEmojisCopy.splice(prevUserEmojiIndex, 1);
      } else {
        const decrementedEmoji = {
          ...chosenEmojisCopy[prevUserEmojiIndex],
          counter: chosenEmojisCopy[prevUserEmojiIndex].counter - 1,
        };
        chosenEmojisCopy[prevUserEmojiIndex] = decrementedEmoji;
      }
      //set and return before adding if clicked prev emoji (just remove)
      if (chosenEmojis[prevUserEmojiIndex].unified === emojiObject.unified) {
        chosenEmojisCopy = chosenEmojisCopy.sort((a, b) => {
          return b.counter - a.counter;
        });
        setChosenEmojis(chosenEmojisCopy);
        return;
      }
    }

    // add
    //test if present in emoji list:
    if (
      !chosenEmojisCopy.some((emoji) => emoji.unified === emojiObject.unified)
    ) {
      chosenEmojisCopy = [...chosenEmojisCopy, emojiWithCounter];
    } else {
      const index = chosenEmojis.findIndex(
        (emoji) => emoji.unified === emojiObject.unified
      );
      const incrementedEmoji = {
        ...chosenEmojisCopy[index],
        counter: chosenEmojisCopy[index].counter + 1,
      };
      chosenEmojisCopy[index] = incrementedEmoji;
    }
    //sort
    chosenEmojisCopy = chosenEmojisCopy.sort((a, b) => {
      return b.counter - a.counter;
    });
    setChosenEmojis(chosenEmojisCopy);
    console.log(chosenEmojis);
  };

  return (
    <div>
      {pickerVisible ? (
        <Picker
          pickerStyle={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: "99",
          }}
          disableSkinTonePicker={true}
          native={true}
          onEmojiClick={onEmojiClick}
        />
      ) : null}
      <div
        style={{
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {chosenEmojis.length
          ? chosenEmojis.map((emoji) => {
              return (
                <Chip
                  sx={{ fontSize: "large" }}
                  size="medium"
                  key={emoji.unified}
                  color={emoji.uid === user.uid ? "primary" : "default"}
                  label={`${emoji.emoji}${
                    emoji.counter > 1 ? ` ${emoji.counter}` : ""
                  }`}
                />
              );
            })
          : null}

        <Chip
          label={
            <AddReactionIcon
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
              onClick={() => setPickerVisible(!pickerVisible)}
            />
          }
        />
      </div>
    </div>
  );
}
//
// npm install @mui/icons-material

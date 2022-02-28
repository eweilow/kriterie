import React from "react";
import { IconGenerationComponent } from "@eweilow/ikon-cli";
import { useFileAsDataURL } from "@eweilow/ikon";

const Component: IconGenerationComponent = (props) => {
  let imgSrc!: string;
  if (props.type === "favicon") {
    imgSrc = useFileAsDataURL("./favicon.svg");
    if (props.width < 48) {
      imgSrc = useFileAsDataURL("./smallFavicon.svg");
    }
  } else if (props.type === "splash") {
    imgSrc = useFileAsDataURL("./large.svg");
  } else {
    if (props.width > 128) {
      imgSrc = useFileAsDataURL("./large.svg");
    } else if (props.width > 100) {
      imgSrc = useFileAsDataURL("./medium.svg");
    } else {
      imgSrc = useFileAsDataURL("./favicon.svg");
    }
  }

  return (
    <div
      style={{
        background: "#FFF4F0",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{
          maxWidth: 200 * props.pixelRatio,
          width: "100%",
          height: "100%",
        }}
        src={imgSrc}
      />
    </div>
  );
};

export default Component;

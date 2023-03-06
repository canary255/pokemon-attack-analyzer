import { createRef, useState } from "react";

const content = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1506501139174-099022df5260?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    type: "video",
    url: "https://www.youtube.com/embed/LRTOUqLmuAU",
  },
];

export const Carousel = () => {
  // We will start by storing the index of the current image in the state.
  const [currentContent, setCurrentContent] = useState(0);

  const refs = content.reduce((acc: any, val, i: number) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i: any) => {
    // First let's set the index of the image we want to see next
    setCurrentContent(i);
    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do eaxactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: "smooth",
      //      Defines vertical alignment.
      block: "nearest",
      //      Defines horizontal alignment.
      inline: "start",
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalImages = content.length;

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const nextImage = () => {
    if (currentContent >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentContent + 1);
    }
  };

  const previousImage = () => {
    if (currentContent === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentContent - 1);
    }
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle =
    "absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const SliderControl = ({ isLeft }: { isLeft?: boolean }) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? "◀" : "▶"}
      </span>
    </button>
  );

  return (
    // Images are placed using inline flex. We then wrap an image in a div
    // with flex-shrink-0 to stop it from 'shrinking' to fit the outer div.
    // Finally the image itself will be 100% of a parent div. Outer div is
    // set with position relative, so we can place our cotrol buttons using
    // absolute positioning on each side of the image.
    <div className="relative">
      <SliderControl isLeft />
      {content.map((content, i) => (
        <>
          {i === currentContent && (
            <div className="w-full flex-shrink-0" key={i} ref={refs[i]}>
              {content.type === "image" && (
                <img
                  src={content.url}
                  className="w-full h-full object-contain"
                />
              )}
              {content.type === "video" && (
                <iframe
                  width="100%"
                  height="341"
                  src={content.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          )}
        </>
      ))}
      <SliderControl />
    </div>
  );
};

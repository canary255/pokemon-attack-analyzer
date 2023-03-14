import { Transition } from "@headlessui/react";
import { createRef, Fragment, useState } from "react";
import { Text } from "../../atom/Text/Text";

const content = [
  {
    title: "First image",
    type: "image",
    url: "https://images.unsplash.com/photo-1506501139174-099022df5260?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  },
  {
    title: "",
    type: "image",
    url: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Third image",
    type: "image",
    url: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    title: "Fourth video",
    type: "video",
    url: "https://www.youtube.com/embed/LRTOUqLmuAU",
  },
];

export const Carousel = () => {
  // We will start by storing the index of the current image in the state.
  const [currentContent, setCurrentContent] = useState(0);
  let [isShowing, setIsShowing] = useState(true);

  const refs = content.reduce((acc: any, val, i: number) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i: any) => {
    setCurrentContent(i);
  };

  const totalImages = content.length;

  const nextImage = () => {
    setIsShowing(false);
    setTimeout(() => {
      setIsShowing(true);
    }, 400);
    if (currentContent >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentContent + 1);
    }
  };

  const previousImage = () => {
    setIsShowing(false);
    setTimeout(() => {
      setIsShowing(true);
    }, 400);
    if (currentContent === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentContent - 1);
    }
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle =
    "absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  const SliderControl = ({ isLeft }: { isLeft?: boolean }) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span
        role="img"
        aria-label={`Arrow ${isLeft ? "left" : "right"}`}
        className={`material-symbols-outlined ${isLeft ? "ml-2" : ""}`}
      >
        {isLeft ? "arrow_back_ios" : "arrow_forward_ios"}
      </span>
    </button>
  );

  return (
    <div className="relative p-2 h-[345px] mb-3 flex flex-row justify-center items-center">
      <SliderControl isLeft />
      <Transition
        show={isShowing}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-50"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        {content.map((content, i) => (
          <Fragment key={i}>
            {i === currentContent && (
              <>
                <div className="w-full flex-shrink-0" ref={refs[i]}>
                  {content.type === "image" && (
                    <img
                      src={content.url}
                      className="xl:w-full h-[341px] object-contain"
                    />
                  )}
                  {content.type === "video" && (
                    <iframe
                      src={content.url}
                      className="xl:w-[480px] sm:w-[640px] h-[341px] object-contain"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
                {content.title && content.title !== "" && (
                  <Text className="text-center text-xl">{content.title}</Text>
                )}
              </>
            )}
          </Fragment>
        ))}
      </Transition>
      <SliderControl />
    </div>
  );
};

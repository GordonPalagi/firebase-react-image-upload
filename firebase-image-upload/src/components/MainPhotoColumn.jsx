import React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { CardText, Image } from "react-bootstrap";
import { FaArchive } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MdDelete } from "react-icons/md";



function MainPhotoColumn({
  data,
  deleteFile,
  setArchiveToPublish,
  // array used only for testing purposes
  // archiveArr,
  setPotwToPublish
  // array used only for testing purposes
  // potwArr
}) {
  const buttonClass = "bg-slate-500 rounded-lg py-1 my-1 uppercase";
  const [smallScreen, setSmallScreen] = useState(false);
  const [mediumScreen, setMediumScreen] = useState(false);
  const [largeScreen, setLargeScreen] = useState(false);

  // changes color of shadow to indicate picture is in POTW or Archive
  const [potwPicSelected, setPotwPicSelected] = useState(false);
  const [archivePicSelected, setArchivePicSelected] = useState(false);

  const greenShadow = "shadow-bright-green mx-auto main-image cursor-pointer rounded-lg";
  const unchosenShadow = "mx-auto main-image cursor-pointer rounded-lg";
  const redShadow = "shadow-bright-red mx-auto main-image cursor-pointer rounded-lg";


  const handleArchiveToggle = (id, url) => {
    setArchiveToPublish(prev => {
      const isArchived = prev.includes(url);
      if (isArchived) {
        return prev.filter(itemUrl => itemUrl !== url);
      } else {
        return [...prev, {url, id}];
      }
    });
  }

  const handlePotwToggle = (id, url) => {
    setPotwToPublish(prev => {
      const isPotw = prev.includes(url);
      if (isPotw) {
        return prev.filter(itemUrl => itemUrl !== url);
      } else {
        return [...prev, {url, id}];
      }
    });
  }

  const handleArchiveOnClick = () => {
    setArchivePicSelected(prev => !prev);
  }

  const handlePotwOnClick = () => {
    setPotwPicSelected(prev => !prev);
  }

  const PhotoCard = () => {
    const imageClass = potwPicSelected ? greenShadow : (archivePicSelected ? redShadow : unchosenShadow);
    return (
      <div className="w-full p-4 my-3">
        <div className="relative">
          <Image
            fluid
            className={imageClass}
            src={data.url}
            alt={data.title}
          />

          <div className="flex justify-evenly m-3 p-2">
            <div className="group rounded-full p-2.5 bg-black border cursor-pointer">
              <FaArchive
                onClick={() => {
                  handleArchiveToggle(data.dateCreated, data.url),
                  handleArchiveOnClick()
                }}
                className="h-5 w-5"
              />

              <span className="absolute bottom-full mb-2 w-auto p-2 bg-black text-white text-xs rounded-lg hidden group-hover:block">
                Archive
              </span>
            </div>

            <div className="group rounded-full p-2.5 bg-black border cursor-pointer">
              <MdFavorite
                className="h-5 w-5"
                onClick={() => {
                  handlePotwToggle(data.dateCreated, data.url),
                  handlePotwOnClick()
                }}
              />
              <span className="absolute bottom-full mb-2 w-auto p-2 bg-black text-white text-xs rounded-lg hidden group-hover:block">
                Favorite
              </span>
            </div>

            <div className="group rounded-full p-2.5 bg-black border cursor-pointer">
              <MdDelete onClick={deleteFile} className="h-5 w-5" />
              <span className="absolute bottom-full mb-2 w-auto p-2 bg-black text-white text-xs rounded-lg hidden group-hover:block">
                Delete
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl text-left py-2">
          {data.title} by {data.name}
        </h1>
        <CardText className="text-left">{data.description}</CardText>
      </div>
    );};

  const mediumScreenCard = (
    <div className="w-full flex p-3">
      <Image
        fluid
        className="mx-auto main-image cursor-pointer w-1/2 object-contain"
        src={data.url}
        alt={data.title}
      />

      <div className="p-5 w-1/2 h-100">
        <h1 className="text-4xl text-left">
          {data.title} by {data.name}
        </h1>
        <CardText className="text-left">{data.description}</CardText>

        <div className={smallScreen ? "hidden" : "flex flex-col"}>
          <button
            className={buttonClass}
            onClick={handleArchiveToggle}
          >
            add picture to POTW
          </button>
          <button
            className={buttonClass}
            onClick={handlePotwToggle}
          >
            Archive Picture
          </button>
          <button className={buttonClass} onClick={() => deleteFile(data.url)}>
            Delete Picture
          </button>
        </div>
      </div>
    </div>
  );

  const largeScreenCard = (
    <div className="w-full flex p-3">
      <Image
        fluid
        className="mx-auto main-image cursor-pointer w-2/3"
        src={data.url}
        alt={data.title}
      />

      <div className="p-5 w-1/3">
        <h1 className="text-4xl text-left">
          {data.title} by {data.name}
        </h1>
        <CardText className="text-left">{data.description}</CardText>

        <div className={smallScreen ? "hidden" : "flex flex-col"}>
          <button
            className={buttonClass}
            onClick={handleArchiveToggle}
          >
            add picture to POTW
          </button>
          <button
            className={buttonClass}
            onClick={handlePotwToggle}
          >
            Archive Picture
          </button>
          <button className={buttonClass} onClick={() => deleteFile(data.url)}>
            Delete Picture
          </button>
        </div>
      </div>
    </div>
  );


  const updateScreenSize = () => {
    const width = window.innerWidth;
    setSmallScreen(width <= 800);
    setMediumScreen(width > 800 && width < 1024);
    setLargeScreen(width >= 1024);
  };

  useEffect(() => {
    updateScreenSize(); // Call on mount for initial check
    window.addEventListener("resize", updateScreenSize); // Add resize listener

    return () => {
      window.removeEventListener("resize", updateScreenSize); // Clean up
    };
  }, []);


  const GetScreenSize = () => {
    if (smallScreen) {
      return <PhotoCard/>
    }

    if (mediumScreen) {
      return mediumScreenCard;
    }

    if (largeScreen) {
      return largeScreenCard;
    }

    return <PhotoCard/>
  };

  return (
    <div className="w-full">
      <GetScreenSize/>
    </div>
  );
}

export default MainPhotoColumn;

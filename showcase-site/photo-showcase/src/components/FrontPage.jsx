import React from "react";
import FinalPOTW from "./FinalPOTW";
import buildingfortherich from "/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/buildingfortherich.jpeg";
import distopianfactory from "/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/distopianfactory.jpg";
import stupidbuilding from "/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/stupidbuilding1.jpg";
import unrealisticbuilding from "/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/unrealisticbuilding1.jpg";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function FrontPage({ potw }) {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "start end"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const photoArray = [
    buildingfortherich,
    distopianfactory,
    stupidbuilding,
    unrealisticbuilding,
  ];

  return (
    <>
      <div className="potw-con">
        <motion.div ref={ref}>
        <motion.h1
            style={{
              y: textY,
              // position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 50%)",
              // zIndex: 1,
            }}
          >
          <motion.div
            style={{
              // y: imageY,
              backgroundImage: `url(${photoArray[0]})`,
              width: "100%",
              height: "200vh",
              objectFit: "cover",
            }}
          ></motion.div>

            Photo of the Week
          </motion.h1>
        </motion.div>
        <FinalPOTW potw={potw} />
      </div>
    </>
  );
}

export default FrontPage;

import React from 'react'
import FinalPOTW from './FinalPOTW'
import buildingfortherich from '/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/buildingfortherich.jpeg'
import distopianfactory from '/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/distopianfactory.jpg'
import stupidbuilding from '/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/stupidbuilding1.jpg'
import unrealisticbuilding from '/Users/Gordon/Desktop/firebase-react-image-upload/showcase-site/photo-showcase/src/assets/unrealisticbuilding1.jpg'
import {motion, useScroll, useTransform} from 'framer-motion'
import { useRef } from 'react'

function FrontPage({ potw }) {

  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "start end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  const photoArray = [
    buildingfortherich,
    distopianfactory,
    stupidbuilding,
    unrealisticbuilding
  ]


  return (
    <div>
      <div className="potw-con">
        <motion.div ref={ref}>
          <motion.div style={{ y: imageY, backgroundImage: `url(${photoArray[0]})`, width: '100%', height: '100dvh' }} ></motion.div>
          <motion.h1 style={{ y: textY, position: 'relative', textAlign: 'center' }}>Photo of the Week</motion.h1>
        </motion.div>
        <FinalPOTW potw={potw} />
      </div>
    </div>
  )
}

export default FrontPage
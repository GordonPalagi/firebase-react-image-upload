import React from "react";
import "../App.css";

function FinalPOTW({ potw }) {
  return (
    <>
      {potw.map((image, index) => {
        const rowReverse = index % 2 === 0;
        const randomPurpleColor = Math.floor(Math.random() * 106 + 150);
        const randomGoldColor = Math.floor(Math.random() * 106 + 150);

        return (
          <React.Fragment key={index}>
            <div className="image-box">
              <div
                style={{
                  flexDirection: rowReverse ? "row" : "row-reverse",
                  backgroundColor: rowReverse
                    ? `rgba(170, ${randomPurpleColor}, 224, .5)`
                    : `rgba(253, ${randomGoldColor}, 224, .5)`,
                }}
                className="potw-image-con"
              >
                <div className="img-con">
                  <img
                    className="potw-images"
                    src={image.url}
                    alt={image.name}
                  />
                </div>

                <div className={"potw-text"}>
                  <section className="text-con">
                    <h3>
                      {image.title} by {image.name}
                    </h3>
                    <p>{image.description}</p>
                    <p>{image.teacherDescription}</p>
                  </section>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default FinalPOTW;

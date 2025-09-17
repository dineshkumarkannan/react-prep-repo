import React, { useEffect, useRef, useState } from "react";
import "./index.css";

const Images_Data = [
  {
    id: 1,
    image: "./image1.jpg",
    alt: "Image one",
  },
  {
    id: 2,
    image: "./image2.jpg",
    alt: "Image two",
  },
  {
    id: 3,
    image: "./image3.jpg",
    alt: "Image three",
  },
  {
    id: 4,
    image: "./image4.jpeg",
    alt: "Image four",
  },
  {
    id: 5,
    image: "./image5.jpeg",
    alt: "Image five",
  },
  {
    id: 6,
    image: "./image6.jpg",
    alt: "Image six",
  },
];

const Carousel = ({
  images,
  imgPerSlide = 2,
}: {
  images: any[];
  imgPerSlide?: number;
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (imgRefs.current[0]) {
      setImageWidth(imgRefs.current[0].offsetWidth);
    }
  }, [images, imgPerSlide]);

  // Reset to first image if images change
  useEffect(() => {
    if (images.length > 0) {
      setCurrentImg(0);
    }
  }, [images]);

  const prevClick = () => {
    setCurrentImg((prev) =>
      prev === 0 ? images.length - imgPerSlide : prev - 1
    );
  };

  const nextClick = () => {
    setCurrentImg((prev) =>
      prev >= images.length - imgPerSlide ? 0 : prev + 1
    );
  };

  // Clamp currentImg to valid range if images or imgPerSlide changes
  //   useEffect(() => {
  //     if (currentImg > images.length - imgPerSlide) {
  //       setCurrentImg(Math.max(0, images.length - imgPerSlide));
  //     }
  //   }, [images.length, imgPerSlide, currentImg]);

  return (
    <div
      className="carousel-container"
      style={{ width: imgPerSlide * imageWidth || "auto" }}
      aria-label="Image Carousel"
      role="region"
    >
      <div
        className="images"
        style={{
          display: "flex",
          transition: "transform 0.5s",
          transform: `translateX(-${currentImg * imageWidth}px)`,
        }}
      >
        {images.map((img, index) => (
          <img
            ref={(el) => (imgRefs.current[index] = el)}
            key={img.id}
            width={600}
            height={600}
            src={img.image}
            alt={img.alt}
            onLoad={() => {
              if (imgRefs.current[0]) {
                setImageWidth(imgRefs.current[0].offsetWidth);
              }
            }}
            style={{ flex: "0 0 auto" }}
          />
        ))}
      </div>
      <button
        className="btn prev"
        onClick={prevClick}
        aria-label="Show previous images"
        disabled={images.length <= imgPerSlide}
      >
        Prev
      </button>
      <button
        className="btn next"
        onClick={nextClick}
        aria-label="Show next images"
        disabled={images.length <= imgPerSlide}
      >
        Next
      </button>
    </div>
  );
};

const CarouselDemo = () => {
  const [images] = useState(Images_Data);

  // Example for fetching images from API:
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/photos?_limit=8")
  //     .then(res => res.json())
  //     .then(setImages);
  // }, []);

  return (
    <div className="carousel-setup">
      <Carousel images={images} imgPerSlide={2} />
    </div>
  );
};

export default CarouselDemo;

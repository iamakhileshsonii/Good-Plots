import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const PropertyImages = ({ images }) => {
  // Autoplay configuration
  const swiperParams = {
    loop: true, // Enable continuous loop mode
    autoplay: {
      delay: 2000, // Autoplay interval in milliseconds
      disableOnInteraction: false, // Autoplay continues after user interaction
    },
    speed: 500, // Transition speed between slides
    spaceBetween: 20, // Space between slides
    slidesPerView: 1, // Number of slides per view
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border border-black-light">
      <h4 className="font-semibold sm:text-lg underline decoration-red-dark underline-offset-4 decoration-2 pb-3">
        Property Images
      </h4>
      <div>
        <Swiper {...swiperParams} className="rounded-md">
          {images &&
            Object.values(images).map((image, index) => (
              <SwiperSlide
                key={index}
                className=" object-cover sm:max-h-36 object-center"
              >
                <div>
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className="rounded-md"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PropertyImages;

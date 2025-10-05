import React from 'react';
import Slider from "react-slick";
import { academicPrograms } from './Data';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AcademicPrograms = () => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    autoplay: true,
    speed: 900,
    autoplaySpeed: 900,
    responsive: [
      {
        breakpoint: 1400, // Large screens
        settings: {
          slidesToShow: 3, // Display 3 slides
          slidesToScroll: 1,
          variableWidth: false
        }
      },
      {
        breakpoint: 1000, // Tablets
        settings: {
          slidesToShow: 2, // Display 2 slides
          slidesToScroll: 1,
          variableWidth: false
        }
      },
      {
        breakpoint:650, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false
        }
      }
    ]
  };

  return (
    <section className="text-gray-600 body-font">
      <div className=" py-14 mx-auto flex flex-wrap justify-between">
        <div className="md:w-[24%] px-4">
          <h2
            data-aos="fade-right" className="md:text-2xl lg:text-3xl text-3xl heading-custom font-medium uppercase tracking-widest title-font mb-2 ">Academic
            <span className='md:text-3xl   lg:text-4xl text-4xl block'>Programs</span>
          </h2>
          
          <div data-aos="zoom-in" className="h-[1.3px] bg-amber-600 w-2/3 mb-2 relative z-10 transition-all duration-300 group-hover:bg-teal-200 "></div>

          <p data-aos="fade-right" className="leading-relaxed text-justify text-base">Our academic programs provide a dynamic learning experience, combining theoretical knowledge with practical skills.</p>
        </div>
        <div
          data-aos="fade-left" className="w-full md:w-[72%] mt-5 lg:mt-0 ">

          <Slider {...settings}>
            {academicPrograms.map((item, index) => (
              <div key={index} className="p-2 text-gray-900">
                <div className=" h-fit md:h-[280px] px-4 md:px-7 py-10 rounded-lg overflow-hidden text-center relative flex flex-col justify-start items-start shadow-md border border-custom bg-gray-300 text-gray-800 transition-all duration-300 group">

                  {/* Background Layer Appearing from Left on Hover */}
                  <div className="absolute inset-0 bg-teal-800 opacity-90 transition-all duration-500 transform scale-x-0 origin-left group-hover:scale-x-100"></div>

                  {/* Category Button */}
                  <h2 className="tracking-widest text-xs font-semibold mb-7 -mt-3 px-3 py-2 rounded-full bg-teal-600 text-white relative z-10 transition-all duration-300 group-hover:bg-white group-hover:text-teal-800">
                    {item.category}
                  </h2>

                  {/* Faculty Name */}
                  <h1 className="sm:text-xl text-2xl font-bold uppercase text-left relative z-10 text-gray-800 transition-all duration-300 group-hover:text-white leading-6">
                    {item.faculty}
                  </h1>

                  <div className="h-[1.3px] bg-teal-600 w-[53%] md:w-2/3 mb-[6px] relative z-10 transition-all duration-300 group-hover:bg-teal-200 mt-1 md:mt-0 "></div>

                  {/* Description */}
                  <p className="leading-relaxed  text-lg md:text-sm text-justify relative z-10 text-gray-600 transition-all duration-300 group-hover:text-white">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}


          </Slider>
        </div>
      </div>
    </section>
    
  )
}

export default AcademicPrograms;


import React, { useState } from 'react'
import universities from "./UniData.js"
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";

const UniversitiesInfo = () => {
  return (
    <section className="text-custom body-font">
      <div className="p py-24 mx-auto">
        <div className="flex flex-wrap">
          {universities.map((item, index) => (
            <div key={index} className="p-3 md:w-1/3 sm:mb-0 mb-6">
              <div className=" h-64 overflow-hidden">
                <img alt="content" className="object-cover object-center h-full w-full" src={item.imgUrl} />
              </div>
              <NavLink to={`/UniDetails/${item.name}`}
                className="text-xl w-full font-medium title-font heading-custom mt-3 text-center" >{item.name}</NavLink>
            </div>

          ))}
        </div>
      </div>
    </section >
  )
}

export const UniDetails = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800,
  };
  const { id } = useParams();
  const university = universities.find((uni) => uni.name === id);

  if (!university) {
    return <h2 className="text-center text-xl text-red-500">University not found</h2>;
  }
  return (


    <section>
      <div
        style={{
          backgroundImage: `url("${university.imgUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-gray-500 bg-blend-multiply px-6 w-full mx-auto pt-24 lg:pt-56 pb-16 text-white text-center">
        <h1 className="mb-6 text-4xl font-bold leading-none md:text-5xl lg:text-6xl">{university.name}</h1>

        <div className="flex justify-center mt-6">
          <a href="#" className="inline-flex items-center py-3 px-6 text-lg font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-900">
            Get started
            <svg className="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>

        {/* <!-- Contact Info Section --> */}

        <div className="w-full flex flex-wrap justify-around mt-12">
          {university.contact.map((item, index) => (
            <div key={index} className="p-4 lg:w-1/3 md:w-3/4 mx-auto w-full">
              <div className="flex items-center bg-[rgba(0,0,0,0.4)] rounded-lg p-6">
                <div className="material-icons flex items-center justify-center rounded-full bg-blue-100 text-teal-800 p-2 px-3 ">
                  <span className=" text-3xl">
                    {item.icon}
                  </span>
                </div>
                <div className="ml-6">
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            </div>

          ))}
        </div>

      </div>


      <div className="w-full lg:w-[85%] mx-auto flex px-5 py-24 md:flex-row flex-col">
        <div className="lg:flex-grow lg:w-[56%] md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 text-center">
          <div className="flex flex-col items-start">

            <h2 className="text-2xl title-font font-medium text-indigo-950 mt-4 uppercase ">The {university.name}</h2>
            <hr className=' w-1/2 bg-indigo-700 h-[2px] my-2' />
            <p className="leading-relaxed mb-4 text-base text-justify">{university.overview}</p>
            <div className="flex items-center flex-wrap pb-4 mb-4 border-b-[1px] border-gray-400 mt-auto w-full">

            </div>
            <a className="inline-flex items-center">
              <img alt="blog" src={university.chancellorImg} className="w-16 h-16 rounded-full flex-shrink-0 object-cover object-center" />
              <span className="flex-grow flex flex-col pl-4">
                <span className="title-font font-medium heading-custom text-xl">{university.chancellor}</span>
                <hr className=' w-1/2 bg-indigo-700 h-[1px] my-[2px]' />

                <span className="text-custom text-sm tracking-widest">Vice Chancellor</span>
              </span>
            </a>
          </div>
        </div>
        <div className=" lg:w-2/5 md:w-1/2 w-full mx-auto">
          <div className="slider-">
            <Slider {...settings}>
              {university?.sliderImgs?.map((imgs, index) => (
                <div key={index}>
                  <img className="object-cover object-center rounded w-full h-[40vh]" alt="hero" src={imgs} />
                </div>
              ))}
            </Slider>
          </div>

        </div>
      </div>

      {/* //Scholarship Section Page */}

      <div className=" px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="text-2xl font-normal title-font mb-3 heading-custom tracking-wide uppercase">Explore Scholarship Opportunities in {university.name}</h1>
          {university.scholarships.map((item, index) => (
            <>
              <h3 key={index} className="text-3xl lg:text-4xl font-bold tracking-tight title-font heading-custom">{item.name}</h3>
              <hr className=' h-[0.6px] w-3/4 md:w-[50%] text-amber-600 my-3 mx-auto' />
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-8 text-custom ">Providing scholarship opportunities for foreign students in <span className=" font-bold" > IT programs </span></p>

              <div className="flex lg:w-[84%] w-full flex-col md:flex-row mx-auto mb-5   items-start justify-between px-8 lg:px-0">

                <ol className="relative w-full md:w-1/2 lg:w-[46%] heading-custom border-s-[0.6px] border-teal-500 dark:border-gray-700 dark:text-gray-400 text-left mx-2 my-3">
                  <h2 className="text-2xl font-bold tracking-tight title-font heading-custom m-3 mt-0 mb-0 ">Eligibility Criteria</h2>
                  <hr className=' h-[0.6px] w-3/4 md:w-[50%] text-amber-600 mt-1 mb-2 ml-4' />

                  {item.eligibilityCriteria.map((item, index) => (

                    <li key={index} className="mb-10 ms-6">
                      <span className="absolute flex items-center justify-center p-4 w-8 h-8 bg-teal-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-teal-900">
                        <span className={`material-icons text-2xl p-2 rounded-full border-[0.6px] border-teal-400 bg-blue-200 text-custom `}>
                          {item.icon}
                        </span>
                      </span>
                      <h3 className="text-lg font-semibold heading-custom pl-2  underline underline-offset-4 ">{item.title}</h3>
                      <p className="text-base pl-2 text-custom">{item.description}</p>
                    </li>

                  ))}
                </ol>

                <ol className=" w-full md:w-1/2 lg:w-[46%] relative border-s-[0.6px] border-blue-400 my-3 text-left mx-2 text-custom">
                  <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                      <span className="material-icons text-2xl p-2 rounded-full border-[0.6px] border-blue-400 bg-blue-200 ">card_giftcard</span>
                    </span>
                    <h3 className="text-lg font-semibold heading-custom pl-2  underline underline-offset-4 ">Benefits</h3>
                    <p className="text-base pl-2 text-custom">{item.benefits}</p>
                  </li>
                  <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                      <span className="material-icons text-2xl p-2 rounded-full border-[0.6px] border-blue-400 bg-blue-200 ">sync_alt</span>
                    </span>
                    <h3 className="text-lg font-semibold heading-custom pl-2  underline underline-offset-4 ">Application Process</h3>
                    <p className="text-base pl-2 text-custom">{item.applicationProcess}</p>
                  </li>
                  <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                      <span className="material-icons text-2xl p-2 rounded-full border-[0.6px] border-blue-400 bg-blue-200 ">schedule</span>
                    </span>
                    <h3 className="text-lg font-semibold heading-custom pl-2  underline underline-offset-4 ">Deadline</h3>
                    <p className="text-base pl-2 text-custom">{item.deadline}</p>
                  </li>

                </ol>
              </div></>

          ))}
          <div className="flex flex-col md:flex-row items-center md:items-start mx-auto mt-8  bg-gray-300 w-full py-14 px-8 ">
            <h1 className="flex-grow sm:pr-16 font-semibold text-3xl title-font  heading-custom tracking-wider">Unlock Your Future – Take the First Step Today!</h1>
            <NavLink to='/applicationForm' className=" text-2xl w-full md:w-1/3 lg:w-1/4 flex-shrink-0 text-white bg-teal  border-0 py-4 px-16 focus:outline-none hover:bg-teal-600 rounded md:text-lg mt-10 md:mt-0 uppercase ">Apply Now </NavLink>
          </div>



        </div>
      </div>


    </section>

  )
}

export default UniversitiesInfo;


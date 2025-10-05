import React, {useEffect, useState} from 'react'
import ApplicationForm from '../../Components/ApplicationForm'
import { useForm } from "react-hook-form"
import ScholarshipBenefits from './ScholarshipBenefits'
import { NavLink } from 'react-router-dom'
import UniversitiesInfo from '../UniversitiesInfo/UniversitiesInfo'
import AcademicPrograms from '../AcademicPrograms/AcademicPrograms'
import About from '../About/About'

const Home = () => {
   

  return (
    <>
      <section className="bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
      bg-gray-700 bg-blend-multiply overflow-hidden">
        
        <div data-aos="zoom-in" className="px-4 mx-auto max-w-screen-xl text-center py-40 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-wide text-white md:text-5xl lg:text-6xl xl:px-6">
            Welcome to Global IT Scholarship Program
          </h1>
          
          <p className="mb-8 text-lg font-light uppercase text-gray-300 lg:text-xl sm:px-8 lg:px-24">
            Empowering Future Innovators with Prestigious IT Scholarships
          </p>
          
          <div className="flex flex-wrap justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          
              <NavLink to={`/applicationForm`} 
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-teal-700 
                hover:bg-teal-800 focus:ring-4 focus:ring-blue-300 dark:focus:teal-blue-900">
                Apply now
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </NavLink>
              
            <NavLink to={`/scholarships`} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg border border-white 
            hover:bg-teal-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-400">
              See Guidelines
            </NavLink>
           
          </div>
        </div>
      </section>
<div className=' w-full overflow-x-hidden lg:w-[96%] mx-auto pb-24'>
  <About/>
      <ScholarshipBenefits />
      <AcademicPrograms />
      <UniversitiesInfo />
</div>
    </>
  )
}

export default Home;

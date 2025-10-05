
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {
     byUniversity,
     byFaculty,
     qualifications
} from './EligibilityCriteria';


const ApplicationForm = () => {
     const [step, setStep] = useState(1);
     const [eligibility, setEligibility] = useState("");
     const [Field, setField] = useState("") //Choose field by Faculty or by University
     const [status, setStatus] = useState(null);
     const navigate = useNavigate();
  const [applicants, setApplicants] = useState(null);

     const {
          register,
          handleSubmit,
          getValues,
          formState: { errors },
     } = useForm();

     useEffect(() => {
          // Check localStorage for logged-in user
          const storedApplicants = localStorage.getItem("Applicants");
          try {
            setApplicants(storedApplicants ? JSON.parse(storedApplicants) : null);
          } catch (error) {
            console.error("Error parsing Applicants from localStorage:", error);
            localStorage.removeItem("Applicants");
          }
        }, []); // Runs once when the component mounts
      
     const onSubmit = async (data) => {
          const formData = new FormData();

          if (data.file && data.file.length > 0) {
               formData.append("file", data.file[0]);
          }

          Object.entries(data).forEach(([key, value]) => {
               if (key !== "file") {
                    formData.append(key, value);
               }
          });
          if (step === 1 || step === 2) {
               setStep(step + 1);
          }
          else {
               try {
                    const response = await fetch(`https://sample-backend-topaz.vercel.app//applicationForm`, {
                         method: "POST",
                         body: formData,
                    });

                    if (response.ok) {
                         const responseData = await response.json();
                         localStorage.setItem("StudentData", JSON.stringify(responseData));
                         alert("Your data has been submitted!");
                        

                         navigate("/home");
                    } else {
                         const text = await response.text();
                         console.error("Server error:", text);
                         alert("Server returned an error.");
                    }
               } catch (error) {
                    console.error("Submission error:", error);
                    alert("Submission failed! Check console.");
               }

          }
     };

     const handleScholarship = () => {
          const percentage = getValues("percentage");
          const scholarshipOption = getValues("scholarship");
        
          if (!percentage) {
               ("Please enter your percentage before selecting a scholarship.");
               return;
          }

          if (scholarshipOption === "byFaculty") {
               setField("By Faculty")
               if (percentage >= 80 && percentage < 85) {
                    setEligibility("low");
                   
                    
               } else if (percentage >= 85 && percentage < 90) {
                    setEligibility("medium");
                   
                    
               } else if (percentage >= 90) {
                    setEligibility("high");
                   
                    
               } else {
                    setEligibility(null); // Reset eligibility if criteria are not met
               }
          }
          if (scholarshipOption === "byUniversity") {
               setField("By University")
               if (percentage >= 80 && percentage < 85) {
                    setEligibility("low");
                   
               } else if (percentage >= 85 && percentage < 90) {
                    setEligibility("medium");
                   
               } else if (percentage >= 90) {
                    setEligibility("high");
                  
               } else {
                    setEligibility(null); // Reset eligibility if criteria are not met
               }
          }



     };

     const handleBack = () => {
          setStep(step - 1); // Go back to the previous step
     };

     return (
          <section className="body-font relative text-custom">
               <div className="mx-auto px-5 py-24">
                    <div className="mb-12 flex w-full flex-col text-center">
                         <h1 className="title-font mb-4 text-3xl font-bold heading-custom sm:text-4xl uppercase">Application Form</h1>
                         <p className="mx-auto text-custom leading-relaxed lg:w-2/3">We'd love to hear from you! Please fill out the form below.</p>
                    </div>

                    <div className="mx-auto md:w-3/4 ">
                         <form onSubmit={handleSubmit(onSubmit)} >
                              {step == 1 && (
                                   <div className="-m-2 flex flex-wrap">
                                        {/* Name */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="name" className="text-sm font-medium text-custom uppercase">Name</label>
                                                  <input
                                                       {...register("name", { required: "Name is required" })}
                                                       type="text"
                                                       id="name"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="John Doe"
                                                  />
                                                  {errors.name && <p className="text-red-700 tracking-wide text-sm">{errors.name.message}</p>}
                                             </div>
                                        </div>

                                        {/* Father's Name */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="fatherName" className="text-sm font-medium text-custom uppercase">Father's Name</label>
                                                  <input
                                                       {...register("Fathersname", { required: "Father's name is required" })}
                                                       type="text"
                                                       id="fatherName"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="James Doe"
                                                  />
                                                  {errors.Fathersname && <p className="text-red-700 tracking-wide text-sm">{errors.Fathersname.message}</p>}

                                             </div>
                                        </div>

                                        {/* Email */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="email" className="text-sm font-medium text-custom uppercase">Email</label>
                                                  <input
                                                       {...register("email", { required: "Email is required" })}
                                                       type="email"
                                                       id="email"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="johndoe@example.com"
                                                  />
                                                  {errors.email && <p className="text-red-700 tracking-wide text-sm">{errors.email.message}</p>}
                                             </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="phone" className="text-sm font-medium text-custom uppercase">Phone</label>
                                                  <input
                                                       {...register("phone", { required: "Phone number is required" })}
                                                       type="tel"
                                                       id="phone"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="+1234567890"
                                                  />
                                                  {errors.phone && <p className="text-red-700 tracking-wide text-sm">{errors.phone.message}</p>}
                                             </div>
                                        </div>

                                        {/* CNIC */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="cnic" className="text-sm font-medium text-custom uppercase">CNIC</label>
                                                  <input
                                                       {...register("cnic", { required: "CNIC is required" })}
                                                       type="text"
                                                       id="cnic"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="12345-6789012-3"
                                                  />
                                                  {errors.cnic && <p className="text-red-700 tracking-wide text-sm">{errors.cnic.message}</p>}
                                             </div>
                                        </div>

                                        {/* Date of Birth */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="dob" className="text-sm font-medium text-custom uppercase">Date of Birth</label>
                                                  <input
                                                       {...register("dob", { required: "Date of birth is required" })}
                                                       type="date"
                                                       id="dob"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                  />
                                                  {errors.dob && <p className="text-red-700 tracking-wide text-sm">{errors.dob.message}</p>}
                                             </div>
                                        </div>

                                        {/* Age */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="age" className="text-sm font-medium text-custom uppercase">Age</label>
                                                  <input
                                                       {...register("age", { required: "Age is required" })}
                                                       type="number"
                                                       id="age"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="25"
                                                  />
                                                  {errors.age && <p className="text-red-700 tracking-wide text-sm">{errors.age.message}</p>}
                                             </div>
                                        </div>

                                        {/* Gender */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label className="text-sm font-medium text-custom uppercase">Gender</label>
                                                  <div className="mt-1 flex space-x-4">
                                                       <div className="inline-flex items-center">
                                                            <input
                                                                 {...register("gender", { required: "Gender is required" })}
                                                                 type="radio"
                                                                 value="male"
                                                                 className="h-5 w-5 text-indigo-600"
                                                            />
                                                            <span className="ml-2 text-custom">Male</span>
                                                       </div>
                                                       <div className="inline-flex items-center">
                                                            <input
                                                                 {...register("gender", { required: "Gender is required" })}
                                                                 type="radio"
                                                                 value="female"
                                                                 className="h-5 w-5 text-indigo-600"
                                                            />
                                                            <span className="ml-2 text-custom">Female</span>
                                                       </div>
                                                       <div className="inline-flex items-center">
                                                            <input
                                                                 {...register("gender", { required: "Gender is required" })}
                                                                 type="radio"
                                                                 value="other"
                                                                 className="h-5 w-5 text-indigo-600"
                                                            />
                                                            <span className="ml-2 text-custom">Other</span>
                                                       </div>
                                                  </div>
                                                  {errors.gender && <p className="text-red-700 tracking-wide text-sm">{errors.gender.message}</p>}
                                             </div>
                                        </div>

                                        {/* Country */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="country" className="text-sm font-medium text-custom uppercase">Country</label>
                                                  <input
                                                       {...register("country", { required: "Country is required" })}
                                                       type="text"
                                                       id="country"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="e.g., United States"
                                                  />
                                                  {errors.country && <p className="text-red-700 tracking-wide text-sm">{errors.country.message}</p>}
                                             </div>
                                        </div>

                                        {/* City */}
                                        <div className="w-full md:w-1/2 p-3">
                                             <div className="relative">
                                                  <label htmlFor="city" className="text-sm font-medium text-custom uppercase">City</label>
                                                  <input
                                                       {...register("city", { required: "City is required" })}
                                                       type="text"
                                                       id="city"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="e.g., New York"
                                                  />
                                                  {errors.city && <p className="text-red-700 tracking-wide text-sm">{errors.city.message}</p>}
                                             </div>
                                        </div>

                                        {/* Address */}
                                        <div className="w-full p-2">
                                             <div className="relative">
                                                  <label htmlFor="address" className="text-sm font-medium text-custom uppercase">Address</label>
                                                  <textarea
                                                       {...register("address", { required: "Address is required" })}
                                                       id="address"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       placeholder="123 Main St, Apartment 4B"
                                                  />
                                                  {errors.address && <p className="text-red-700 tracking-wide text-sm">{errors.address.message}</p>}
                                             </div>
                                        </div>
                                       
                                        <button

                                             type="submit"
                                             className="mt-4 w-full rounded-lg bg-teal px-8 py-3 text-lg font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                             Next
                                        </button>
                                   </div>
                              )}

                              {/* Academic info */}
                              {step == 2 && (
                                   <div className="-m-2 flex flex-wrap">
                                        {/* Highest Qualification */}
                                        <div className="w-full p-2 md:w-1/2">
                                             <div className="relative">
                                                  <label htmlFor="highestQualification" className="text-sm font-medium text-custom uppercase">
                                                       Highest Qualification
                                                  </label>
                                                  <select
                                                       id="highestQualification"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       {...register('qualification', { required: 'Qualification is required' })}
                                                  >
                                                       {qualifications.map((item, index) => (

                                                            <option key={index} value={item.value} disabled={item.disabled} selected={item.selected}>
                                                                 {item.label}                                                       </option>
                                                       ))}

                                                  </select>
                                                  {errors.qualification && <span className=' text-red-700 text-sm'>{errors.qualification.message}</span>}
                                             </div>
                                        </div>

                                        {/* Current Education */}
                                        <div className="w-full p-2 md:w-1/2">
                                             <div className="relative">
                                                  <label htmlFor="currentEducation" className="text-sm font-medium text-custom uppercase">
                                                       Current Education
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="currentEducation"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       {...register('education', { required: 'Education is required' })}
                                                       placeholder="e.g., Bachelor's in Computer Science"
                                                  />
                                                  {errors.education && <span className=' text-red-700 text-sm'>{errors.education.message}</span>}
                                             </div>
                                        </div>

                                        {/* Last percentage/Percentage */}
                                        <div className="w-full p-2 md:w-1/2">
                                             <div className="relative">
                                                  <label htmlFor="lastpercentage" className="text-sm font-medium text-custom uppercase">
                                                       Last percentage/Percentage
                                                  </label>
                                                  <input
                                                       type="text"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       {...register('percentage', { required: 'percentage is required' })}
                                                       placeholder="e.g., 3.8 percentage or 85%"
                                                  />
                                                  {errors.percentage && <span className=' text-red-700 text-sm'>{errors.percentage.message}</span>}
                                             </div>
                                        </div>

                                        {/* Last Education Institute */}
                                        <div className="w-full p-2 md:w-1/2">
                                             <div className="relative">
                                                  <label htmlFor="lastInstitute" className="text-sm font-medium text-custom uppercase">
                                                       Last Education Institute
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="lastInstitute"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       {...register('lastInstitute', { required: 'Last institute is required' })}
                                                       placeholder="e.g., Harvard University"
                                                  />
                                                  {errors.lastInstitute && <span className=' text-red-700 text-sm'>{errors.lastInstitute.message}</span>}
                                             </div>
                                        </div>
 {/* file */}

 <div className="w-full p-2">
                                             <div className="relative">
                                                  <label htmlFor="file" className="text-sm font-medium text-custom uppercase">
                                                       Last Qualification file
                                                  </label>
                                                  <input
                                                       {...register("file", {
                                                            required: "Last Qualification file is required",
                                                            validate: {
                                                                 fileSize: (files) =>
                                                                      files[0]?.size < 5 * 1024 * 1024 || "File must be under 5MB",
                                                                 fileType: (files) =>
                                                                      ["application/pdf", "image/jpeg", "image/png"].includes(files[0]?.type) ||
                                                                      "Only PDF/JPG/PNG allowed",
                                                            },
                                                       })}
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] bg-transparent px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       type="file"
                                                       accept=".pdf,.jpg,.png"
                                                  />
                                                  {errors.file && (
                                                       <p className="text-red-700 tracking-wide text-sm">{errors.file.message}</p>
                                                  )}
                                                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                                                       Only PDF, JPG, PNG files (Max: 5MB)
                                                  </p>
                                             </div>
                                        </div>
                                        {/* Current Institute */}
                                        <div className="w-full p-2 md:w-1/2">
                                             <div className="relative">
                                                  <label htmlFor="currentInstitute" className="text-sm font-medium text-custom uppercase">
                                                       Current Institute
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="currentInstitute"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       {...register('currentInstitute', { required: 'Current institute is required' })}
                                                       placeholder="e.g., Stanford University"
                                                  />
                                                  {errors.currentInstitute && <span className=' text-red-700 text-sm'>{errors.currentInstitute.message}</span>}
                                             </div>
                                        </div>


                                        {/*  Button */}
                                        <div className="flex justify-between mt-4 w-full">
                                             <button
                                                  type="button"
                                                  onClick={handleBack}
                                                  className=" lg:w-[47%] mt-4 w-full rounded-lg bg-gray-600 px-8 py-3 text-lg font-semibold text-white hover:bg-gray-500 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                                             >
                                                  Back
                                             </button>

                                             <button

                                                  type="submit"
                                                  className=" lg:w-[47%] mt-4 w-full rounded-lg bg-teal px-8 py-3 text-lg font-semibold text-white hover:bg-teal-500 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                                             >
                                                  Next
                                             </button>
                                        </div>

                                   </div>

                              )}

                              {step == 3 && (
                                   <div className="-m-2 flex flex-wrap">
                                        {/* Scholarship Selection */}
                                        <div className="w-full p-2">
                                             <div className="relative">
                                                  <label htmlFor="scholarship" className="text-sm font-medium text-custom uppercase">
                                                       Choose Scholarship
                                                  </label>
                                                  <select
                                                       onClick={handleScholarship}
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none capitalize"
                                                       {...register('scholarship', { required: true })}
                                                  >
                                                       <option value="" disabled selected>
                                                            Select Scholarship by Faculty or by University
                                                       </option>
                                                       <option value="byFaculty">by Faculty</option>
                                                       <option value="byUniversity">by University</option>
                                                  </select>
                                                  {errors.scholarship && <span className="text-red-700 tracking-wide text-sm">This field is required</span>}
                                             </div>
                                        </div>

                                        {/* Eligibility Selection */}

                                        {Field === "By University" && byUniversity[eligibility]?.length > 0 && (
                                             <div className="w-full p-2">
                                                  <div className="relative">
                                                       <label htmlFor="byUniversity" className="text-sm font-medium text-custom uppercase">
                                                            Choose Scholarship According To University
                                                       </label>
                                                       <select
                                                            className="mt-1 w-full rounded-lg border-custom border-[0.8px] bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none capitalize"
                                                            {...register('byUniversity', { required: true })}
                                                            defaultValue=""
                                                       >
                                                             <option value="" disabled>Select Field</option>
                                                             {byUniversity[eligibility].map((item, index) => (
                                                            <>
                                                            <option
                                                            key={index} 
                                                            value=
                                                            {`${item.university},${item.field}`}>
                                                            {item.university}, {item.field}
                                                            </option>
                                                            </>

                                                       ))}
                                                       </select>
                                                       {errors.byUniversity && (
                                                            <span className="text-red-700 tracking-wide text-sm">This field is required</span>
                                                       )}
                                                  </div>
                                             </div>
)}

{Field === "By Faculty" && byFaculty[eligibility]?.length > 0 && (
                                             <div className="w-full p-2">
                                                  <div className="relative">
                                                       <label htmlFor="byFaculty" className="text-sm font-medium text-custom uppercase">
                                                            Choose Scholarship According To Faculty
                                                       </label>
                                                       <select
                                                            className="mt-1 w-full rounded-lg border-custom border-[0.8px] bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none capitalize"
                                                            {...register('byFaculty', { required: true })}
                                                            defaultValue=""
                                                       >
                                                             <option value="" disabled>Select Field</option>
                                                             {byFaculty[eligibility].map((item, index) => (
                                                            <>
                                                            <option
                                                            key={index} 
                                                            value=
                                                            {`${item.faculty}, ${item.university}`}>
                                                            {item.faculty}, {item.university}
                                                            </option>
                                                            </>

                                                       ))}
                                                       </select>
                                                       {errors.byFaculty && (
                                                            <span className="text-red-700 tracking-wide text-sm">This field is required</span>
                                                       )}
                                                  </div>
                                             </div>
)}

                                        {/* {eligibility === "low" && (
                                             <div className="w-full p-2">
                                                  <div className="relative">
                                                       <label htmlFor="lowEligibilityField" className="text-sm font-medium text-custom uppercase">
                                                            Choose Scholarship
                                                       </label>
                                                       <select
                                                            className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none capitalize"
                                                            {...register('byUniversity', { required: true })}
                                                       >
                                                            <option value="" disabled selected>
                                                                 Select Field
                                                            </option>
                                                            {byUniversity.map((item, index) => (

                                                                 <option value={`${item.field} , ${item.university}`}>{item.field} , {item.university}</option>
                                                            ))}

                                                       </select>
                                                       {errors.byUniversity && <span className="text-red-700 tracking-wide text-sm">This field is required</span>}
                                                  </div>
                                             </div>

                                        )}

                                      

                                        {eligibility === null && (
                                             <p className="mx-auto text-lg text-red-800  leading-relaxed lg:w-2/3">The Percentage dosen't match Scholarship Criteria</p>
                                        )
                                        }

                                        {/* Additional Information */}
                                        <div className="w-full p-2">
                                             <div className="relative">
                                                  <textarea
                                                       id="additionalInfo"
                                                       rows="4"
                                                       className="mt-1 w-full rounded-lg border-custom  border-[0.8px] -300 bg-transparent px-4 py-2 text-custom focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                                       {...register('optional')}
                                                       placeholder="Why do you want this scholarship?"
                                                  ></textarea>
                                             </div>
                                        </div>

                                        {/*  Button */}
                                        <div className="flex justify-between mt-4 w-full">
                                             <button
                                                  type="button"
                                                  onClick={handleBack}
                                                  className=" lg:w-[47%] mt-4 w-full rounded-lg bg-gray-600 px-8 py-3 text-lg font-semibold text-white hover:bg-gray-500 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                                             >
                                                  Back
                                             </button>

                                             <button
                                                  type="submit"
                                                  className=" lg:w-[47%] mt-4 w-full rounded-lg bg-teal px-8 py-3 text-lg font-semibold text-white hover:bg-teal-500 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                                             >
                                                  Submit
                                             </button>
                                        </div>

                                   </div>

                              )}


                         </form>
                         {status && <p>Status: {status}</p>}

                    </div>
               </div>
          </section>
     );
};

export default ApplicationForm;
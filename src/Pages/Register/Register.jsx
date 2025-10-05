
import React from 'react'
import Login from '../Login/Login'

const Register = () => {
     return (
          <section className='  py-24 px-5 '>
               <div className='container mx-auto p-6 w-full lg:w-[85%] flex flex-col md:flex-row justify-between flex-wrap bg-gray-200'>
                    <div className=' w-full md:w-3/4 mx-auto'>
                         <h1 className=' w-fit mx-auto text-3xl heading-custom font-semibold capitalize text-center'>Login
                              <div className=' w-full h-[2px] bg-amber-600 my-3 mb-4'></div>

                         </h1>
                         <Login />
                         <p className="text-center text-custom mt-4">
                              Don't have an account?{" "}
                              <a href="/signup" className="text-blue-600 hover:underline">
                                   sign Up
                              </a>
                         </p>
                    </div>

               </div>

          </section>
     )
}

export default Register

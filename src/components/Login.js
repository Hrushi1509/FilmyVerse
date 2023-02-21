import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

const Login = () => {
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    return (
        <div className='w-full flex flex-col mt-8 items-center'>
            <h1 className='text-xl font-bold'>Login</h1>
            
            <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-300">Mobile Number</label>
                    <input type={"number"} id="email" name="email"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-200 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>

            <div class="p-2 w-full md:w-1/3">
                <div class="relative">
                    <label for="email" class="leading-7 text-sm text-gray-300">Password</label>
                    <input type="password" id="email" name="email"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-200 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>

            <div class="p-2 w-full">
                <button class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                    {loading ? <TailSpin height={25} color="white" /> : "Login"}
                </button>
            </div>

            <div>
                <p>Do not have account? <Link to={"/signup"}><span className='text-blue-500'>Sign up</span></Link></p>
            </div>

        </div>
    )
}

export default Login

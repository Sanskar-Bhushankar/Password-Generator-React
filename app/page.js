"use client"
import { useState,useCallback,useEffect, useRef } from "react";

export default function Home() {
  const [btname, setbtname] = useState("Copy")
  const [length, setlength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const [charallowed, setcharallowed] = useState(false)
  const [password, setpassword] = useState("")

  //ref hook
  const passref = useRef(null)

  const passwordgenerator =useCallback(
    () => {
      let pass=""
      let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

      if(numberallowed)str+='1234567890'
      if(charallowed)str+='!@#$'

      for (let i = 1; i < length; i++) {
        
        let char =Math.floor(Math.random()*str.length+1)
        pass +=str.charAt(char)
      }
      setpassword(pass)
    },
    [length,numberallowed,charallowed],
  )

  useEffect(() => {
    passwordgenerator()
  },[length,numberallowed,charallowed])
  
  

  return (
    <>
    <div className="bg-black min-h-screen flex items-center justify-center">
  <div className="bg-slate-700 p-10 rounded-xl text-center space-y-5 shadow-lg w-[500px]">
    <h1 className="text-4xl text-white font-bold">Password Generator</h1>

    {/* Display generated password and copy button */}
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={password}
          ref={passref}
          className="w-full text-xl p-2 rounded-md text-center bg-slate-900 text-green-300 focus:outline-none"
          placeholder="Your generated password"
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(password).then(() => {
              setbtname("Copied!"); // Change button text to "Copied!"
              setTimeout(() => {
                setbtname("Copy"); // Reset button text after 2 seconds
              }, 2000);
            }).catch((error) => {
              console.error("Failed to copy password:", error);
            });
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          {btname}
        </button>
      </div>
      <button
        onClick={passwordgenerator}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full"
      >
        Generate Password
      </button>
    </div>

    {/* Password Length Slider and Checkbox Options in the Same Line */}
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center text-white w-1/2">
        <input
          type="range"
          min={6}
          max={30}
          value={length}
          onChange={(e) => setlength(e.target.value)}
          className="w-full cursor-pointer"
        />
        <label className="ml-2 text-lg">
          Length: <span className="font-bold">{length}</span>
        </label>
      </div>

      <div className="flex items-center text-white space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={numberallowed}
            onChange={() => setnumberallowed((prev) => !prev)}
            className="cursor-pointer mr-2"
          />
          <label>Numbers</label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={charallowed}
            onChange={() => setcharallowed((prev) => !prev)}
            className="cursor-pointer mr-2"
          />
          <label>Symbols</label>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

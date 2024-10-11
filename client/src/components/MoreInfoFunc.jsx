import { Button } from 'flowbite-react'
import React from 'react'



function MoreInfoFunc() {
  return (
    <div className="flex flex-col sm:flex-row p-6 border rounded-lg shadow-md border-teal-300 justify-center items-center bg-white dark:bg-gray-800 transition duration-300 ease-in-out">
      <div className="flex-1 flex flex-col justify-center p-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Want to learn more about Hackers?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Check out these resources for more information.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-lg shadow transition duration-300 ease-in-out hover:shadow-lg"
        >
          <a
            href="https://www.krebsonsecurity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Know More
          </a>
        </Button>
      </div>
      <div className="p-5">
        <img
          src="https://cdn.pixabay.com/photo/2024/03/27/17/23/ai-generated-8659548_640.jpg"
          alt="Hacker"
          className="rounded-lg shadow transition duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,0,0.6)]"
        //   style={{
        //     boxShadow: '0 0 15px rgba(0, 255, 0, 0.6)', // Green shadow
        //   }}
        />
      </div>
    </div>
  );
}

export default MoreInfoFunc;



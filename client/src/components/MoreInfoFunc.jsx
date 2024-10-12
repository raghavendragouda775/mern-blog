import { Button } from 'flowbite-react';
import React from 'react';

function MoreInfoFunc() {
  return (
    <div className="flex flex-col sm:flex-row p-6 border rounded-lg shadow-lg border-teal-300 justify-center items-center bg-white dark:bg-gray-800 transition duration-300 ease-in-out">
      <div className="flex-1 flex flex-col justify-center p-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Expand Your Coding Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Dive deeper into JavaScript, React, and Next.js. Explore resources and communities to enhance your programming journey.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-lg shadow transition duration-300 ease-in-out hover:shadow-lg"
        >
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            Learn More
          </a>
        </Button>
      </div>
      <div className="p-5">
        <img
          src="https://wallpapercave.com/wp/wp8904080.jpg"
          alt="Coding Community"
          className="rounded-lg shadow transition duration-300 ease-in-out hover:scale-80 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)]"
        />
      </div>
    </div>
  );
}

export default MoreInfoFunc;



import React from "react";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="bg-gray-900 py-12">
          <div className="container px-6 m-auto text-gray-800 block sm:flex justify-center">
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Home
              </div>
              <a className="my-3 block text-white" href="/#">
                Services <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Products <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                About Us <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Pricing <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Partners <span className="text-teal-600 text-xs p-1">New</span>
              </a>
            </div>
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                User
              </div>
              <a className="my-3 block text-white" href="/#">
                Sign in <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                New Account <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Demo <span className="text-teal-600 text-xs p-1">New</span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Career{" "}
                <span className="text-teal-600 text-xs p-1">We're hiring</span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Surveys <span className="text-teal-600 text-xs p-1">New</span>
              </a>
            </div>
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Resources
              </div>
              <a className="my-3 block text-white" href="/#">
                Documentation{" "}
                <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Tutorials <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Support <span className="text-teal-600 text-xs p-1">New</span>
              </a>
            </div>
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Support
              </div>
              <a className="my-3 block text-white" href="/#">
                Help Center <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Privacy Policy{" "}
                <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <a className="my-3 block text-white" href="/#">
                Conditions <span className="text-teal-600 text-xs p-1"></span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 pt-2 ">
          <div
            className="flex pb-5 px-6 m-auto pt-5 border-t text-white text-sm flex-col
      md:flex-row container"
          >
            <div className="mt-2">© Copyright 2020. All Rights Reserved.</div>
            <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
              <a href="/#" className="w-6 mx-1">
                <svg
                  className="fill-current cursor-pointer text-gray-500 hover:text-gray-400"
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Facebook"
                    d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
                  5.373,-12 12,-12c6.627,0 12,5.373
                  12,12Zm-11.278,0l1.294,0l0.172,-1.617l-1.466,0l0.002,-0.808c0,-0.422
                  0.04,-0.648 0.646,-0.648l0.809,0l0,-1.616l-1.295,0c-1.555,0 -2.103,0.784
                  -2.103,2.102l0,0.97l-0.969,0l0,1.617l0.969,0l0,4.689l1.941,0l0,-4.689Z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

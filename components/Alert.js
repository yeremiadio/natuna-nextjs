import React, { useEffect, useState } from "react";
import { CheckIcon, XCircleIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";

const Alert = ({
  message,
  status,
  setColor,
  color,
  showAlert,
  setShowAlert,
}) => {
  useEffect(() => {
    if (status === "error") {
      setColor("red");
    }
    if (status === "success") {
      setColor("green");
    } else {
      setColor("gray");
    }
  }, [status]);
  return (
    <>
      <Transition
        show={showAlert}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`text-white h-auto px-6 py-4 border-0 rounded relative mb-4 bg-${color}-500`}
        >
          {/* <span className="text-xl inline-block mr-5 align-middle">
            {status === "error" ? (
              <XCircleIcon />
            ) : (
              status === "success" && <CheckIcon />
            )}
          </span> */}
          <span className="inline-block align-middle mr-8 text-white">
            <b className="capitalize">
              {status.charAt(0).toUpperCase() + status.slice(1)}!
            </b>{" "}
            {message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      </Transition>
    </>
  );
};

export default Alert;

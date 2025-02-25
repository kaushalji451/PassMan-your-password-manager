import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white py-4 text-center">
      <div className="logo font-bold text-white text-2xl ">
        <span className="text-green-500"> &lt;</span>

        <span>Pass</span>
        <span className="text-green-500">Man/&gt;</span>
      </div>
      <div>
        Create with <i className="fa-solid fa-heart text-red-600 hover:text-xl"></i> by
        AbhisheKaushal
      </div>
    </div>
  );
};

export default Footer;

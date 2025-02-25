import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="md:container md:px-30 lg:px-40 mx-auto flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>

          <span className="hover:text-orange-400">Pass</span>
          <span className="text-green-500">Man/&gt;</span>
        </div>

        <div className="bg-green-700 rounded-full px-2  hover:border hover:border-white">
         <a href="https://github.com/kaushalji451" className="flex justify-center gap-2">
         <i className="fa-brands fa-github text-4xl -ms-2"></i>
         <span className="font-bold mt-1.5">GitHub</span>
         </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import footer from "../assets/footer/footer-logo.png";
import fb from "../assets/footer/fb.png";
import twitter from "../assets/footer/twitter.png";
import be from "../assets/footer/be.png";
import youtube from "../assets/footer/youtube.png";

const Footer = () => {
  return (
    <footer className="lg:px-32 px-5 flex justify-between items-center lg:h-[100px] h-auto bg-[#212121]">
      <div className="flex justify-center items-center gap-10">
        <img src={footer} alt="Logo" className="lg:w-[186px] lg:h-[40px] w-20 h-auto" />
        <div className="border-l-2 border-red-500 h-[20px]"></div>
        <div className="text-base font-jakarta font-normal text-[#FFFFFF99]">Copyright 2024</div>
      </div>
      <div className="flex gap-5 ">
        <img src={fb} alt="user" className=" w-[10px] h-full" />
        <img src={twitter} alt="user" className=" w-[18px] h-full" />
        <img src={be} alt="user" className=" w-[18px] h-full" />
        <img src={youtube} alt="user" className=" w-[18px] h-full" />
      </div>
    </footer>
  );
};

export default Footer;








// import React from "react";

// const Footer = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Content of the page */}
//       <div className="flex-grow">
//         {/* Your main content goes here */}
//       </div>

//       {/* Footer */}
//       <footer className="bg-blue-600 p-4 flex justify-between items-center">
//         {/* Logo on the left */}
//         <div className="text-white text-xl font-bold">
//           <a href="/">Left Logo</a>
//         </div>

//         {/* Logo on the right */}
//         <div className="text-white text-xl font-bold">
//           <a href="/">Right Logo</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;

import { useEffect, useState } from 'react'

import api from '../services/api';
import sample_ad from "../assets/account/sample-ad.png";

const Ads = () => {
  const [ads, setAds] = useState([]);

  async function adsList() {
    try {
      const res = await api.get("/api/advertisements");
      setAds(res.data);
    } catch (error) {
      console.error("Error fetching advertisements", error);
    }
  }

  useEffect(() => {
    adsList();
  }, []);

  return (
    <div className='flex flex-col gap-[24px]'>
      {ads.map((ad, i) => (
        <div className='p-[20px] rounded-xl'
          style={{
            boxShadow: "0px 1px 80px 12px #1A28440F",
          }}>
          <div className=' flex justify-between'>
            <div className='flex gap-[20px] '>
              <div>
                <img src={ad?.image} alt="user" className="w-[150px] h-[165px] rounded-[12px]" />
              </div>
              <div>
                <div className='font-medium font-jakarta text-xl'>{ad?.title}</div>
                <div className='tetx-[#667085] font-jakarta text-base font-normal pt-[9px]'>Dallas, Texas · <span className='text-[#524EB7]'>24hrs ago</span></div>
                <div className='font-medium text-2xl font-jakarta pt-[20px]'>${ad?.price}</div>
              </div>
            </div>
            <div className='flex  gap-[13px]'>
              <button
                className=" w-[87px] px-4 py-2 rounded-3xl h-[50px] border-2 border-[#D0D5DD] text-[#667085] font-semibold text-sm"
              >view</button>
              <button
                className="w-[87px] px-4 py-2 rounded-3xl h-[50px] bg-[#F50963] text-white font-semibold text-sm"
              >Edit Ad</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Ads
import { useEffect, useState } from 'react'
import api from '../services/api';
import profile_pic from "../assets/account/profile-pic.png";
import inbox from "../assets/account/inbox.png";
import location from "../assets/account/location.png";
import mob from "../assets/account/mob.png";
import sample_ad from "../assets/account/sample-ad.png";
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [ads, setAds] = useState([]);

  async function profileInfo() {
    try {
      const res = await api.get("/api/profile");
      setProfile(res.data);
    } catch (error) {
      console.error("Error fetching advertisements", error);
    }
  }

  async function adsList() {
    try {
      const res = await api.get("/api/advertisements");
      setAds(res.data);
    } catch (error) {
      console.error("Error fetching advertisements", error);
    }
  }

  useEffect(() => {
    profileInfo();
    adsList();
  }, []);


  return (
    <div className='min-h-[683px] h-full flex flex-col gap-[24px]'>

      <div className='p-[20px] rounded-xl '
        style={{
          boxShadow: "0px 1px 80px 12px #1A28440F",
        }}>

        <div className='flex justify-between border-b-2 border-[#D0D5DD] pb-[25px]'>
          <div className='flex gap-[20px]'>
            <div>
              <img src={profile_pic} alt="user" className="w-[65px] h-[65px] rounded-[12px]" />
            </div>
            <div>
              <div className='font-medium font-jakarta text-xl text-[#333333]'>
                {profile?.firstName || profile?.lastName ? `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() : "Cameron Williamson"}
              </div>
              <div className='font-jakarta text-[#667085] text-base font-normal'>Member since <br /> 2019</div>
            </div>
          </div>
          <div>
            <button
              className="px-4 py-2 rounded-3xl h-[50px] border-2 border-[#D0D5DD] text-[#667085] font-semibold text-sm"
              onClick={() => navigate("/dashboard/profile")}
            >Edit prrofile</button>
          </div>
        </div>

        <div className='mt-[20px] flex gap-[12px]'>
          <div className='flex items-center gap-[9px]'>
            <img src={location} alt="user" className="w-[15px] h-[15px]" />
            <div> {profile?.location || "Ash Dr. San Jose, South Dakota"}  </div>
            <div className="border-l-2 border-[#D0D5DD] h-[20px]"></div>
          </div>
          <div className='flex items-center gap-[9px]'>
            <img src={inbox} alt="user" className="w-[15px] h-[15px]" />
            <div>{profile?.email || "example.email@gmail.com"}</div>
            <div className="border-l-2 border-[#D0D5DD] h-[20px]"></div>
          </div>
          <div className='flex items-center gap-[9px]'>
            <img src={mob} alt="user" className="w-[15px] h-[15px]" />
            <div> {profile?.phone || "(480) 555-0103"}   </div>
          </div>
        </div>
      </div>


      {/* dummy data if no data on api */}
      {ads.length === 0 && (
        <div className='p-[20px] rounded-xl'
          style={{
            boxShadow: "0px 1px 80px 12px #1A28440F",
          }}>
          <div className=' flex justify-between'>
            <div className='flex gap-[20px] '>
              <div>
                <img src={sample_ad} alt="user" className="w-[150px] h-[165px] rounded-[12px]" />
              </div>
              <div>
                <div className='font-medium font-jakarta text-xl'>Luxury couple apartment</div>
                <div className='tetx-[#667085] font-jakarta text-base font-normal pt-[9px]'>Dallas, Texas · <span className='text-[#524EB7]'>24hrs ago</span></div>
                <div className='font-medium text-2xl font-jakarta pt-[20px]'>$124.80</div>
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
      )}


      {/* data from api */}
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

export default MyAccount
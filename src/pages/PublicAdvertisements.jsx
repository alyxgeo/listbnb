import { useEffect, useState } from "react";
import api from "../services/api";
import girl from "../assets/home/girl.png";
import number from "../assets/home/number.png";
import mobile from "../assets/home/mobile.png";
import eye from "../assets/home/eye.png";
import list from "../assets/home/list.png";
import grid from "../assets/home/grid.png";

const PublicAdvertisements = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const [layout, setLayout] = useState("grid");


    useEffect(() => {
        async function fetchAds() {
            try {
                const res = await api.get("/api/advertisements");
                if (res.data?.error?.status === 401) {
                    setUnauthorized(true);
                    return;
                }
                setAds(res.data?.data || res.data || []);
            } catch (error) {
                if (error.response?.status === 401) {
                    setUnauthorized(true);
                } else {
                    setError("Failed to load advertisements.");
                    console.error("Error fetching advertisements:", error);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchAds();
    }, []);

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
    };

    const renderAds = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (unauthorized) {
            return <div>You are not authorized to view the ads. please login</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div
                className={`${layout === "grid" ? "grid grid-cols-4 gap-4" : "flex flex-col gap-4"
                    } mt-8`}
            >
                {ads.map((ad, index) => (
                    <div key={index}>

                        {layout === 'grid' && (
                            <div className="border-2 border-[#DFDFDF] rounded-lg w-[300px]">
                                <div> <img src={ad.image} alt="Logo" className="h-[217px] w-full" /></div>
                                <div className="py-[17px] px-[24px] min-h-[184px] h-full">
                                    <div>
                                        <div className="font-normal text-sm font-jakarta text-[#666666]">Paris <span>.</span> 1 day ago </div>
                                        <div className="text-base font-semibold font-jakarta pt-1">{ad.title}</div>
                                        <div className="text-base font-semibold font-jakarta">{ad.description}</div>
                                    </div>
                                    <div className="flex justify-between mt-[10px]">
                                        <div className="text-[#F50963] font-semibold text-lg">${ad.price}</div>
                                        <div><img src={eye} alt="Logo" className="h-[36px] w-[36px]" /></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {layout === 'list' && (
                            <div className='p-[20px] rounded-xl'
                                style={{ boxShadow: "0px 1px 80px 12px #1A28440F", }}>
                                <div className='flex gap-[20px] '>
                                    <div>
                                        <img src={ad?.image} alt="user" className="w-[150px] h-[165px] rounded-[12px]" />
                                    </div>
                                    <div className="flex w-full justify-between">
                                        <div>
                                            <div className='font-medium font-jakarta text-xl'>{ad?.title}</div>
                                            <div className='tetx-[#667085] font-jakarta text-base font-normal pt-[9px]'>{ad.description}</div>
                                            <div className='font-medium text-xl font-jakarta pt-[20px] text-[#F50963]'>${ad?.price}</div>
                                        </div>
                                        <div><img src={eye} alt="Logo" className="h-[36px] w-[36px]" /></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen h-full px-32 pt-[80px] pb-[100px]">
            <div className=" flex justify-between w-full">
                <div className="w-full">
                    <div className="flex items-center h-full ">
                        <div className="text-[52px] leading-[70px] font-semibold">
                            Get daily thing <br />
                            in same <span className="text-[#D3D3D3]">platform</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[10px] w-full">
                    <img
                        src={girl}
                        alt="Logo"
                        className="lg:w-[314px] lg:h-[500px] w-20 h-auto"
                    />
                    <div className="flex flex-col gap-[10px]">
                        <img
                            src={number}
                            alt="Logo"
                            className="lg:w-[300px] lg:h-[190px] w-20 h-auto"
                        />
                        <img
                            src={mobile}
                            alt="Logo"
                            className="lg:w-[300px] lg:h-[300px] w-20 h-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="font-semibold text-sm font-jakarta text-[#F50963] flex justify-center mt-[140px]">
                WHAT'S NEW
            </div>
            <div className="mt-1 text-[28px] font-semibold flex justify-center">
                Fresh recommendations
            </div>

            <div className="flex justify-between mt-[58px]">
                <div className="text-2xl font-semibold font-jakarta"> <span className="text-[#F50963]">{ads.length}</span> Items</div>
                <div className="flex gap-2">
                    <img src={grid} alt="Logo" className={`${layout === 'grid' ? "border-4 border-red-500 rounded-3xl" : ""} w-[40px] h-[40px] `} onClick={() => handleLayoutChange("grid")} />
                    <img src={list} alt="Logo" className={`${layout === 'list' ? "border-4 border-red-500 rounded-3xl" : ""} w-[40px] h-[40px] `} onClick={() => handleLayoutChange("list")} />
                </div>

                {/* <div>
                    <button
                        onClick={() => handleLayoutChange("grid")}
                        className={`${layout === "grid" ? "bg-gray-300" : "text-gray-600"} px-4 py-2 rounded-md mr-2`} > Grid
                    </button>
                    <button
                        onClick={() => handleLayoutChange("list")}
                        className={`${layout === "list" ? "bg-gray-300" : "text-gray-600"} px-4 py-2 rounded-md`}  > List
                    </button>
                </div> */}
            </div>
            {renderAds()}
        </div>
    );
};

export default PublicAdvertisements;

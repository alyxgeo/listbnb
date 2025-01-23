import React, { useState } from 'react';
import api from '../services/api';


const PostAds = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    try {
      const response = await api.post('/api/advertisements', formData);
      if (response.status === 201) {
        alert('Advertisement created successfully!');
        setFormData({
          title: '',
          description: '',
          image: '',
          price: ''
        });
      }
    } catch (error) {
      if (error.response.status === 401) {
        alert('Unauthorized: Invalid or missing JWT.');
      } else if (error.response.status === 403) {
        alert('Forbidden: Invalid x-api-key.');
      } else {
        alert('An error occurred while creating the advertisement.');
      }
    }
  };

  return (
    <div className='h-full rounded-xl'
      style={{
        boxShadow: "0px 1px 80px 12px #1A28440F",
      }}
    >
      <form onSubmit={handleSubmit} className='w-[544px] m-auto pt-[60px] flex flex-col gap-[22px]'>

        <div className="flex flex-col w-full">
          <label className="text-gray-700 font-medium mb-1">Ad Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Type here"
            className="pl-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-gray-700 font-medium mb-1">Description <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Type here"
            className="pl-4 py-2 border h-[140px] rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-gray-700 font-medium mb-1">Image URL <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Type here"
            className="pl-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-gray-700 font-medium mb-1">Price <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Type here"
            className="pl-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 rounded-3xl h-[50px] bg-[#F50963] text-white font-semibold text-sm"
        >Save</button>

      </form>
    </div>
  );
}

export default PostAds;
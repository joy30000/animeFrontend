import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SearchResult() {

  const location = useLocation();
  const [category, setCategory] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // First useEffect to update the category state from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryValue = params.get('category'); // Extract the 'category' parameter
    if (categoryValue) {
      setCategory(categoryValue); // Update the state with the new category
    }
  }, [location.search]); // Run when location.search (URL query) changes
  //http://127.0.0.1:5000/home/search
  // Second useEffect to make the API call after category is updated
  useEffect(() => {
    if (category!=="") {
      //console.log('Category value updated:', category); // Debugging: Log the updated category
      axios
        // .get(`http://127.0.0.1:5000/home/search?name=${category}`)
        .get(`https://animewebsite-emwh.onrender.com/home/search?name=${category}`)
        .then((response) => {
          //console.log('API Response:', response.data); // Debugging: Log the response data
          setData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to load data.');
          setLoading(false);
        });
    }
  }, [category]);

  if (loading) {
    return <div className='text-white'>Loading...</div>;  // Show loading text while waiting for data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if data fetching fails
  }

  // Check if the expected data is present
  if (!data)  {
    return <div className='text-white'>No data available.</div>;  // Show message if no data or actionMovies
  }

  return (
    <>
    <style>
        {`
        @media (max-width: 480px) {
            
            #slider_popular{
              grid-template-columns: auto auto;
            }
        }
        `}
    </style>
    {/* <div>SearchResult</div>
     <div>SearchResult</div> */}
    {/* // <!-- --------------------------SEARCH RESUTS----------------------------------------------------- --> */}
    {/* // <!-- Card Slider Wrapper LATEST UPDATED ANIME --> */}
    <section className='popular relative w-full overflow-x-hidden mt-4 flex flex-col items-center justify-center'>
  
      <h1 className='font-semibold text-white text-2xl ml-6'>Search Results: { category}</h1>
      {/* {% if searchData|length > 0 %} */}
      {/* <!-- Cards Container (Scrollable) --> */}
 
      <div id='slider_popular' className='grid grid-cols-3 gap-4 overflow-x-auto p-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6' style={{scrollBehavior: 'smooth'}}>
       
       


        {data.map((anime, index) => (
        <Link key={index} className=' bg-[#2f2f2f] h-[fit-content] w-[fit-content] rounded-lg block transition-transform duration-300 ease-in-out transform hover:scale-[1.2] hover:z-50 '
          to={`/anime_detail?category=${anime.link}`}>
          <div className='flex-none w-[20vh] h-[28vh] bg-blue-500 text-white rounded-lg p-4 shadow-lg bg-cover'
          style={{ backgroundImage: `url(${anime.img})` }}>
          </div>
          <h3 className='p-2 w-[20vh]  h-[10vh] overflow-hidden font-semibold text-white '>{ anime.title }</h3>
          <div className='p-2 flex justify-between mt-1 text-white '>
            <p className='w-8 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ anime.language }</p>
            <p className='w-[fit-content] text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ anime.series }</p>
          </div>
  
        </Link>
  ))} 


      
        
  
      </div> 


      {/* {% else %} */}
        {/* <div className='w-[fit-content]  flex flex-col items-center mt-[6.8rem]'>
          <img src='/static/images/bond.jpg' alt='nothing found' className=' h-[22vh]'>
        <h1 className='text-3xl text-red-500 text-nowrap'>Nothing found!</h1>
        </div> */}
        
        {/* {% endif %} */}
      {/* <!-- Navigation Buttons -->
      <!-- <button onclick='moveSlider(-1,'slider_popular')'
        className='absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none'>
        &#10094;
      </button>
      <button onclick='moveSlider(1,'slider_popular')'
        className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none'>
        &#10095;
      </button> --> */}
  
    </section>
    </>
  )
}

export default SearchResult
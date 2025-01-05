import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Navbar from '../components/Navbar';

function Category() {
    const location = useLocation();
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Extract query parameters from the URL
    const params = new URLSearchParams(location.search);
    const categoryValue = params.get('category'); // Get the 'category' parameter
    setCategory(categoryValue);
  }, [location.search]);



  const [data, setData] = useState(null);  // State to store the data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch data from Flask API using axios
    // axios.get('http://127.0.0.1:5000/home')  // Flask API endpoint
    axios.get('https://animewebsite-emwh.onrender.com/home/') 
      .then(response => {
        console.log(response.data);  // Debugging: Log the fetched data
        setData(response.data);  // Update state with the fetched data
        setLoading(false); 
        console.log(data);
         // Set loading to false when data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div>Loading...</div>;  // Show loading text while waiting for data
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if data fetching fails
  }

  // Check if the expected data is present
  if (!data[0]) {
    return <div>No action movies available.</div>;  // Show message if no data or actionMovies
  }


  return (
    
    <>
    <style>
        {`
        @media (max-width: 480px) {
            iframe{
                height: 70vh; /* Height for smaller screens */
            }
            #slider_popular{
              grid-template-columns: auto auto;
            }
        }
        `}
    </style>

    {/* <h1 className='text-white'>Category: {category}</h1>
    <div className='text-white'>Category</div> */}

    <section className='popular relative w-full overflow-x-hidden mt-4 flex flex-col items-center justify-center mb-9'>
    <div id='slider_popular' className='h-[fit-content] grid grid-cols-3 gap-4 overflow-x-auto p-4  sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6' style={{scrollBehavior: 'smooth'}}>
    {data[0][category].map((anime,index) => (
      
        // <Link  to={`/anime_episode?url=${anime.link}`} key={index} className=' bg-[#2f2f2f] h-[fit-content] w-[fit-content] rounded-lg block transition-transform duration-300 ease-in-out transform hover:scale-[1.2] hover:z-10 '
        <Link 
        to={category === 'popular_anime' ? `/anime_episode?url=${anime.link}` : `/anime_detail?category=${anime.link}`} 
        key={index} 
        className='bg-[#2f2f2f] h-[fit-content] w-[fit-content] rounded-lg block transition-transform duration-300 ease-in-out transform hover:scale-[1.2] hover:z-10'
      >
        
        {/* href=''> */}
        <div className='flex-none w-[20vh] h-[28vh] bg-blue-500 text-white rounded-lg p-4 shadow-lg bg-cover'
         style={{backgroundImage: `url(${ anime.img })`  }}>
        </div>
        <h3 className='p-2 w-[20vh]  h-[9vh] overflow-hidden font-semibold text-white '>{ anime.title }</h3>
        <div className='p-2 flex justify-between mt-1 text-white '>
          <p className='w-8 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ anime.language }</p>
          <p className='w-[fit-content] text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'>{ anime.series }</p>
        </div>

      </Link>

    ))}
    </div>
    </section>    
    </>
    
  )
}

export default Category
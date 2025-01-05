import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import bgImage from '../assets/images/animebackend.png'
import playButton from '../assets/images/play-512-removebg-preview.webp'

function AnimeDetail() {

  const location = useLocation();
  const [category, setCategory] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [url, seturl] = useState('');

  // First useEffect to update the category state from query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryValue = params.get('category'); // Extract the 'category' parameter
    if (categoryValue) {
      setCategory(categoryValue); // Update the state with the new category
    }
  }, [location.search]); // Run when location.search (URL query) changes

  // Second useEffect to make the API call after category is updated
  useEffect(() => {
    if (category) {
      //console.log('Category value updated:', category); // Debugging: Log the updated category
      axios
        //.get(`http://127.0.0.1:5000/home/anime_detail?url=${category}`)
        .get(`https://animewebsite-emwh.onrender.com/home/anime_detail?url=${category}`)
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
  if (!data[0] || !data[0].Similar_Anime_List) {
    return <div className='text-white'>No data available.</div>;  // Show message if no data or actionMovies
  }

  return (
    <>
      <style>
        {`
                    .genxed {
                        margin-top: 5vh;
                    }

                    .genxed a {
                        background-color: #2f2f2f;
                        border-radius: 5px;
                        padding: 2px;
                        font-size: 14px;
                        margin-left: 2vh;
                    }

                    .spe span{
        
                        border-radius: 3px;
                        color: #d4cabb;
                        padding: 3px;
                        display: block;
                    }

                    ul {
                        color: white;
                        display: grid;
                        grid-template-columns: auto;
                        gap: 55px;
                    }

                    li a {
                        border-bottom: 2px solid #2f2f2f;
                        display: flex;
                        justify-content: space-between;
                        padding: 2px 0px 2px 0px;
                    }

                    .epl-num{
                        color: #e50914;
                        font-weight: 700;
                        margin-right: 7px;
                    }

                     .status{
                        background-color: #e50914;
                        margin-right: 7px;
                        border-radius: 5px;
                    }
                `}
      </style>


      {/* <h1 className='text-white' >chutiye:{category}</h1> */}
      <div className='bg-[#141414] flex flex-col items-center relative h-[fit-content]' style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='absolute inset-0 bg-black opacity-75 '></div>
        <div className='w-full  bg-[#141414] z-50 sm:w-4/5 md:w-3/5'>

          {data.map((item, index) => (
            //---------------- cover image----------------------------------------
            <div>
              <section className='relative'>
                <div className=' border-2 border-red-500    bg-cover bg-center  w-full h-[40vh] flex items-center justify-center sm:h-[60vh] md:h-[70vh] lg:h-[80vh] '
                  style={{ backgroundImage: `url(${item.cover_img})` }}>
                  <img src={item.img} alt='No Preview' className='text-red-600  bg-black border-4 border-[#e50914] h-[30vh] md:h-[50vh]' />
                </div>
                <div className='fadeBottom' style={{ height: '120px', background: 'linear-gradient(180deg, transparent, rgba(37, 37, 37, .61), #141414)', position: 'absolute', left: '0', bottom: '0', width: '100%' }}></div>
              </section>

              {/*----------------- Anime detail--------------------------------------------------  */}

              <section className='text-white p-2'>
                {/* <h1 id='h1-border' class='font-bold text-2xl z-50 underline  underline-offset-8 sm:text-3xl md:text-4xl lg:text-3xl'>{item.title}</h1> */}
                <h1 id='h1-border' class='font-bold text-1xl z-50 underline  underline-offset-8 sm:text-2xl '>{item.title}</h1>
                {/* <div dangerouslySetInnerHTML={{ __html: item.genres }} /> */}
                <div className='mt-4 flex gap-2'>
                {data[0].genres.map((gen, index) => (
                 <Link to={`/anime_genres?category=${gen.link}`} key={index} className='text-1xl text-white bg-[#2f2f2f] px-1 rounded-sm'>{gen.text}</Link>

                ))}
                </div>  
                <a href='#episodes' ><h2 className='font-bold bg-white text-black p-2  text-1xl text-center mt-8 flex items-center justify-center'><img className='mr-2 w-5 h-5' src={playButton} alt="" />Play Now</h2></a>
                <h2 className='mt-5 text-[14px]' dangerouslySetInnerHTML={{ __html: item.status }} />
                <h2 class='font-bold text-white text-2xl  underline decoration-red-800 mt-[5vh]'>Synopsis {item.title} </h2>
                <div style={{ width: '100%', height: '10vh', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: item.description }} />
                <hr className='border-[#b6b3b3] mt-[5vh]'></hr>
              </section>

              {/*-------------------------- Episodes ---------------------------------------------*/}

              <section id='episodes' className='p-2 w-full flex flex-col justify-center items-center'>
                <h1 className='font-bold text-white  text-3xl  underline decoration-red-800'>Episodes</h1>
                <div className='mt-5 mb-9 w-full'>
                  {/* <div className='w-full text-white mt-8  h-[70vh] overflow-auto' dangerouslySetInnerHTML={{ __html: item.episodes }} /> */}
                  {data[0].episodes.map((ep, index) => (
                    <Link to={`/anime_episode?url=${ep.url}`}>
                    <div key={index} className='flex gap-3 mt-2 items-center justify-between'>
                     <div className='text-white'>{ep.episode_number}</div>
                     <div className='text-white'>{ep.release_date}</div>
                     <div className='text-white bg-red-700 rounded-md px-2'>{ep.sub_status}</div>
                     
                     {/* <div className='text-white'>{ep.title}</div> */}
                     
                     </div>
                     </Link>
                    ))}
                </div>
              </section>

            </div>

          ))}


          {/* ---------------------------------Snimilar anime---------------------------------------------- */}
          <section className='popular relative w-full overflow-x-hidden mt-4'>
            <h1 className='font-semibold text-white text-3xl ml-6 underline decoration-red-800'>Similar Anime</h1>
            {/*------------------------ card container------------------------------------ */}
            <div id='slider_popular' class='flex gap-4 overflow-x-auto p-4 ' style={{ scrollBehavior: 'smooth' }}>
              {data[0].Similar_Anime_List.map((sanime, index) => (
                // ---------------------------card----------------------------------------
                <Link  to={`/anime_detail?category=${sanime.link}`} key={index} className=' bg-[#2f2f2f] h-[fit-content] w-[fit-content] rounded-lg block transition-transform duration-300 ease-in-out transform hover:scale-[1.2] ' href=''>
                  <div className='flex-none w-[20vh] h-[28vh] bg-blue-500 text-white rounded-lg p-4 shadow-lg bg-cover' style={{ backgroundImage: `url(${sanime.img})` }}></div>
                  <h3 className=' w-[20vh] p-2  h-[7vh] overflow-hidden font-semibold text-white '> {sanime.title}</h3>
                  <div className='p-2 flex justify-between mt-1 text-white '>
                    <p className='w-8 text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'> {sanime.language}</p>
                    <p className='w-[fit-content] text-center p-1 font-bold rounded-md text-[12px]  bg-[#e50914]'> {sanime.series}</p>
                  </div>
                </Link>

              ))}
            </div>
          </section>


        </div>
      </div>
    </>

  )
}

export default AnimeDetail
// import React from 'react'

// import { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Episode() {
    // const [data, setData] = useState(null);  // State to store the data
    // const [loading, setLoading] = useState(true);  // Loading state
    // const [error, setError] = useState(null); // To handle errors

    // useEffect(() => {
    //     // Fetch data from Flask API using axios
    //     axios.get('http://127.0.0.1:5000/home/anime_episode')  // Flask API endpoint
    //         .then(response => {
    //             console.log(response.data);  // Debugging: Log the fetched data
    //             setData(response.data);  // Update state with the fetched data
    //             setLoading(false);
    //             console.log(data);
    //             // Set loading to false when data is fetched
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //             setError('Failed to load data.');
    //             setLoading(false);
    //         });
    // }, []); // Empty dependency array means this runs once on component mount

    const location = useLocation();
    const [url, setUrl] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // First useEffect to update the category state from query parameters
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const urlValue = params.get('url'); // Extract the 'category' parameter
      if (urlValue) {
        setUrl(urlValue); // Update the state with the new category
      }
    }, [location.search]); // Run when location.search (URL query) changes
  
    // Second useEffect to make the API call after category is updated
    useEffect(() => {
      if (url) {
        //console.log('Category value updated:', category); // Debugging: Log the updated category
        axios
           //.get(`http://127.0.0.1:5000/home/anime_episode?url=${url}`)
          .get(`https://animewebsite-emwh.onrender.com/home/anime_episode?url=${url}`)
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
    }, [url]);


    if (loading) {
        return <div className='text-white'>Loading...</div>;  // Show loading text while waiting for data
    }

    if (error) {
        return <div className='text-white'>{error}</div>;  // Show error message if data fetching fails
    }

    // Check if the expected data is present
    if (!data[0]) {
        return <div className='text-white'>No data available.</div>;  // Show message if no data or actionMovies
    }
    return (

        <>
            <style>
                {`
                  .entry-title{
                     font-size: 2.5rem;
                     text-align: center;
                     color: white;  
                     text-shadow: 1px 1px 0px #e50914, 
                                  -1px -1px 0px #e50914,  
                                  1px -1px 0px #e50914, 
                                  -1px 1px 0px #e50914, 
                                  0px 1px 0px #e50914, 
                                  0px -1px 0px #e50914, 
                                  1px 0px 0px #e50914, 
                                 -1px 0px 0px #e50914;  
                   }
    
                  #desc-border {
                     color: white;
                     text-align: center;
                     text-shadow: 1px 1px 0px #535c60,
                                  1px -1px 0px #535c60,
                                  -1px 1px 0px #535c60,
                                  0px 1px 0px #535c60,
                                  0px -1px 0px #535c60,
                                  1px 0px 0px #535c60,
                                  -1px 0px 0px #535c60;
                  }

                  iframe{
                     border: 2px solid white;
                     width: 70vw;
                     height: 50vh;
                     margin-top: 3vh;
                  }

                  #mainepisode{
                     color: white;
                  }

                  #singlepisode{
                     border: 2px solid white;
                     margin-top: 3vh;
                  }

                 #episodes-page-1{
                     margin-top: 3vh;
                     display: grid;
                     grid-template-columns: auto auto auto auto;
                     gap: 1vh;
                  }
        
                 #download {
                     width:fit-content;
                     background-color: red;
                     color: white;
                     border-radius: 10%;
                     padding: 2px;
                     font-size: 1rem;
                     font-weight: 800;
                     margin-top: 3vh;
  
                 }
       

                 @media (min-width: 768px) {
                   iframe{
                     height: 70vh; /* Height for smaller screens */
                   }
                 }

                 @media (min-width: 768px) {
                   iframe{
                      height: 80vh; /* Height for smaller screens */
                   }
                 }
      `}
            </style>

           

            {data.map((anime, index) => (
                
              <div className='flex flex-col justify-center items-center p-2'>
                <h1 id="desc-border" class='font-bold text-white underline decoration-red-800' dangerouslySetInnerHTML={{ __html: anime.status }} />
                <div dangerouslySetInnerHTML={{ __html: anime.video_src }} />
                <div id='download' dangerouslySetInnerHTML={{ __html: anime.download_link }} />
              </div>


             

            ))}

{/* <ul><li data-index="0">\n<Link to="/anime_episode?url=https://9anime.org.lv/one-piece-fan-letter-episode-1/">\n<div className="epl-num\">1</div>\n<div className="epl-title\ text-white">One Piece Fan Letter Episode 1</div>\n<div className="epl-sub\"><span className="status Sub\">Sub</span></div> <div className="epl-date\">October 20, 2024</div>\n</Link>\n</li> </ul>" */}

        </>
    )
}

export default Episode
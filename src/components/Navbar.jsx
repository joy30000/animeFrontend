import React from 'react'
import { Link } from 'react-router-dom'
import  { useState } from 'react'
import hamburger from '../assets/images/hamburger-.png'
import anya from '../assets/images/anya.png'
import bond from '../assets/images/bond.png'
import detective_anya_copy from '../assets/images/detective_anya_copy-removebg-preview.png'
import home from '../assets/images/home-removebg-preview.webp'


function Navbar() {
   
        // State to control the visibility of the search box
        const [isVisible, setIsVisible] = useState(false);
      
        // Function to toggle the visibility
        const expand = () => {
          setIsVisible(prevState => !prevState);
        };

        const [searchQuery, setSearchQuery] = useState('');

        const handleInputChange = (e) => {
          setSearchQuery(e.target.value);
        };
    return (
<>
   <div className='relative bg-[#141414] px-2 w-full'>
    <div>
    <ul className='flex items-center justify-between'>
      <Link to='/homepage'><li className='hidden md:block'><img src={home} alt="" className='h-7 w-7' /></li></Link>  
        <li className='flex items-center'>
            <img src={anya}  alt="" className='h-14 w-14' />
            <h1 className='text-2xl text-red-500 font-bold md:text-3xl'>Waku! Waku!</h1>
            <img src={bond} alt="" className='h-14 w-14' />
        </li>
        <li>
        <button onClick={expand} className='text-white'><img src={detective_anya_copy } alt="" className="h-14 w-14" /></button>
      </li>
    </ul>
    
    <div id="search_box" style={{ display: isVisible ? 'block' : 'none' }} >
    {/* <form action="http://127.0.0.1:5000/home/search" method="post" className='w-full flex items-center justify-center'>
      <input type="text" id="name" className='rounded-md' name="name" />
     
       <button type="submit" className='text-white'><img src={detective_anya_copy } alt="" className='h-14 w-14' /></button>
      
    </form> */}
    <div className='w-full flex items-center justify-center'>
      {/* <input type="text" id="name" className='rounded-md' name="name"   value={searchQuery}/> */}
      <input
        type="text"
        id="name"
        className="rounded-md"
        name="name"
        value={searchQuery}
        onChange={handleInputChange} // Update search query on input change
      />
     
      <Link  to={`/search?category=${encodeURIComponent(searchQuery)}`}> <button  className='text-white'><img src={detective_anya_copy } alt="" className='h-14 w-14' /></button></Link>
      
    </div>
    {/* action="http://127.0.0.1:5000/home/search" method="post"  */}
    </div>
    </div>
    <div style={{ height: '30px', background: 'linear-gradient(0deg, transparent, rgba(37, 37, 37, .61), #141414)', position: 'absolute', left: '0', bottom: '10', width:'100%',zIndex:'50'}}></div> 
    </div>        
    {/* <Link to='/homepage' className='text-white'><img className='h-7 w-7 mt-3' src={home} alt="Homepage" /></Link>      */}
{/* <Link to='/about' className='text-white'>About</Link>
<Link to='/contact' className='text-white'>Contact</Link>
<Link to='/homepage' className='text-white'>Homepage</Link>
<Link to='/anime_detail' className='text-white'>AnimeDetail</Link>
<Link to='/anime_episode' className='text-white'>Episode</Link>
<Link to='/search' className='text-white'>Search</Link> */}



</>
)
}

export default Navbar

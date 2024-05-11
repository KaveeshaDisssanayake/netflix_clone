import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'




const TitleCards = ({title, category}) => {
    const [apiData , setApiData] = useState([]);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGZhNTQyZTE5M2YwYTg2NDI0MzkyNjU4MjM5ZDZhYiIsInN1YiI6IjY2M2QyZjQ3ODdjYmM2ZjU0ZmQ5ZDUyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6pCnHHRO7Li6Gz-p5gjgV6NJBfYu8OWht2043XpfR_I'
        }
      };
      
     useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));
  


     },[])

    



  return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" >
            {apiData.map((card,index) => {
                return <Link to={`/player/${card.id}`} className="card" key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />  
                  <p>{card.original_title}</p>  

                </Link>
            })}
               
          
        </div>
    </div>
  )
}

export default TitleCards
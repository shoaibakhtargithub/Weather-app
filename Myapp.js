import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';

import cloud from "../image/Clouds.png"
import Clear from "../image/Clear.png"
import rain from "../image/Rain.png"
import mist from "../image/mist.png"
import err from "../image/error.png"

 const Myapp = () => {
  const [search,setSearch] = useState("")
  const [data,setData] = useState()
  const [error,setError] = useState()
  const my_key = "7466292337540acc1b4e1326e1fed392"
  const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
  const handleInput = (event) =>{
    setSearch(event.target.value)
    console.log(event.target.value);
  }
  const myFun = async () =>{
    const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${my_key}&units=metric`);
    const jsonData = await get.json()
    console.log(jsonData);
    setData(jsonData)
    if(search === ""){
     // alert("Enter name")
      setError("Please Enter Name")
    }
     else if(jsonData.cod == '404' ){
      setError("Please Enter Valid Name")
    }
    else{
      setError("")
    }
    setSearch("")
  }

  return (
    <>
    <div className='container'>
     <div className='inputs'>
        <input placeholder='Enter city,Country' value={search} onChange = {handleInput}/>
        <button onClick={myFun}><i className = "fa-solid fa-magnifying-glass"></i></button>
     </div>
     <div>
      {
        error?
        <div className='errorPage'>
          <p>{error}</p>
          <img src = {err}/>
          </div>:""
      }
    {
      data && data.weather ?
      <div className='weathers'>
          <h2 className='cityName'>{data.name}</h2>
          <img src={data.weather[0].main == "Clouds"?cloud:""}/>
          <img src={data.weather[0].main == "Rain"?rain:""}/>
          <img src={data.weather[0].main == "Clear"?Clear:""}/>
          <img src={data.weather[0].main == "Mist"?mist:""}/>
          <img src={data.weather[0].main == "Haze"?cloud:""}/>
         <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
         <p className='climate'>{data.weather[0].description}</p>
        </div>:""
    }
     </div>
    </div>
    </>
  )
}
export default Myapp

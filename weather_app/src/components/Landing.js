import React, { useState } from 'react';
import axios from 'axios';

export default function Landing(){
    const [searchCity, setSearchCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const key = "4b073b2304654be9367ea51487771e8f";

    const changeSearch = (e) => {
        const {value} = e.target.value;
        setSearchCity(value);
    }

    const handleSearch = (e) => {
        if(e.key === "Enter"){
            
            console.log("hello");
            console.log(searchCity);
            // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=weatherAPI`)
            axios.get(`Requesthttps://api.weatherstack.com/current?access_key=${key}&query=New York`)
            .then(res => console.log(res.location.name))
            // .then(res => setWeatherData(res))
            .catch(error => console.log(error))
        }
    }

    return(
        <>
        <div className='main-container'>
            <div className='container'>
                <div className='heading'>
                    <h1>Weather App</h1>
                </div>
                <div className='search-container'>
                    <input
                    className='search-input'
                    type="text"
                    placeholder='Enter City Name'
                    value= {searchCity}
                    onChange={(e) => changeSearch(e)}
                    onKeyUp={handleSearch}
                    />
                </div>
                <div className='details-container'>
                    {searchCity}
                </div>

                <div className='error'>
                    <h1>Enter Valid City Name</h1>
                </div>
                <div className='last-city'>
                    <h2>Last 3 city entries</h2>
                    <p></p>
                </div>
            </div>
        </div>
        </>
    )
}
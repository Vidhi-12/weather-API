import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Landing(){
    const [searchCity, setSearchCity] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    const [err, setErr] = useState("");
    const [data, setData] = useState([]);
    const key = '4b073b2304654be9367ea51487771e8f';
    // console.log(weatherData.length);

    // const changeSearch = (e) => {
    //     const {value} = e.target.value;
    //     setSearchCity(value);
    // }

    const handleSearch = (e) => {
        if(e.key === "Enter"){
            
            // console.log("hello");
            
            const city = searchCity.toLowerCase();
            // console.log(err === "");
            const lp = localStorage.getItem('dataKey');
            // console.log("lp " + lp);

            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: {q: `${city}`},
                headers: {
                  'X-RapidAPI-Key': 'a0288d5c1fmsh81cc034c1701757p102418jsn3faa5672a1bc',
                  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
              };
              
              axios.request(options).then(function (response) {
                //   console.log(response.data);
                  setWeatherData(response.data)
                  setData(response.data.location.name)
              }).catch(function (error) {
                //   console.error(error);
                  setErr("error")
              });

            // const options = {
            //     method: 'GET',
            //     url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            //     params: {
            //       aggregateHours: '24',
            //       location: 'Washington,DC,USA',
            //       contentType: 'csv',
            //       unitGroup: 'us',
            //       shortColumnNames: '0'
            //     },
            //     headers: {
            //       'X-RapidAPI-Key': 'a0288d5c1fmsh81cc034c1701757p102418jsn3faa5672a1bc',
            //       'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            //     }
            //   };
              
            //   axios.request(options).then(function (response) {
            //       console.log(response.data);
            //   }).catch(function (error) {
            //       console.error(error);
            //   });

            // // axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=weatherAPI`)
            // axios.get(`Requesthttps://api.weatherstack.com/current?access_key=${key}&query=New York`)
            // .then(res => console.log(res.location.name))
            // // .then(res => setWeatherData(res))
            // .catch(error => console.log(error))
        }

    }

    useEffect(() => {
        localStorage.setItem('dataKey', JSON.stringify(data));
    }, [data])

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
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyUp={handleSearch}
                    />
                </div>
                <div className='details-container'>
                    {
                    (weatherData.length === 0)? 
                    (err === "")?
                        
                        <div></div>:
                        <div className='error'>
                        <h1>Enter Valid City Name</h1>
                        {/* {weatherData} */}
                    </div>
                    :
                    <div>
                    <div className='city-name'>Weather Details of City : {weatherData.location.name}</div>
                    <div>Current Temperature : {weatherData.current.temp_c} &deg;C</div>
                    <div>Temperature Range : {weatherData.current.temp_c} &deg;C to {weatherData.current.temp_c} &deg;C</div>
                    <div>Humidity : {weatherData.current.humidity} </div>
                    <div>Sea Level : {weatherData.current.wind_degree}</div>
                    <div>Ground Level : {weatherData.current.feelslike_c}</div>
                    </div> 
                    }
                    
                </div>
                
                
                {/* <div className='last-city'>
                    <h2>Last 3 city entries</h2>
                    <p></p>
                </div> */}
            </div>
        </div>
        </>
    )
}
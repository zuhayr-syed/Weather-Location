import React, { useState } from 'react'; // bring useState (hook function)
import { render } from 'react-dom';
const api = {
  key: "b450e136dc40317c4452f82118b7566b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState(''); // 
  const [weather, setWeather] = useState({}); // to grab the weather

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) // fetch weather from api base (api request)
        .then(res => res.json()) // get the json from the response
        .then(result => {
          setWeather(result); // set weather to result
          setQuery(''); //  set query to empty string after
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]; // to retrive the day (returns number between 0-6) and gets the day of the week from array
    let date = d.getDate(); // gets the day number
    let month = months[d.getMonth()]; // to retrive the month (returns number between 0-11) and gets the month from array
    let year = d.getFullYear(); // gets the year

    return `${day} ${date} ${month} ${year}` // return the current date
  }
 
  return (

    // ensure search queryw is not undefined, then checking for the type of weather and showing a certain background
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 0) ? 'app cold' : 'app')  : 'app'}>
      
      <main> 
      <div className="title">
        Temperature Finder
      </div>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search A Destination..."
            onChange={e => setQuery(e.target.value)} // get value of input
            value={query} // bind the value
            onKeyPress={search} // when searching
          />
        </div>
        {(typeof weather.main != "undefined") ? ( // if it is not undefined then run
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div> {/* returns city, country */}
            <div className="date">{dateBuilder(new Date())}</div> {/* return the current date */}
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c {/* grabs the temperature and rounds it */}
            </div>
            <div className="weather">{weather.weather[0].main}</div> {/* returns the type of weather */}
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
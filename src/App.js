
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [inputVal, setInputVal] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  let [errtype, seterrtype] = useState('Please Enter Valid Location Name.');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getInput = (e) => {
    setInputVal(e.target.value);
  }

  const getData = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetch(`http://api.weatherapi.com/v1/current.json?key=d07a28b384c84e3d9e5154310240802&q=${inputVal}&aqi=yes`)
      .then((res) => {
        if (!res) {
          if (res.error.code === 1006 || res.status === 404) {
            setError('Please enter a valid location');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        return res.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        seterrtype('No matching location found.')
        console.error('Error fetching data:', error);
      });

    setInputVal('');
  }

  useEffect(() => {
    if (weatherData) {
      console.log('Weather data:', weatherData);
      // Here you can update the HTML content based on the weatherData
      // For example:
      // document.getElementById('country').innerText = weatherData.location.country;
    }
  }, [weatherData]);
  // console.log(wDetails.location.country);
  // console.log(inputVal);
  return (
    <div className="App">

      <div className='outercontainer'>
        <form className='inputsection' onSubmit={getData}>
          <input type='text' value={inputVal} onChange={getInput} className='inp' />

          <button className='submitbtn'>Submit</button>
        </form>
        <div className='outputsection'>

          <div className='Card'>
            <h1>Whether Report</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {(weatherData) ? <table className='CardTable'>
              {/* By default <thead></thead> element kept every thin in center */}

              <thead>
                <tr>
                  <th>Options</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Country:</td>
                  <td>{weatherData.location.country}</td>
                </tr>

                <tr>
                  <td>Region:</td>
                  <td>{weatherData.location.region}</td>
                </tr>
                <tr>
                  <td>Name:</td>
                  <td>{weatherData.location.name}</td>
                </tr>
                <tr>
                  <td>Lat/Lon::</td>
                  <td>{weatherData.location.lat}, {weatherData.location.lon}</td>
                </tr>

                <tr>
                  <td>Local Time:</td>
                  <td>{weatherData.location.localtime}</td>
                </tr>


                <tr>
                  <td>Time Zone ID:</td>
                  <td>{weatherData.location.tz_id}</td>
                </tr>


                <tr>
                  <td>Text:</td>
                  <td>{weatherData.current.condition.text}</td>
                </tr>

                <tr>
                  <td>Temparature(&deg;C):</td>
                  <td>{weatherData.current.temp_c} &deg;C</td>
                </tr>
                <tr>
                  <td>Temparature(&deg;F):</td>
                  <td>{weatherData.current.temp_f} &deg;F</td>
                </tr>

                <tr>
                  <td>Wind speed(KPH):</td>
                  <td>{weatherData.current.wind_kph} KPH</td>
                </tr>


                <tr>
                  <td>Particulate matter(10):</td>
                  <td>{weatherData.current.air_quality.pm10}</td>
                </tr>

              </tbody>

            </table>
              :
              <h2>{errtype}</h2>

            }


          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

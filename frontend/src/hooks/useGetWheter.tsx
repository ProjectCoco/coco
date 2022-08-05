import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function useGetWheter() {
  const [weather, setWeather] = useState('');
  const [iconUrl, setIconUrl] = useState<string>();
  useEffect(() => {
    async function onGeoOk(position: GeolocationPosition) {
      const lat = Math.floor(position.coords.latitude);
      const lng = Math.floor(position.coords.longitude);
      const API_KEY = process.env.REACT_APP_WHETHER_API_KEY;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
      );
      setWeather(res.data.weather[0].main);
      setIconUrl(
        `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
      );
      console.log(res);
    }

    function onGeoError() {
      alert("Can't find you. No weather for you.");
    }
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, [weather, iconUrl]);

  return { weather, iconUrl };
}

export default useGetWheter;

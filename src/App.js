import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import defaultIcon from './assets/default_icon.png'


const kelvinToFahrenheit = (k) => {
	const f = (1.8 * (k - 273.0)) + 32.0
	return f.toFixed(1)
}

const getApiUrl = (lat, long) => {
	return 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon='
		+ long + '&appid=' + process.env.REACT_APP_API_KEY
}

const getImgUrl = (main, desc, daytime) => {
	let url = 'http://openweathermap.org/img/wn/'
	switch (main) {
		case 'Clear':
			url += '01'
			break
		case 'Clouds':
			if (desc === 'few clouds') {
				url += '02'
			} else if (desc === 'scattered clouds') {
				url += '03'
			} else {
				url += '04'
			}
			break
		case 'Rain':
			if (desc === 'freezing rain') {
				url += '13'
			} else if (desc === 'light intensity shower rain' || desc === 'shower rain'
				|| desc === 'heavy intensity shower rain' || desc === 'ragged shower rain') {
				url += '09'
			} else {
				url += '10'
			}
			break
		case 'Drizzle':
			url += '09'
			break
		case 'Thunderstorm':
			url += '11'
			break
		case 'Snow':
			url += '13'
			break
		default:
			url += '50'
	}
	/*
	if (daytime) {
		url += 'd'
	} else {
		url += 'n'
	}
	*/
	url += 'd'
	url += '@2x.png'
	return url
}

const App = () => {
	const [position, setPosition] = useState({coords: {latitude: '', longitude: ''}});
	const [gotPosition, setGotPosition] = useState(false)
	const [positionName, setPositionName] = useState("Loading")
	const [currentTemp, setCurrentTemp] = useState("Loading")
	const [currentMain, setCurrentMain] = useState("Loading")
	const [imgUrl, setImgUrl] = useState(`url(${defaultIcon})`)
	const [day, setDay] = useState(false)

	useEffect(() => {
		if (!gotPosition && position.coords.latitude !== '') {
			const hour = new Date().getHours()
			if (hour >= 6 && hour <= 21) {
				setDay(false)
			} else {
				setDay(false)
			}
				
			fetch(getApiUrl(position.coords.latitude, position.coords.longitude))
				.then((res) => res.json())
				.then((res) => {
					setPositionName(res.name)
					setCurrentTemp(kelvinToFahrenheit(res.main.temp))
					setCurrentMain(res.weather[0].main)
					setImgUrl(getImgUrl(res.weather[0].main, res.weather[0].description, day))
				})
				.catch((err) => console.log(err))
			setGotPosition(true)
		}
	});


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setPosition);
	} else {
		return <h1>Location not available</h1>
	}

	return (
		<div className='App' style={{backgroundColor: day ? 'lightskyblue'
			: 'darkslateblue', color: day ? 'black' : 'white'}}>
			<h1>{positionName}</h1>
			<h3>{currentTemp + " F"}</h3>
			<h3>{currentMain}</h3>
			<img src={imgUrl} alt={currentMain} />
		</div>
	);
}

export default App;

import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import defaultIcon from './assets/default_icon.png'
import { getApiUrl, getImgUrl } from './utils'
import cityList from './city_list'

cityList.unshift('Current Location')

const App = () => {
	const [position, setPosition] = useState({coords: {latitude: '', longitude: ''}});
	const [city, setCity] = useState('Current Location')
	const [positionName, setPositionName] = useState('')
	const [imgUrl, setImgUrl] = useState(`url(${defaultIcon})`)
	const [day, setDay] = useState(true)
	const [units, setUnits] = useState('F')

	const [tempStr, setTempStr] = useState('')
	const [weatherStr, setWeatherStr] = useState('')

	const unitOptions = ['F', 'C']
/*
	useEffect(() => {
		if (!gotPosition && position.coords.latitude !== '') {
			const hour = new Date().getHours()
			if (hour >= 6 && hour <= 21) {
				setDay(true)
			} else {
				setDay(false)
			}
			const metric = units === 'C'
			fetch(getApiUrl(position.coords.latitude, position.coords.longitude, metric))
				.then((res) => res.json())
				.then((res) => {
					setPositionName(res.name)
					setWeatherStr(res.weather[0].main)
					setImgUrl(getImgUrl(res.weather[0].main, res.weather[0].description, day))
					setTempStr(res.main.temp.toFixed(1) + ' \u00b0' + units)
				})
				.catch((err) => console.log(err))
			setGotPosition(true)
		}
	});
	*/

	const handleSubmit = (e) => {
		e.preventDefault()
		const metric = units === 'C'
		fetch(getApiUrl(position.coords.latitude, position.coords.longitude, metric, city))
			.then((res) => res.json())
			.then((res) => {
				setPositionName(res.name)
				setWeatherStr(res.weather[0].main)
				setImgUrl(getImgUrl(res.weather[0].main, res.weather[0].description))
				setTempStr(res.main.temp.toFixed(1) + ' \u00b0' + units)
				const localDate = new Date()
				const UTCseconds = (localDate.getTime() + localDate.getTimezoneOffset() * 60 * 1000) / 1000;
				const unixTime = UTCseconds + res.timezone
				const date = new Date(unixTime * 1000)
				const hour = date.getHours()
				if (hour >= 6 && hour <= 20) {
					setDay(true)
				} else {
					setDay(false)
				}
			})
			.catch((err) => console.log(err))
	}


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setPosition);
	} else {
		return <h1>Location not available</h1>
	}

	return (
		<div className='App' style={{backgroundColor: day ? 'lightblue'
			: 'darkslateblue', color: day ? 'black' : 'white'}}>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
				<Row>
					<Col xs={2}>
						<Form.Control size="lg" as="select" value={units} onChange={e => setUnits(e.target.value)}>
							{unitOptions.map((e, i) => <option key={i}>{e}</option>)}
						</Form.Control>
					</Col>
					<Col>
						<Form.Control size="lg" as="select" value={city} onChange={e => setCity(e.target.value)}>
							{cityList.map((e, i) => <option key={i}>{e}</option>)}
						</Form.Control>
					</Col>
					<Col xs={2}>
						<Button type="submit">Get Weather</Button>
					</Col>
				</Row>
				</Form.Group>
			</Form>
			<h1>{positionName}</h1>
			<h3>{tempStr}</h3>
			<h3>{weatherStr}</h3>
			<img src={imgUrl} alt={weatherStr} />
		</div>
	);
}

export default App;

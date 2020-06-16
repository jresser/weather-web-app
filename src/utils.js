export const getApiUrl = (lat, lon, metric) => {
  let units
  if (metric) {
    units = 'metric'
  } else {
    units = 'imperial'
	}
	return 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' 
		+ lon + '&exclude=minutely,hourly&units=' + units + '&appid=' + 
		process.env.REACT_APP_API_KEY
}

export const getImgUrl = (main, desc) => {
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
	// changes icon by time (contrast suffers)
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
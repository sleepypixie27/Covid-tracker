import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import './Chart.css';

const Chart = ({ data: {confirmed, recovered, deaths}, country }) => {
	const [dailyData, setDailyData] = useState([]); // alternative to `this.setState` which is used in class based components.

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData()); // We set data we get from `fetchDailyData()` to `dailyData`
		}

		

		fetchAPI();
	}, [])

	const lineChart = (
		dailyData.length ?
		(<Line
			data={{
				labels:dailyData.map(({ date }) => date),
				datasets: [{
					data: dailyData.map(({ confirmed }) => confirmed),
					label: 'Infected',
					borderColor: '#3333ff',
					fill: true
				},
				{
					data: dailyData.map(({ deaths }) => deaths),
					label: 'Deaths',
					borderColor: 'red',
					backgroundColor: 'rgba(255, 0, 0, 0.5)',
					fill: true
				}]
			}}
		/>) : null
	);

	const barChart = (
		confirmed ?
		(
			<Bar 
				data={{
					labels: ['Infected', 'Recovered', 'Deaths'],
					datasets: [{
						label: 'People',
						backgroundColor: [
							'rgba(0, 0, 255, 0.5)',
							'rgba(0, 255, 0, 0.5)',
							'rgba(255, 0, 0, 0.5)'
						],
						data: [confirmed.value, recovered.value, deaths.value]
					}]
				}}
				options={{
					legend: {display: false},
					title: {display: true, text: `Current country in ${country}`}
				}}
			/>
		) : null
	);

	return(
		<div className="container">
			{country ? barChart : lineChart}
		</div>
	)
}

export default Chart;
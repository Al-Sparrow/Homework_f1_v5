import React, { useState } from "react";
import axios from "axios";
// import "../styles/Forecasts.css";
// import "./Cordinates"

function Forecast() {
    const [response, setResponse] = React.useState([]);
    let [requested, weatherReq] = React.useState(false);
    let [day, oneOrMany] = React.useState(true);
    let LINK = [];
    let forecasts = [];
    let latitude
    let longitude

    function GeoFindme(){
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            })
    }
       

    console.log("Latitude in Forecast is:", latitude)
    console.log("Longitude in Forecast is:", longitude)
    
    LINK = `https://api.openweathermap.org/data/2.5/forecast?lat=${GeoFindme.latitude}&lon=${GeoFindme.longitude}&units=metric&appid=50e904d7e71047db75b8dcc7a01335ad`;
    
    function FiveDaysForecast(){
        if(day === false){
            console.log(day);
            if(requested === false){
                axios.get(LINK).then(res => {
                    setResponse(res.data.list);
                    weatherReq(true);
                });
            };
        }else{
            oneOrMany(day = false);
            console.log(day);
            if(requested === false){
                axios.get(LINK).then(res => {
                    setResponse(res.data.list);
                    weatherReq(true);
                });
            };
        };
    };

    function CurrentForecast(){
        if(day===false){
            oneOrMany(day = true);
            console.log(day);
            if(requested === false){
                axios.get(LINK).then(res => {
                    setResponse(res.data.list);
                    weatherReq(true);
                });
            };
        }else{
            console.log(day);
            if(requested === false){
                axios.get(LINK).then(res => {
                    setResponse(res.data.list);
                    weatherReq(true);
                });
            };
        };
    };

    if(day === true){
        if(response.length > 0){
            for(let i = 0; i < 7; i++) {
                forecasts.push(response[i]);
            };
        };
    }else{
        for(let i = 0; i < response.length; i+=8) {
            forecasts.push(response[i]);
        };
    };

    console.log(forecasts);

    return(
        <>
            <Button variant={"success"} onClick={() => FiveDaysForecast()} className="five_day_forecast">Узнать погоду на 5 дней</Button>
            <Button variant={"success"} onClick={() => CurrentForecast()} className="current_forecast">Узнать текущую погоду</Button>
            <Table variant='info' striped bordered hover className='forecasts'>
                <thead>
                <tr>
                    <th>Время</th>
                    <th>Температура</th>
                    <th>Облачность</th>
                    <th>Влажность</th>
                </tr>
                </thead>
                <tbody>
                {forecasts.map((forecast, index) => <tr key={forecast.dt}>
                    <td>{forecast.dt_txt.slice(10, 20).split("-").reverse().join("-")}</td>
                    <td>{forecast.main.temp} &#8451;</td>
                    <td>{forecast.weather[0].description}</td>
                    <td>{forecast.main.humidity + " %"}</td>
                </tr>)}
                </tbody>
            </Table>


        </>
    )
}

export default Forecast;
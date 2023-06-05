import type { Weather } from "../calc/data/interface";

type WeatherProps = {
  name: string;
  value: "none" | Weather;
};

export const weather: WeatherProps[] = [
  { name: "common.none", value: "none" },
  { name: "weather.sun", value: "Sun" },
  { name: "weather.rain", value: "Rain" },
  { name: "weather.sand", value: "Sand" },
  { name: "weather.snow", value: "Snow" },
];

export const strongWeather: WeatherProps[] = [
  { name: "weather.harshSun", value: "Harsh Sunshine" },
  { name: "weather.heavyRain", value: "Heavy Rain" },
  { name: "weather.strongWinds", value: "Strong Winds" },
];

import { watchStartup } from './StartupSaga'
import { watchLoginAttempt } from './LoginSaga'
import { watchWeatherRequest } from './WeatherSaga'
import { watchLocationRequest } from './MapScreenSaga'

// start the daemons
export default [
  watchStartup,
  watchLoginAttempt,
  watchWeatherRequest,
  watchLocationRequest,
]

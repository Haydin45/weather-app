import "./App.css";
import DateBody from "./component/date-body/DateBody";
import Header from "./component/header/Header";
import { HeaderProvider } from "./context/header/HeaderContext";
import { WeatherProvider } from "./context/weather/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <HeaderProvider>
          <Header />
        </HeaderProvider>

        <DateBody />
      </div>
    </WeatherProvider>
  );
}

export default App;

import "./App.css";
import Router from "./routes/Router";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <div className="app">
      {/* <AppContextProvider> */}
      <Router />
      {/* </AppContextProvider> */}
    </div>
  );
}

export default App;

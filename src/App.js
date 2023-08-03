import './App.css';
import React, {useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.c0adc1d26f61400bbd5f59118025fe98
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} country="in" category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={5} country="in" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={5} country="in" category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={5} country="in" category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={5} country="in" category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={5} country="in" category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={5} country="in" category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={5} country="in" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }


  export default App
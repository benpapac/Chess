import React from "react";
import Nav from "./Components/Nav";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BrandonsBoard from './Components/BrandonsBoard'
import BensBoard from './Components/BensBoard'
import GarysBoard from './Components/GarysBoard'
import SyedasBoard from './Components/SyedasBoard'

function App() {
  return (
		<div>
			<Nav />
			<Routes>
				<Route exact path='/brandon' element={<BrandonsBoard/>} />
				<Route exact path='/ben' element={<BensBoard/>} />
				<Route exact path='/gary' element={<GarysBoard/>} />
				<Route exact path='/syeda' element={<SyedasBoard/>} />
			</Routes>
		</div>
	);
}

export default App;

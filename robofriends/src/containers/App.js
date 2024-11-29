import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";


const App = () => {
    const [robots, setRobots] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)});
    }, [])

    const [searchfield, setSearchfield] = useState('');

    function onSearchChange(event) {
        setSearchfield(event.target.value);
    }

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return !robots.length ? 
    <h1>Loading</h1> :
(
<div className = 'tc'>
   <h1 className = 'f1'>Robofriends</h1>
   <SearchBox searchChange = {onSearchChange}/>
   <Scroll>
         <ErrorBoundry>
            <CardList robots= {filterRobots} />
        </ErrorBoundry>
   </Scroll>
</div>
);
};

export default App;
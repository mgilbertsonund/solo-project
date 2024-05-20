import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  const user = useSelector((store) => store.user);
  // const petList = useSelector((store) => store.petList);
  const dispatch = useDispatch();

  const [games, setGames] = useState([]);

  useEffect(() => {
    // dispatch({ type: 'FETCH_PETS' });

    const fetchGames = async () => {
      const options = {
        method: 'GET',
        url: 'https://baseball4.p.rapidapi.com/v1/mlb/schedule',
        params: { date: '2024-05-20' },
        headers: {
          'X-RapidAPI-Key': '1f4e95c341mshc74fe6926419f36p1b12a1jsn299cea60b005',
          'X-RapidAPI-Host': 'baseball4.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, [dispatch]);

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
        <div>
        <h2>MLB Games on 2024-05-20</h2>
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.gamePk}>
              <h3>{game.teams.away.team.name} vs {game.teams.home.team.name}</h3>
              <p>{game.venue.name}</p>
            </div>
          ))
        ) : (
          <p>Loading games...</p>
        )}
      </div>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

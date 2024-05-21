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
        url: 'https://odds-api1.p.rapidapi.com/odds',
        params: {
          matchid: 'id1500446680671',
          bookmakers: 'bet365,pinnacle,fanduel'
        },
        headers: {
          'X-RapidAPI-Key': '1f4e95c341mshc74fe6926419f36p1b12a1jsn299cea60b005',
          'X-RapidAPI-Host': 'odds-api1.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);

        // Parsing the response to consolidate game details by match ID
        const gamesObject = response.data;
        const consolidatedGames = {};

        Object.values(gamesObject).forEach(game => {
          if (!consolidatedGames[game.matchid]) {
            consolidatedGames[game.matchid] = {
              match: game.match,
              date: game.date,
              time: game.time,
              home_team: game.home_team,
              away_team: game.away_team,
              odds: []
            };
          }
          consolidatedGames[game.matchid].odds.push({
            bookie: game.bookie,
            home_2Way: game.home_2Way,
            away_2Way: game.away_2Way,
            match_url: game.match_url
          });
        });

        setGames(Object.values(consolidatedGames));
      } catch (error) {
        console.error(error);
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
            <h2>MLB Games on 2024-05-21</h2>
            {games.length > 0 ? (
              games.map((game, index) => (
                <div key={index}>
                  <h3>{game.home_team} vs {game.away_team}</h3>
                  <p>Date: {game.date}</p>
                  <p>Time: {game.time}</p>
                  {game.odds.map((odd, oddIndex) => (
                    <div key={oddIndex}>
                      <p>Bookmaker: {odd.bookie}</p>
                      <p>Home Odds: {odd.home_2Way}</p>
                      <p>Away Odds: {odd.away_2Way}</p>
                      <a href={odd.match_url} target="_blank" rel="noopener noreferrer">View Match</a>
                    </div>
                  ))}
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

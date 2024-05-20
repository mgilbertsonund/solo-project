import {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const petList = useSelector((store) => store.petList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PETS' });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {
        petList.map(pet => (
          <>
            <h3>{pet.name}</h3>
          </>
        ))
      }
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;

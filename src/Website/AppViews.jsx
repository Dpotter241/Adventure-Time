import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from './NavBar';
import { NurseryList } from '../Components/Nursery/NurseryList';
import { CharacterList } from '../Components/Character/CharacterList';
import { RetailersList } from '../Components/Retailers/RetailersList';
import { Login } from '../../auth/Login';
import { Register } from '../../auth/Register';
import { Cart } from '../Components/Cart/Cart';
import { useEffect, useState } from 'react';

export const AppViews = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const localFlowerUser = localStorage.getItem('flower_user');
    const flowerUserObject = JSON.parse(localFlowerUser);

    setCurrentUser(flowerUserObject);
  }, []);

  const incrementCartCount = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar cartCount={cartCount} />
            <Outlet />
          </>
        }
      >
        <Route path="/characters" element={<CharacterList />} />
        <Route path="/distributors" element={<DistributorList />} />
        <Route
          path="/retailers"
          element={
            <RetailersList
              currentUser={currentUser}
              incrementCartCount={incrementCartCount}
            />
          }
        />
        <Route path="/cart" element={<Cart currentUser={currentUser} />} />
      </Route>
    </Routes>
  );
};

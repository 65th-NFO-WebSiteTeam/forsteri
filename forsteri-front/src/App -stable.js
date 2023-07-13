import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import { Top } from './Top';
import { ThemeTop } from './theme/pages/ThemeTop';
import { ThemeDetail } from './theme/pages/ThemeDetails';
import { ThemeForm } from './theme/pages/ThemeForm';
import Signup from './auth/pages/Signup'; // 追加
import Login from './auth/pages/Login';
import Logout from './auth/pages/Logout';

export const apiURL = 'http://localhost:8000/api/';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} /> 
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Top />} />
            <Route
              exact
              path="/login"
              element={<Login isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} />} 
            />
            <Route
              exact
              path="/logout"
              element={<Logout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />} 
            />
            <Route
              exact
              path="/signup"
              element={<Signup onSignup={() => setIsLoggedIn(true)} />}
            />
            {isLoggedIn ? (
              <>
                <Route path="/theme" element={<ThemeTop />} />
                <Route path="/theme/:id" element={<ThemeDetail />} />
                <Route path="/theme/form" element={<ThemeForm />} />
              </>
            ) : (
              <Route path="*" element={<div>ログインしてください</div>} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

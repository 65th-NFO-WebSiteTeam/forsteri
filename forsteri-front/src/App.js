import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import { Top } from './Top';
import { ThemeTop } from './theme/pages/ThemeTop';
import { StaffThemeTop } from './theme/pages/StaffThemeTop';
import { ThemeDetail } from './theme/pages/ThemeDetails';
import { StaffThemeDetail } from './theme/pages/StaffThemeDetails';
import { ThemeForm } from './theme/pages/ThemeForm';
import Signup from './auth/pages/Signup';
import Login from './auth/pages/Login';
import Logout from './auth/pages/Logout';

export const apiURL = 'http://localhost:8000/api/';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  const handleLogin = (loggedIn, staff) => {
    setIsLoggedIn(loggedIn);
    setIsStaff(staff);
  };

  return (
    <Router>
      <div>
          <Header isLoggedIn={isLoggedIn} isStaff={isStaff} />
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Top />} />
            <Route
              exact
              path="/login"
              element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} onSetIsStaff={setIsStaff} />}
            />
            <Route
              exact
              path="/logout"
              element={<Logout isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />}
            />
            <Route exact path="/signup" element={<Signup onSignup={() => setIsLoggedIn(true)} />} />
            {isLoggedIn && isStaff ? (
              <>
                <Route path="/staff" element={<div>あなたはスタッフです！！えらい！！</div>} />
                <Route
                  path="/theme"
                  element={<StaffThemeTop isStaff={isStaff} />}  // isStaff ステートを渡す
                />
                <Route path="/theme/:id" element={<StaffThemeDetail />} />
                <Route path="/theme/form" element={<ThemeForm />} />

              </>
            ) : isLoggedIn ? (
            <>
              <Route
                path="/theme"
                element={<ThemeTop isStaff={isStaff} />}  // isStaff ステートを渡す
              />
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
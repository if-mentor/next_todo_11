"use client";

import SignUp from "./signup/page";
import Login from "./login/page";
import Top from "./top/page";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { Providers } from "./providers";

const Home = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <Providers>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Top />
                  </PrivateRoute>
                }
              />
              <Route
                path="/top"
                element={<PrivateRoute>{children}</PrivateRoute>}
              />
              <Route
                path="/create"
                element={<PrivateRoute>{children}</PrivateRoute>}
              />
              <Route
                path="/edit"
                element={<PrivateRoute>{children}</PrivateRoute>}
              >
                <Route
                  path=":id"
                  element={<PrivateRoute>{children}</PrivateRoute>}
                />
              </Route>
              <Route
                path="/show"
                element={<PrivateRoute>{children}</PrivateRoute>}
              >
                <Route
                  path=":id"
                  element={<PrivateRoute>{children}</PrivateRoute>}
                />
              </Route>
              <Route
                path="/modal"
                element={<PrivateRoute>{children}</PrivateRoute>}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Providers>
      </AuthProvider>
    </>
  );
};

export default Home;

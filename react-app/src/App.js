import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import BibleText from "./components/BibleText";
import LandingPage from "./components/LandingPage";
import PlansPage from "./components/PlansPage";
import PlansForm from "./components/PlansPage/PlansForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/read" >
            <BibleText />
          </Route>
          <Route path="/plans/custom" >
            <PlansForm />
          </Route>
          <Route path="/plans" >
            <PlansPage />
          </Route>
          <Route path="/" >
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

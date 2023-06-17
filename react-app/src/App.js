import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import BibleText from "./components/BibleText";
import LandingPage from "./components/LandingPage";
import PlansPage from "./components/PlansPage";
import PlansForm from "./components/PlansPage/PlansForm";
import PlansEditForm from "./components/PlansPage/PlansEditForm";
import PlanDetailsPage from "./components/PlansPage/PlanDetailsPage";
import NotesPage from "./components/NotesPage";
import AboutPage from "./components/AboutPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/read" >
            <BibleText />
          </Route>

          {user && <Route path="/plans/:planId/edit" >
            <PlansEditForm />
          </Route>}

          {user && <Route path="/plans/custom" >
            <PlansForm />
          </Route>}

          {user && <Route path="/plans/:planId" >
            <PlanDetailsPage />
          </Route>}

          {user && <Route path="/notes" >
            <NotesPage />
          </Route>}

          {user && <Route path="/plans" >
            <PlansPage />
          </Route>}

          <Route path="/about" >
            <AboutPage />
          </Route>

          {user && <Route exact path="/" >
            <LandingPage />
          </Route>}

          <Route path="/" >
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

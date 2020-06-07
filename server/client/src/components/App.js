import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";

// My Components for reemplacin dummy ones
import Header from "./Header";

// Dummy components
// const Header = () => <h2>Header</h2>
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header></Header>
          <Route exact={true} path="/" component={Landing}></Route>
          <Route exact path="/surveys" component={Dashboard}></Route>
          <Route path="/surveys/new" component={SurveyNew}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

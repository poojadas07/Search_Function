import React, { Component } from "react";
import AutocompletePage from './components/AutoComplete/index.js';
import TableList from './components/MainComponent/TableList';
import SearchResults from './components/SearchResults/SearchResults';
import { Route, NavLink, HashRouter} from "react-router-dom";
import './App.css';

const App = () => {
    return (
        <HashRouter>
            <div className='App'>
                <AutocompletePage />

                {/* <NavLink to="/">Table</NavLink>
                <NavLink to="/results">SearchResults</NavLink> */}

                <div className="content">
                    <Route exact path="/" component={TableList}/>
                    <Route exact path="/results" component={SearchResults}/>
                </div>

                {/* <BrowserRouter>
                    <NavLink className='nav-link' to='/results'>
                        view more
                    </NavLink>

                    <Switch>
                        <Route exact path='/' component={CompanyList} />
                        <Route exact path='/results' component={SearchResults} />
                    </Switch>
                </BrowserRouter> */}
            </div>
        </HashRouter>
        
    );
};

export default App;

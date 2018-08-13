import React from 'react';
import Units from '../Units/Units';
import Search from '../Search/Search';
import './Navbar.css'

const Navbar = props => {
  return (
    <nav>
      <ul className="navbar-wrapper">
        <li className="navbar-list-item">
          <Search
            onSearchTermChange={props.onSearchTermChange}
            onSubmitSearch={props.onSubmitSearch}
            searchTerm={props.searchTerm}
          />
        </li>
        <li className="navbar-list-item city-name">
           <span>{props.data.city}</span>
        </li>
        <li className="navbar-list-item">
          <Units changeUnit={props.changeUnit} unit={props.unit} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

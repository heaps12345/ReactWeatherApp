import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import './Graph.css'

const Graph = ({ data }) => {
  return (
    <div className="graph-wrapper">
      <div className="graph-info">
        <span>
          <i className="fa fa-arrow-left" />
        </span>
        <span>Temperature variation over 7 days</span>
        <span>
          <i className="fa fa-arrow-right" />
        </span>
      </div>
      <div className="graph">
        <Sparklines data={data}>
          <SparklinesLine color="#fe1743" />
          <SparklinesSpots style={{ fill: '#ffffff' }} />
        </Sparklines>
      </div>
    </div>
  );
};

export default Graph;

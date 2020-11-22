import React, { Component } from 'react';
import Fiction from "../../static/media/Fiction.svg";

const SearchBox = ({ value, onChange }) => {
    return ( 
        
        <input 
            type="text"
            name="query"
            className="form-control" 
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
        />
        
     );
}
 
export default SearchBox;
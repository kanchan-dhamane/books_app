import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pattern from "../static/media/Pattern.svg";
import adventure from "../static/media/Adventure.svg";
import history from "../static/media/History.svg";
import philosophy from "../static/media/Philosophy.svg";
import drama from "../static/media/Drama.svg";
import politics from "../static/media/Politics.svg";
import humour from "../static/media/Humour.svg";
import fiction from "../static/media/Fiction.svg";
import next from "../static/media/Next.svg";

class GenreGrid extends Component {
    state = {
        genres: [
          {id: 1, label: "FICTION", background: fiction},
          {id: 2, label: "DRAMA", background: drama},
          {id: 3, label: "HUMOUR", background: humour},
          {id: 4, label: "POLITICS", background: politics},
          {id: 5, label: "PHILOSOPHY", background: philosophy},
          {id: 6, label: "HISTORY", background: history},
          {id: 7, label: "ADVENTURE", background: adventure}
        ]
      }
    
      handleClick = (genre) => {
        console.log('clicked', genre.label)
      }
    
      render() {
        return (
          <div 
          className="alignCenter" 
          >
            <div
              className="row"
              style={{ backgroundImage: `url(${pattern})`}}
            >
                <div className="alignCenter col-xs-12" >
                    <h1>Gutenberg Project</h1>
                    <p>A social cataloging website that allows you to 
                        freely search its databse books, annotations and
                        reviews
                    </p>
                </div>
              
            </div>

            <div className="row">
                <div className="alignCenter col-xs-12" 
                style={{paddingTop:"10px"}}
            >
                {
                    this.state.genres.map(genre => 
                    <Link 
                        className="genreClass btn btn-lg m-2 col-md-5 noHover"
                        style={{ "background-image": `url(${genre.background}), url(${next})` }}
                        id={ genre.id } 
                        name={ genre.label }
                        to={ `/books/${genre.label.toLowerCase()}` }
                    >
                        {genre.label}
                    </Link>    
                    )
                }
              </div>
            </div>
          </div>
        );
      }
}
 
export default GenreGrid;
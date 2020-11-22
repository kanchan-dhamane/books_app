import React, { Component } from 'react';
import { getBooks, getNextPage } from '../services/bookService';
import SearchBox from './common/searchBox';
import close from '../static/media/Cancel.svg';
import search from '../static/media/Search.svg';

class BookCatlog extends Component {
    state = {  
        nextPage: null,
        prevPage: null,
        count: null,
        books: [],
        book_links: {},
        queryParam: {
            mime_type: "image",
            topic: null,
            search: null,
        },
        loading: false,
     }

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        let queryParam = {...this.state.queryParam};
        queryParam["topic"] = this.getTopicQueryParam();

        const { data } =  await getBooks(this.getQuerySting(queryParam));

        this.setState({ nextPage: data.next_page, prevPage: data.previous, count: data.count, books: data.results, queryParam });
    }

    handleOnCardclick(link, formats) {
        if (!link){
            alert("Not viewable");
            return;
        }
        window.location = link; 

    }
    
    handleScroll = async (event) => {
        
        console.log('In handel scroll', this.state.loading, this.state.nextPage); 
        const { 
            nextPage, 
            loading, 
            books 
        } = this.state;   
        
        if (!nextPage || loading) return;

        this.setState({ loading: true });

        const { data } =  await getNextPage(nextPage);
        const allBooks = [...books, ...data.results]
        console.log(data.count, data.nextPage);
        this.setState({ nextPage: data.next_page, prevPage: data.previous_page, count: data.count, books: allBooks, loading: false });
    }

    handleSearchInputChange = query => {
        let queryParam = {...this.state.queryParam};
        queryParam.search = query;
        this.setState({ queryParam });
    }

    handleApplySearch = async () => {
        const { data } =  await getBooks(this.getQuerySting(this.state.queryParam));
        console.log('handleApplySearch', data);
        this.setState({ nextPage: data.next_page, prevPage: data.previous, count: data.count, books: data.results});
    }

    handleClearSearchStr = async () => {
        let { books } = [...this.state.books];
        let queryParam = {...this.state.queryParam};
        queryParam.search = null;
        this.setState({ queryParam });
        
        const { data } =  await getBooks(this.getQuerySting(queryParam));
        books = data.results;

        this.setState({ nextPage: data.next_page, prevPage: data.previous, count: data.count, books, queryParam});
        console.log(this.state.queryParam, this.state.nextPage);
    }

    handleBackClick = () => {
        let queryParam = {...this.state.queryParam};
        queryParam.topic = null;
        this.setState({ queryParam });
        this.props.history.push('/');
    }


    getTopicQueryParam() {
        const path = this.props.location.pathname;
        return path.substring(path.lastIndexOf("/") + 1, path.length);
    }

    getQuerySting(queryParam) {
        console.log('getQuerySting', queryParam);
        let queryString = null;
        let value = null;
        for (let key in queryParam){
            value = queryParam[key];
            if (!value)
                continue;

            if (!queryString) {
                queryString = `?${key}=${value}`;
                continue;
            }

            if (key === "search"){
                value = queryParam[key].trim().split(" ").join("%20");
                console.log(value)
            }


            queryString += `&${key}=${value}`;
        }
        console.log('queryString', queryString);
        return queryString;
    }

    getAuthorsString(authors) {
        const authors_list = [];
        authors.map((author) => authors_list.push(author.name));
        return authors_list.join();
      }

    getImageLinkAndViewableFormat({ formats }){
        let imgaeLink = null;
        let htmlLink = null;
        let pdfLink = null;
        let textLink = null;
        let link = null;

        for (let type in formats) {
            if (!imgaeLink && type.includes("image")) {
                imgaeLink = formats[type];
            }
            if (htmlLink && imgaeLink) return {imgaeLink, bookLink: htmlLink};
            if (!htmlLink) {
                link = formats[type];

                if (link.endsWith('zip'))
                    continue

                if (type.includes("html")) 
                    htmlLink = formats[type];
                if (!pdfLink && type.includes("pdf"))
                    pdfLink = formats[type]
                if(!textLink && type.includes("text"))
                    textLink = formats[type]
            }   
        }
        if (!imgaeLink) return null;
        return {imgaeLink, bookLink: htmlLink};
    }

    renderCard(book) {
        let links = this.getImageLinkAndViewableFormat(book);
        if (!links) return;
       return ( 
                   
        <div className="mt-3">  
            <a  
                className="clickable" 
                onClick={() => this.handleOnCardclick(links['bookLink'], book.formats)} 
            >
                <div className="card rectangle">
                    <img 
                        className="card-img-top img-fluid h-75 w-100"
                        src={links["imgaeLink"]}
                        alt="Card image cap"
                    />
                    <p className="bookName m-2">{ book.title }</p>
                </div>
            </a>    
      </div>
    
    );
    }

    render() { 
        const { books, queryParam } = this.state;
        return ( 
            <main className="container">

                <div className="row mt-2 mb-2">
                    <div className="backImage col-1 pr-0" onClick={this.handleBackClick}>
                    </div>
                    <div className="col-6 pl-0" style={{marginLeft:"-25px"}}>
                        <h1>{ queryParam.topic }</h1>
                    </div>
                </div>

                <div className="row ml-1 mr-1">
                    <div 
                        className="clickable col-1 pr-0" 
                        onClick={this.handleApplySearch}> 
                        <img 
                            className="form-control" 
                            src={search} width="50" height="20" />
                    </div>

                    <div 
                        className="clickable col-10  pl-0 pr-0"> 
                            <SearchBox 
                                value={queryParam.search} 
                                onChange={this.handleSearchInputChange}/>
                    </div>

                    <div 
                        className="clickable col-1 pl-0" 
                        onClick={this.handleClearSearchStr}> 
                            <img 
                                className="form-control" 
                                src={close} width="50" height="20" />
                    </div>
                </div>

                <div 
                    className="card-deck">
                    {books && books.map((book) => this.renderCard(book))}
                </div>
            </main>
         );
    }
}
 
export default BookCatlog;
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import { Spinner } from './Spinner';

export class News extends Component {

    constructor() {
        super();
        console.log("Its constructor of news component") //called three times because constructor of NewsItem
        //state of card can be set here
        this.state = {
            articles: [],
            loading: true,
            page: 1
            //makng the articles parts of my state
        }
    }

    async componentDidMount() {    // is a lifecycle method    //will run after rendering render()
        // let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=8f1cff3caab24934974d588deeeec85d&page1pageSize=20";
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8f1cff3caab24934974d588deeeec85d&page1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});

        let data = await fetch(url);  //wait for fetch to return promis
        let parseData = await data.json()
        console.log(parseData)
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults,loading:false })

    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8f1cff3caab24934974d588deeeec85d&page=${this.state.page - 1}&pageSize=20`;
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8f1cff3caab24934974d588deeeec85d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);  //wait for fetch to return promis
        let parseData = await data.json()
        console.log(parseData)
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading:false
        })

    }
    handleNextClick = async () => {
        // console.log("dsdsdffsd")
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

        }
       
            // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8f1cff3caab24934974d588deeeec85d&page=${this.state.page + 1}&pageSize=20`;
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8f1cff3caab24934974d588deeeec85d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);  //wait for fetch to return promis
            let parseData = await data.json()
            // console.log(parseData)
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading:false
            })
        
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>News App- Headlines</h2>
               {this.state.loading && this.state.loading&&<Spinner/>}
                <div className='row '>
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 " key={element.url}>
                            {/* key should be given to the element which will  be returned and should be unique */}
                            <NewsItems title={element ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage}
                                newsUrl={element.url} />
                        </div>
                    })}
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News



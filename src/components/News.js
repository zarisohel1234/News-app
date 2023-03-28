import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps={
        country:'in',
        pageSize:8,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    articles = []

    capitalizeLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
        }
        document.title=`${this.capitalizeLetter(this.props.category)}`
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=602aac6fa1ce4948b2f56472eab0627c&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
    }
    
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=602aac6fa1ce4948b2f56472eab0627c&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
        this.updateNews()
    }

    prevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=602aac6fa1ce4948b2f56472eab0627c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles,page:this.state.page-1 ,loading:false})
        this.setState({
            page:this.state.page-1
        })
        this.updateNews()
    }

    nextClick = async () => {
        // if (!((this.state.page + 1) > Math.ceil(this.state.totalResults /this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=602aac6fa1ce4948b2f56472eab0627c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading:true})
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({ articles: parsedData.articles,page:this.state.page+1,loading:false })
        // }
        this.setState({
            page:this.state.page+1
        })
        this.updateNews()
    }

    render() { 
        return (
            <>
            {this.state.loading && <Spinner/>}
                <div className='container my-3'>
                    <h2 className='text-center my-3'>News Component</h2>
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((elements) => {
                            return (
                                <div className="col md-4" key={elements.url}>
                                    <NewsItem title={elements.title ? elements.title.slice(0, 50):""} desc={elements.description?elements.description.slice(0, 90) : ''} imgurl={elements.urlToImage? elements.urlToImage:''} newsurl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="container my-4 d-flex justify-content-between">
                    <button  disabled={this.state.page <= 1} type="button" className="btn btn-outline-warning" onClick={this.prevClick}>&larr; Prev</button>
                    <button  disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults /this.props.pageSize)}type="button" className="btn btn-outline-warning" onClick={this.nextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News

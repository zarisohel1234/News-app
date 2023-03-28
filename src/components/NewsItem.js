import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, desc, imgurl, newsurl, author, date, source} = this.props
        return (
            <>
                <div className='my-3'>
                    <div className="card" style={{ width: "18rem" }}>
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1'}}>{source}</span>
                        <img src={imgurl} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}... </h5>
                            <p className="card-text">{desc}...</p>
                            <p className='card-text'>Author - {!author ? "Unknown" : author}</p>
                            <p className='card-text'>at {new Date(date).toISOString()}</p>
                            <a href={newsurl} className="btn btn-info">Read More</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem

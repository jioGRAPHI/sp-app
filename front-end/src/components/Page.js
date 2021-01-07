import React, { Component } from 'react';
import '../css/page.css';

class Page extends Component {
	constructor(){
		super();
		this.state = {
			agri: [],
			aqua_res: [],
			nat_res: []
		};
	}

	showFeed() {
		fetch('http://localhost:3001/get-feed')
		.then((response) => {return response.json() })
		.then((body) => {
			console.log(body)
			this.setState({ 
				agri: body.agri,
				aqua_res: body.aqua_res,
				nat_res: body.nat_res,
			})
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
	}

	componentDidMount(){
		this.showFeed();
	}

	// componentDidUpdate(prevProps, prevState){
	// 	if (prevState.agri !== this.state.agri || prevState.aqua !== this.state.aqua || prevState.nat_res !== this.state.nat_res) {
	// 		this.showFeed();
	// 	}
	// }

	render() {
		return (
			<div className = "component">
				<div className = "component-header">
					<div className = "featured-header">
						{this.state.agri.slice(0,4).map((article) => {
							return <a className = "header-link" href = {article.link}>
										<div className = "featured-container">
											<h3 className = "header-title">{article.title} </h3>
											<h4 className = "header-tag">{article.creator}</h4>
											<img className = "header-img"/>
										</div>
									</a>
						})}
					</div>
				</div>	

				<div className = "component-body">
					<p className = "subtitle"> More Articles </p>
					<div className = "center-body">
							{this.state.agri.map((article) => {
								return <a className = "a-link" href = {article.link}>
											<div className = "center-container">
												<h3 className = "article-title">{article.title} </h3>
												<h4 className = "article-tag">Agriculture</h4>
												<img className = "article-img"/>
											</div>
										</a>
							})}

							{this.state.aqua_res.map((article) => {
								return <a className = "a-link" href = {article.link}>
											<div className = "center-container">
												<h3 className = "article-title">{article.title} </h3>
												<h4 className = "article-tag">Aquatic Resources</h4>
												<img className = "article-img"/>
											</div>
										</a>
							})}

							{this.state.nat_res.map((article) => {
								return <a className = "a-link" href = {article.link}>
											<div className = "center-container">
												<h3 className = "article-title">{article.title} </h3>
												<h4 className = "article-tag">Natural Resources</h4>
												<img className = "article-img"/>
											</div>
										</a>
							})}
					</div>
				</div>

			</div>
		);
	}
}
// <div className = "component">
			
// 				<div className = "component-header">
// 					{/<div className = "menu-bar">
// 						MENU BAR
// 					</div>}
// 				</div>	

// 				<div className = "component-body">
// 					<div className = "left-side-bar">
// 						{/<div className = "left-container">
// 							SIDE BAR
// 						</div>}
// 					</div>
// 					<div className = "center-body">
// 							{this.state.list_articles.map((article) => {
// 								return <a className = "a-link" href = {article.link}>
// 											<div className = "center-container">
// 												<h3 className = "article-title">{article.title} </h3>
// 												<p className = "article-desc">{article.description} </p>
// 											</div>
// 										</a>
// 							})}
// 					</div>
// 				</div>

// 			</div>

// <p className = "article-desc">{article.description} </p>
// <img className = "article-img" src = {article.enclosure.link}/>
export default Page;

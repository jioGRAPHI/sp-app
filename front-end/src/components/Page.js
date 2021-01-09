import React, { Component } from 'react';
import '../css/page.css';

class Page extends Component {
	constructor(){
		super();
		this.state = {
			articles: [],
			agri: [],
			aqua_res: [],
			nat_res: [],
			s_agri: [],
			s_nat: [],
			s_aqua: [],
			sidebarWidth: 0,
			bgColor: "#ffffff",
			agribgColor: "#ffffff",
			natbgColor: "#ffffff",
			aquabgColor: "#ffffff",
			agrifgColor: "#404040",
			natfgColor: "#404040",
			aquafgColor: "#404040",
			agriView: true,
			natView: true,
			aquaView: true,
			featIndx: 0,
			featOp: 1,
			featDisp: "block"
		};

		this.setFeatured = this.setFeatured.bind(this);
	}

	showFeed() {
		fetch('http://localhost:3001/get-feed')
		.then((response) => {return response.json() })
		.then((body) => {
			console.log(body)
			this.setState({ 
				articles: body.articles,
				agri: body.agri,
				aqua_res: body.aqua_res,
				nat_res: body.nat_res,
			})
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
	}

	// showSearched() {
	// 	this.setState({search: []});

	// 	fetch('http://localhost:3001/get-search')
	// 	.then((response) => {return response.json() })
	// 	.then((body) => {
	// 		console.log(body)
	// 		this.setState({ 
	// 			s_agri: body.search_agri,
	// 			s_nat: body.search_nat,
	// 			s_aqua: body.search_aqua,
	// 		})
	// 	})
	// 	.catch((error) => {
	// 		console.log('Error: ', error);
	// 	});
	// }

	componentDidMount(){
		this.showFeed();
		setInterval(() => {this.setFeatured()}, 7000);
	}

	menuClick(e) {
		const col = this.state.sidebarWidth == 0 ? "#404040" : "#ffffff";
		const val = this.state.sidebarWidth == 0 ? 20 : 0;
		this.setState({
			sidebarWidth: val,
			bgColor: col
		});
	}

	agriClick(e) {
		const val = this.state.agriView == true ? false : true;
		const bgcol = this.state.agriView == true ? "#404040" : "#ffffff";
		const fgcol = this.state.agriView == true ? "#ffffff" : "#404040";
		this.setState({
			agriView: val,
			agribgColor: bgcol,
			agrifgColor: fgcol,
		});
	}

	natClick(e) {
		const val = this.state.natView == true ? false : true;
		const bgcol = this.state.natView == true ? "#404040" : "#ffffff";
		const fgcol = this.state.natView == true ? "#ffffff" : "#404040";
		this.setState({
			natView: val,
			natbgColor: bgcol,
			natfgColor: fgcol,
		});
	}

	aquaClick(e) {
		const val = this.state.aquaView == true ? false : true;
		const bgcol = this.state.aquaView == true ? "#404040" : "#ffffff";
		const fgcol = this.state.aquaView == true ? "#ffffff" : "#404040";
		this.setState({
			aquaView: val,
			aquabgColor: bgcol,
			aquafgColor: fgcol,
		});
	}

	setFeatured(){
		var val = this.state.featIndx;
		const article_list = this.state.articles
		// if (val < article_list.length && val + 5 < article_list.length) {
		// 	val = val + 5;
		// }else{
		// 	val = 0;
		// }

		val = Math.floor(Math.random() * article_list.length);

		this.setState({
			featOp: 0
		})
		setTimeout(() => {this.setState({
			featIndx: val,
		})}, 250);

		setTimeout(() => {this.setState({
			featOp: 1
		})}, 500);

	}

	handleSearch(e){
		const val = this.state.featDisp == "block" ? "none" : "block";
		if (val == "none"){
			this.setState({
				featDisp: val,
				agriView: false,
				natView: false,
				aquaView: false,
				agribgColor: "#404040",
				agrifgColor: "#ffffff",
				natbgColor: "#404040",
				natfgColor: "#ffffff",
				aquabgColor: "#404040",
				aquafgColor: "#ffffff",
			});
		}else{
			this.setState({
				featDisp: val,
				agriView: true,
				natView: true,
				aquaView: true,
				agribgColor: "#ffffff",
				agrifgColor: "#404040",
				natbgColor: "#ffffff",
				natfgColor: "#404040",
				aquabgColor: "#ffffff",
				aquafgColor: "#404040",
			});
		}
		
	}

	render() {
		return (
			<div className = "component">

				<div className = "navbar">
					<div className = "component-sidebar">
						<div className = "component-sidebar-collapsed">
							<button className = "hammenu" onClick={this.menuClick.bind(this)}> &#9776; </button>
						</div>
						<div className = "component-sidebar-extended" style={{ width: this.state.sidebarWidth + "vw", backgroundColor: this.state.bgColor}}>
							<button className = "hammenu2" onClick={this.menuClick.bind(this)}> &times; </button>
							<a></a>
							<h4 className = "sidebar-tag">Filter</h4>
							<button className = "filter" onClick={this.agriClick.bind(this)} style={{ backgroundColor: this.state.agribgColor, color: this.state.agrifgColor}}> Agriculture </button>
							<button className = "filter" onClick={this.natClick.bind(this)} style={{ backgroundColor: this.state.natbgColor, color: this.state.natfgColor}}> Natural Resources </button>
							<button className = "filter" onClick={this.aquaClick.bind(this)} style={{ backgroundColor: this.state.aquabgColor, color: this.state.aquafgColor}}> Aquatic Resources </button>
						</div>
					</div>
					<div className = "navbar-main">
						<form>
							<input className = "search-bar" type="text" name="search" placeholder="&nbsp;Search" onFocus={this.handleSearch.bind(this)} onBlur={this.handleSearch.bind(this)}/>
							<button className = "searchbtn" onClick={this.menuClick.bind(this)}> &#x1f50e; </button>
						</form>
					</div>
				</div>

				<div className = "component-header" style={{opacity: this.state.featOp, display: this.state.featDisp}}>
					<div className = "featured-header">
						{this.state.articles.map((article, index) => {
							if(index == this.state.featIndx){
								return <a className = "header-link" href = {article.link} key={index}>
										<div className = "featured-container">
											<h4 className = "header-tag">{article.author == ""? article.author : article.creator} </h4>
											<h3 className = "header-title">{article.title} </h3>
											<h4 className = "header-date">{article.pubDate} </h4>
										</div>
									</a>
							}
						})}
					</div>
				</div>

				<div className = "component-body">
					<p className = "subtitle" style={{display: this.state.featDisp}}> More Articles </p>
					<div className = "center-body">
							{this.state.agri.map((article) => {
								if(!this.state.agriView){
									return null
								}else{
									return <a className = "a-link" href = {article.link}>
												<div className = "center-container">
													<h4 className = "article-date">{article.pubDate}</h4>
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Agriculture</h4>
													<img className = "article-img"/>
												</div>
											</a>
								}
							})}

							{this.state.aqua_res.map((article) => {
								if(!this.state.aquaView){
									return null
								}else{
									return <a className = "a-link" href = {article.link}>
												<div className = "center-container">
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Aquatic Resources</h4>
													<img className = "article-img"/>
												</div>
											</a>
								}
							})}

							{this.state.nat_res.map((article) => {
								if(!this.state.natView){
									return null
								}else{
									return <a className = "a-link" href = {article.link}>
												<div className = "center-container">
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Natural Resources</h4>
													<img className = "article-img"/>
												</div>
											</a>
								}
							})}
					</div>
				</div>

			</div>
			
		);
	}
}

export default Page;

// <div className = "component-header">
// 					<div className = "featured-header">
// 						{this.state.agri.slice(0,4).map((article, index) => {
// 							return <a className = "header-link" href = {article.link}>
// 										<div className = "featured-container">
// 											<h4 className = "header-tag">{article.creator}</h4>
// 											<h3 className = "header-title">{article.title} </h3>
// 										</div>
// 									</a>
// 						})}
// 					</div>
// 				</div>
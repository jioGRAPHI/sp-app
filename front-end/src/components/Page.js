import React, { Component } from 'react';
import '../css/page.css';

class Page extends Component {
	constructor(props){
		super(props);
		this.state = {
			articles: [],
			agri: [],
			aqua_res: [],
			nat_res: [],
			s_agri: [],
			s_nat: [],
			s_aqua: [],
			search_key: "",
			sidebarWidth: 0,
			bgColor: "#222629",
			agribgColor: "#ffffff",
			natbgColor: "#ffffff",
			aquabgColor: "#ffffff",
			agrifgColor: "#404040",
			natfgColor: "#404040",
			aquafgColor: "#404040",
			agriView: true,
			natView: true,
			aquaView: true,
			searchView: false,
			featIndx: 0,
			featOp: 1,
			featDisp: "block",
			// loading: "none",
		};

		this.setFeatured = this.setFeatured.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.searchInput = this.searchInput.bind(this);
	}

	showFeed() {
		fetch('http://localhost:3001/get-feed')
		.then((response) => {return response.json() })
		.then((body) => {
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

	searchInput(e){
		if(e.target.value === ""){
			this.setState({ search_key: e.target.value, searchView: false, loading: "none"}, () => {
				this.handleSearch();
			});
		}else{
			this.setState({ search_key: e.target.value, searchView: true, loading: "block"}, () => {
				this.handleSearch();
			});
		}
	}

	search(e) {
		if (e.key === 'Enter') {
			this.setState({loading: "none"}, () => {
				this.showSearched(this.state.search_key);
			});
		}else{
			this.setState({ 
				s_agri: [],
				s_nat: [],
				s_aqua: []
			})
		}
	}

	showSearched(term) {
		fetch('http://localhost:3001/get-search/' + term)
		.then((response) => {return response.json() })
		.then((body) => {
			this.setState({ 
				s_agri: body.search_agri,
				s_nat: body.search_nat,
				s_aqua: body.search_aqua
			})
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
	}

	componentDidMount(){
		this.showFeed();
		setInterval(() => {this.setFeatured()}, 7000);
	}

	menuClick(e) {
		const col = this.state.sidebarWidth === 0 ? "#86c232" : "#222629";
		const val = this.state.sidebarWidth === 0 ? 20 : 0;
		this.setState({
			sidebarWidth: val,
			bgColor: col
		});
	}

	agriClick(e) {
		const val = this.state.agriView === true ? false : true;
		const bgcol = this.state.agriView === true ? "#17252A" : "#ffffff";
		const fgcol = this.state.agriView === true ? "#ffffff" : "#17252A";
		this.setState({
			agriView: val,
			agribgColor: bgcol,
			agrifgColor: fgcol,
		});
	}

	natClick(e) {
		const val = this.state.natView === true ? false : true;
		const bgcol = this.state.natView === true ? "#17252A" : "#ffffff";
		const fgcol = this.state.natView === true ? "#ffffff" : "#17252A";
		this.setState({
			natView: val,
			natbgColor: bgcol,
			natfgColor: fgcol,
		});
	}

	aquaClick(e) {
		const val = this.state.aquaView === true ? false : true;
		const bgcol = this.state.aquaView === true ? "#17252A" : "#ffffff";
		const fgcol = this.state.aquaView === true ? "#ffffff" : "#17252A";
		this.setState({
			aquaView: val,
			aquabgColor: bgcol,
			aquafgColor: fgcol,
		});
	}

	setFeatured(){
		var val = this.state.featIndx;
		const article_list = this.state.articles

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
		if (this.state.searchView){
			this.setState({
				featDisp: "none", agriView: false, natView: false, aquaView: false, agribgColor: "#404040", agrifgColor: "#ffffff", natbgColor: "#404040", natfgColor: "#ffffff", aquabgColor: "#404040", aquafgColor: "#ffffff",
			});
		}else{
			this.setState({
				featDisp: "block", agriView: true, natView: true, aquaView: true, agribgColor: "#ffffff", agrifgColor: "#404040", natbgColor: "#ffffff", natfgColor: "#404040", aquabgColor: "#ffffff", aquafgColor: "#404040",
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
							<h4 className = "sidebar-tag">Filter</h4>
							<button className = "filter" onClick={this.agriClick.bind(this)} style={{ backgroundColor: this.state.agribgColor, color: this.state.agrifgColor}}> Agriculture </button>
							<button className = "filter" onClick={this.natClick.bind(this)} style={{ backgroundColor: this.state.natbgColor, color: this.state.natfgColor}}> Natural Resources </button>
							<button className = "filter" onClick={this.aquaClick.bind(this)} style={{ backgroundColor: this.state.aquabgColor, color: this.state.aquafgColor}}> Aquatic Resources </button>
						</div>
					</div>
					<div className = "navbar-main">
						<div className = "search-bar-container"><input className = "search-bar" type="text" name="search" placeholder="Enter keyword, then press Enter" value={this.state.search_key} onChange={this.searchInput.bind(this)} onKeyDown={this.search.bind(this)} /></div>
					</div>
				</div>

				<div className = "component-header" style={{opacity: this.state.featOp, display: this.state.featDisp}}>
					<div className = "featured-header">
						{this.state.articles.map((article, index) => {
							if(index === this.state.featIndx){
								return <a className = "header-link" href = {article.link} key={index}>
										<div className = "featured-container">
											<h4 className = "header-tag">{article.author === ""? article.author : article.creator} </h4>
											<h3 className = "header-title">{article.title} </h3>
											<h4 className = "header-date">{article.pubDate} </h4>
										</div>
									</a>
							}else{
								return null
							}
						})}
					</div>
				</div>

				<div className = "component-body">
					<p className = "subtitle" style={{display: this.state.featDisp}}> MORE ARTICLES </p>
					<div className = "center-body">
							{this.state.agri.map((article, key) => {
								if(!this.state.agriView){
									return null
								}else{
									return <a className = "a-link" href = {article.link} key = {key}>
												<div className = "center-container">
													<h4 className = "article-date">{article.pubDate}</h4>
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Agriculture</h4>
												</div>
											</a>
								}
							})}

							{this.state.aqua_res.map((article, key) => {
								if(!this.state.aquaView){
									return null
								}else{
									return <a className = "a-link" href = {article.link} key = {key}>
												<div className = "center-container">
													<h4 className = "article-date">{article.pubDate}</h4>
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Aquatic Resources</h4>
												</div>
											</a>
								}
							})}

							{this.state.nat_res.map((article, key) => {
								if(!this.state.natView){
									return null
								}else{
									return <a className = "a-link" href = {article.link} key = {key}>
												<div className = "center-container">
													<h4 className = "article-date">{article.pubDate}</h4>
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Natural Resources</h4>
												</div>
											</a>
								}
							})}


							{this.state.s_agri.map((article, key) => {
								if(!this.state.searchView){
									return null
								}else{
									return <a className = "a-link" href = {article.link} key = {key}>
												<div className = "center-container">
													<h4 className = "article-date">{article.pubDate}</h4>
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Agriculture</h4>
												</div>
											</a>
								}
							})}

							{this.state.s_aqua.map((article, key) => {
								if(!this.state.searchView){
									return null
								}else{
									return <a className = "a-link" href = {article.link} key = {key}>
												<div className = "center-container">
													<h4 className = "article-date">{article.pubDate}</h4>
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Aquatic Resources</h4>
												</div>
											</a>
								}
							})}

							{this.state.s_nat.map((article, key) => {
								if(!this.state.searchView){
									return null
								}else{
									return <a className = "a-link" href = {article.link} key = {key}>
												<div className = "center-container">
													<h4 className = "article-date">{article.pubDate}</h4>
													<h3 className = "article-title">{article.title} </h3>
													<h4 className = "article-tag">Natural Resources</h4>
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

						// <button className = "searchbtn" type="submit" onClick={this.showSearched.bind(this)}><text>&#9906;</text></button>

// <div className="loader" style={{display: this.state.loading}}></div>
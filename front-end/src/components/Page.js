import React, { Component } from 'react';
import '../css/page.css';

class Page extends Component {
	constructor(){
		super();
		this.state = {
			agri: [],
			aqua_res: [],
			nat_res: [],
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
			agriDisp: "relative",
			natDisp: "relative",
			aquaDisp: "relative",
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
		const disp = this.state.agriView == true ? "none" : "relative";
		this.setState({
			agriView: val,
			agribgColor: bgcol,
			agrifgColor: fgcol,
			agriDisp: disp,
		});
	}

	natClick(e) {
		const val = this.state.natView == true ? false : true;
		const bgcol = this.state.natView == true ? "#404040" : "#ffffff";
		const fgcol = this.state.natView == true ? "#ffffff" : "#404040";
		const disp = this.state.natView == true ? "none" : "relative";
		this.setState({
			natView: val,
			natbgColor: bgcol,
			natfgColor: fgcol,
			natDisp: disp,
		});
	}

	aquaClick(e) {
		const val = this.state.aquaView == true ? false : true;
		const bgcol = this.state.aquaView == true ? "#404040" : "#ffffff";
		const fgcol = this.state.aquaView == true ? "#ffffff" : "#404040";
		const disp = this.state.aquaView == true ? "none" : "relative";
		this.setState({
			aquaView: val,
			aquabgColor: bgcol,
			aquafgColor: fgcol,
			aquaDisp: disp,
		});
	}

	render() {
		const view1 = this.state.agriView;
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
							<h4 className = "sidebar-tag">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Filter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
							<button className = "filter" onClick={this.agriClick.bind(this)} style={{ backgroundColor: this.state.agribgColor, color: this.state.agrifgColor}}> Agriculture </button>
							<button className = "filter" onClick={this.natClick.bind(this)} style={{ backgroundColor: this.state.natbgColor, color: this.state.natfgColor}}> Natural Resources </button>
							<button className = "filter" onClick={this.aquaClick.bind(this)} style={{ backgroundColor: this.state.aquabgColor, color: this.state.aquafgColor}}> Aquatic Resources </button>
						</div>
					</div>
					<div className = "navbar-main">
						[navbar]
					</div>
				</div>

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
								if(!this.state.agriView){
									return null
								}else{
									return <a className = "a-link" href = {article.link}>
												<div className = "center-container">
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

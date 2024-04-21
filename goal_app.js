import GenericApp from './generic_app.js';
import show_note from './script.js'
let GoalApp = {...GenericApp}
let saved_data = JSON.parse(localStorage.getItem("InnovaFi_data"))

GoalApp.setup = function(root_id){

console.log("saved data from goal app:")
	for (let i in saved_data.goals)
		console.log(i)
	this._set_root(root_id);
	this._add_vbox("body")
	this._add_element("goal_form", "div", "", "body")
	this._add_data_element("title", "b", "Your SMART Goals", "body")
	this._add_data_element("goals_list", "div", {}, "body")
	this._add_button("add_goal", "+", function(){
		GoalApp.add_goal()
	}, null, ["menu_button", "outline", "center"]);
		this._add_button("save", "💾", function(){
		saved_data.goals = {...this.data};
		localStorage.setItem("InnovaFi_data", JSON.stringify(saved_data));
		console.log(saved_data);
		show_note("Your data was saved! Please consider supporting us so we can make our products better", "Success!");
	}, null, ["menu_button", "outline", "center"]);
		if ("goals" in saved_data){
			this.data = {...saved_data.goals};
			show_note("Your data was loaded! Happy budgeting!", "Success!");
		}else{
			this.data.goals_list = []
		} 
		this.update();
}

GoalApp.update = function() {
    this._build_list("goals_list",  this.data.goals_list, ["space_between"], ["theme_text", "menu_button", "outline"])

	/*const data = {
	  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
	  datasets: [{
		label: 'My First Dataset',
		data: [65, 59, 80, 81, 56, 55],
		fill: false,
		borderColor: 'rgb(75, 192, 192)',
		tension: 0.1
	  }]
	};

	const config = {
	  type: 'line',
	  data: data,
	};

	var myChart = new Chart(
		document.getElementById('myChart'),
		config
	);*/

}

GoalApp.add_goal = function(){
    this._add_element("goal_name", "input", "Give your goal a name", "goal_form")
	this._add_element("goal_metric", "input", "What metric are you trying to improve?", "goal_form")
	this._add_element("goal_target", "input", "By how much?", "goal_form")
	this._add_element("goal_deadline", "input", "When is your deadline?", "goal_form")
	this._add_button("submit", "Add Goal", function(){
		let goal = {
		    name: GoalApp.dom.goal_name_el.value,
		    metric: GoalApp.dom.goal_metric_el.value,
		    target: GoalApp.dom.goal_target_el.value,
		    deadline: GoalApp.dom.goal_deadline_el.value,
			progress: 0,
			data: {}
		}
        for (let item in GoalApp.data)
		    console.log(item)
		GoalApp.data.goals_list = []
		GoalApp.data.goals_list.push(goal)
		GoalApp.dom.goal_form_el.innerHTML = ""
	}, "goal_form", ["menu_button", "outline", "center"]);
    
}

GoalApp.save = function() {
	localStorage.setItem("InnovaFi_data", this.data) || {};
}

GoalApp.load = function(){
	this.data = JSON.parse(localStorage.getItem("InnovaFi_data")) || {};
}

export default GoalApp
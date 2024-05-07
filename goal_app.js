import GenericApp from './generic_app.js';
import show_note from './helper.js'
let GoalApp = {...GenericApp}
let saved_data = JSON.parse(localStorage.getItem("goals")) || null

GoalApp.setup = function(root_id){
	this._set_root(root_id);
	this._add_swapbox("body")
	this._add_data_element("title", "b", "Your Goals", "body")
	this._add_vbox("left", "body")
    this._add_vbox("right", "body")
    this._add_element("display",  "div", "", "right")
	this._add_data_element("goals_list", "div", [], "left")
	this.p5 = new p5(this.sketch);
	this.update();
	this._add_button("add_goal", "+", ()=>{this.add_goal()}, 
		null, ["menu_button", "outline", "center"]);
	this._add_button("save", "💾", function(){
		saved_data = {...this.data};
		localStorage.setItem("goals", JSON.stringify(saved_data));
		console.log(saved_data);
		show_note("Your data was saved! Please consider supporting us so we can make our products better", "Success!");
	}, null, ["menu_button", "outline", "center"]);
		if (saved_data){
			this.data = {...saved_data};
		}else{
			this.data = {
			    goals_list: []
			}
		}
	
}

GoalApp.update = function() {
    this._build_list("goals_list",  this.data.goals_list, ["space_between"], ["theme_text", "menu_button", "outline"])

}

GoalApp.add_goal = function(){
	this._add_element("goal_form", "div", "",  "body")
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
		console.log(GoalApp)
		GoalApp.data.goals_list = []
		GoalApp.data.goals_list.push(goal)
		GoalApp.dom.goal_form_el.innerHTML = ""
	}, "goal_form", ["menu_button", "outline", "center"]);
    
}

// Define a new instance of p5
GoalApp.sketch = (sketch) => {
  let x = 100;
  let y = 100;

  sketch.setup = () => {
    let canvas = sketch.createCanvas(200, 200);
	canvas.parent('display');
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x, y, 50, 50);
  };
};

GoalApp.save = function() {
	localStorage.setItem("goals", this.data) || {};
}

GoalApp.load = function(){
	this.data = JSON.parse(localStorage.getItem("goals")) || {};
}

export default GoalApp
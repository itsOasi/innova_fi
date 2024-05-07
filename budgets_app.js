import GenericApp from './generic_app.js';
import {show_note, get_random_int} from './helper.js'
let GoalApp = {...GenericApp}
let saved_data = JSON.parse(localStorage.getItem("budgets")) || null

let BudgetsApp = {...GenericApp}

BudgetsApp.setup = function(root_id){
	
	this._set_root(root_id);
    this._add_vbox("body")
	this._add_element("title", "b", "Your Budgets", "body");
	this._add_element("display", "div", "", "body");
	this._add_hbox("income_header", "body");
	this._add_element("income_text", "span", "Monthly Income", "income_header");
	this._add_data_element("total_income", "input", 7000, "income_header");
	this._add_element("break1", "br");

	this._add_swapbox("lists", "body", ["space_between"]);
	this._add_vbox("needs", "lists");
	this._add_vbox("wants", "lists");
	this._add_vbox("savings", "lists");
	this._add_element("need_item_name", "input", "Electricity bill", "needs");
	this._add_element("want_item_name", "input", "Xbox", "wants");
	this._add_element("savings_account_name", "input", "Mortgage Savings", "savings");
	this._add_data_element("need_item_amount", "input", 100, "needs");
	this._add_data_element("want_item_amount", "input", 300, "wants");
	this._add_data_element("savings_account_amount", "input", 100, "savings");
	this._add_element("break2", "br");
	this._add_data_element("needs_list", "div", [], "needs");
	this._add_data_element("wants_list", "div", [], "wants");
	this._add_data_element("savings_list", "div", [], "savings");
	this._add_button("add_need", "Add Need", () =>{
	    this.data.needs_list.push({
			 name:this.dom.need_item_name_el.value, 
			 value:Number(this.dom.need_item_amount_el.value)
		});
	  console.log(JSON.stringify(this.data.needs_list_value));
	  this.update();
	}, "needs", ["menu_button", "outline"]);
	this._add_button("add_want", "Add Want", () =>{
		this.data.wants_list.push({
		    name: this.dom.want_item_name_el.value, 
		    value: Number(this.dom.want_item_amount_el.value)
		});
	  this.update();
	}, "wants", ["menu_button", "outline"]);
	this._add_button("add_savings", "Add Savings", () =>{
	    this.data.savings_list.push({
		    name: this.dom.savings_account_name_el.value,
			value: Number(this.dom.savings_account_amount_el.value)
		});
	  console.log(JSON.stringify(this.data.savings_list_value));
	  this.update();
	}, "savings", ["menu_button", "outline"]);
	this._add_element("break3", "br");
	this._add_element("budget_text", "b", "Your Budget");
	this._add_hbox("results");
	this._add_data_element("needs_results", "b", 0, "results", ["theme_text"]);
	this._add_data_element("wants_results", "b", 0, "results", ["theme_text"]);
	this._add_data_element("savings_results", "b", 0, "results", ["theme_text"]);
	this._add_button("save", "💾", () => {
		saved_data = {...this.data}
		localStorage.setItem("budgets", JSON.stringify(saved_data));
		show_note("Your data was saved! Please consider supporting us so we can make our products better", "Success!");
		this.update()
	}, null, ["menu_button", "outline", "center"]);
	if (saved_data){
	    console.log(saved_data)
		this.data = {...saved_data};
		let income = JSON.parse(localStorage.getItem("income"))
	    if (income){
			//console.log(income);
			this.dom.total_income_el.value = Math.round(income.total_income/12);
			this.data.total_income = income.total_income
		}else{
			this.data.total_income = this.dom.total_income_el.value;
	    }
	} else{
		this.data = {
			needs_list: [],
			wants_list: [],
			savings_list: [],
		}
	}
	this.dom.total_income_el.onchange = _ =>{this.update();};
	this.p5 = new p5(this.sketch);
    //console.log(this.p5);
    this.update();
}

BudgetsApp.update = function(){
	this.p5.objects = []
	//this.data.total_income = this.dom.total_income_el.value;
	this.calculate_budgets();
	this.calculate_usages()
	this.dom.needs_results_el.innerHTML = `Needs: ${this.data.budgets[0].amount}`;
	this.dom.wants_results_el.innerHTML = `Wants: ${this.data.budgets[1].amount}`;
	this.dom.savings_results_el.innerHTML = `Savings: ${this.data.budgets[2].amount}`;
	this._build_list("needs_list", this.data.needs_list, ["space_between"], ["theme_text", "menu_button", "outline"]);
	this._build_list("wants_list", this.data.wants_list, ["space_between"], ["theme_text", "menu_button", "outline"]);
	this._build_list("savings_list", this.data.savings_list, ["space_between"], ["theme_text", "menu_button", "outline"]);
    if (!this.data.budgets)
            return
	console.log(BudgetsApp);
	
}
// sums the cost of items added to each list
BudgetsApp.calculate_usages = function(){
    let usages = {
        needs: 0,
		wants: 0,
		savings: 0
    }
    
	this.data.needs_list.forEach(function(item){
		usages.needs += item.value
	})
	this.data.wants_list.forEach(function(item){
		usages.wants += item.value
	})
    this.data.savings_list.forEach(function(item){
		usages.savings += item.value
	})
    
    this.data.usages = usages

	let start = 0;
	for (let _b in this.data.usages){
        let b = this.data.usages[_b]
		console.log(b)
		this.p5.add_obj({r: 0, g: 0, b: 0, a:127}, start, b)
        start += 50;
	}
}

// calculates size of each budget 
BudgetsApp.calculate_budgets = function(){
	let income = JSON.parse(localStorage.getItem("income"))
	this.data.monthly_income = income.total_income / 12
	    
	this.data.budgets = []
	
	this.data.needs_results = Math.round(this.data.monthly_income * .5);
	this.data.wants_results = Math.round(this.data.monthly_income * .3);
	this.data.savings_results = Math.round(this.data.monthly_income * .2);

	this.data.budgets.push({list_name: "needs", amount: this.data.needs_results});
	this.data.budgets.push({list_name: "savings", amount: this.data.savings_results});
	this.data.budgets.push({list_name: "wants", amount: this.data.wants_results});
	let start = 0;
	for (let _b in this.data.budgets){
        let b = this.data.budgets[_b]
		console.log(b)
		this.p5.add_obj({r: get_random_int(256), g: get_random_int(256), b: get_random_int(256), a:255}, start, b.amount)
        start += 50;
	}
}

BudgetsApp.check_budgets = () =>{
	data.over_budget = false;
	if (over_budget){
		show_note("You are over budget", "Warning");
	};
}

BudgetsApp.sketch = function(sketch){
    sketch.gx = 100;
    sketch.height = 200;
	sketch.max_value = 0

	sketch.objects = []

	sketch.add_obj = (color, start, size) => {
		let obj = {
			color: color,
			draw: sketch.draw_bar,
			start: start,
			size: size
		}
		sketch.objects.push(obj)
		// console.log(sketch.objects);
	}
	sketch.get_max_value = () => {
		sketch.objects.forEach(function(o){
            if (o.size > sketch.max_value)
				sketch.max_value = o.size
        })
	}

    sketch.setup = () => {
        let canvas = sketch.createCanvas(200, sketch.height);
	    canvas.parent('display');
    };

    sketch.draw = () => {
        sketch.get_max_value()
        sketch.background(0);
        for (let o in sketch.objects){
			let obj = sketch.objects[o]
			obj.draw(obj.color, obj.start, obj.size)
		}
    };

	sketch.draw_bar = (color, start, size) => {
		sketch.fill(color.r, color.g, color.b, color.a);
        sketch.rect(start, sketch.height, 50, -(sketch.height*(size/sketch.max_value)))
	}

};

export default BudgetsApp
import GenericApp from './generic_app.js';
import {show_note, get_random_int} from './helper.js'
let IncomeApp = {...GenericApp}
let saved_data = JSON.parse(localStorage.getItem("income")) || null
IncomeApp.setup = function(root_id){
		this._set_root(root_id);
		this._add_vbox("income_body");
	    this._add_element("title", "b", "Your Income", "income_body")
	    this._add_element("display", "b", "", "income_body")
		this._add_vbox("income_list", "income_body");
		this._add_hbox("input_panel", "income_body", ["full_width", "space_between"]);
		this._add_element("new_income_name", "input", "Income Source", "input_panel");
		this._add_element("new_income_salary", "input", 40000, "input_panel");
		this._add_button("add_income", "Add Income", () =>{
				if (!this.data.income_list)
                    this.data.income_list = []
			    this.data.income_list.push({
                    name: this.dom.new_income_name_el.value,
			        value:Number(this.dom.new_income_salary_el.value)
				});
				this.update();
		}, "input_panel", ["menu_button", "outline"]);

		this._add_button("save", "💾", () => {
			saved_data = {...this.data};
			console.log("Full data "+JSON.stringify(saved_data));
			localStorage.setItem("income", JSON.stringify(saved_data));
			show_note("Your data was saved! Please consider supporting us so we can make our products better", "Success!");
			this.update()
		}, null, ["menu_button", "outline", "center"]);
		this._add_button("reset", "Reset", ()=>{
			this.data = {}
			this.data.income_list = []
			show_note("data reset")
            this.update()
		}, null, ["menu_button", "outline", "center"]);
		this._add_element("total_income", "b", "", null, ["theme_text"])
		if (saved_data){
			console.log(`loading saved data`);
			this.data = {...saved_data};
			console.log(this.data);
		}else{
			console.log(`no saved data`);
			saved_data = {}
            this.data = {...saved_data}
			this.data.income_list = []
			this.data.total_income = 0
		}
	// Create the instance
    this.p5 = new p5(this.sketch);
	this.update();
}

IncomeApp.update = function () {
	this._build_list("income_list", this.data.income_list, ["space_between"], ["theme_text", "menu_button", "outline"]);
	this.data.total_income = this.calculate_income();
	document.querySelector("#total_income").innerHTML = "Total Income: "+this.data.total_income;

	this.p5.objects = []
	let start = 0;
	for (let _i in this.data.income_list){
		let i = this.data.income_list[_i]
		//console.log(i)
	    this.p5.add_obj({r: get_random_int(256), g: get_random_int(256), b: get_random_int(256)}, start, start+(i.value/this.data.total_income)*(2*this.p5.PI))
        start += (i.value/this.data.total_income)*(2*this.p5.PI)
	}
}

IncomeApp.calculate_income = function(){
		let income_list = this.data.income_list;
		let total_income = 0;
		for (let source in income_list){
				total_income += income_list[source].value;
		}
		//console.log(total_income)
		return total_income;
}

// Define a new instance of p5
IncomeApp.sketch = (sketch) => {
    let x = 100;
    let y = 100;

    sketch.objects = []

    sketch.add_obj = (color, start, size) => {
        let obj = {
            color: color,
			draw: sketch.draw_slice,
			start: start,
			size: size
		}
		//console.log(obj);
        sketch.objects.push(obj)
    }

    sketch.setup = () => {
      let canvas = sketch.createCanvas(200, 200);
	  canvas.parent('display');
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255);
		for (let o in sketch.objects){
			let obj = sketch.objects[o]
			obj.draw(obj.color, obj.start, obj.size)
		}
            
    };

	sketch.draw_slice = (color, start, size) => {
		sketch.fill(color.r, color.g, color.b);
		sketch.arc(x, y, 100, 100, start, size)
	}
};


export default IncomeApp;

import {http, show_note} from './helper.js';
import dev_mode from './helper.js';
import GenericApp from './generic_app.js';
import BudgetsApp from './budgets_app.js';
import IncomeApp from './income_app.js';
import GoalApp from './goal_app.js';
import ComingSoon from './coming_soon.js';

const payment_host = "https://payment-server-2jochkae6a-uc.a.run.app";
let apps = {
	"budgets": {...BudgetsApp },
	"income": {...IncomeApp },
	"goals": dev_mode?{...GoalApp}:{...ComingSoon},
	"support": {...GenericApp}
};

////////////////////////////////////////////
/* Budget App */

////////////////////////////////////////////////
/* Income App */

/* support app */
apps.support.setup = function(root_id) {
	this._set_root(root_id);
	this._add_element("support_title", "div", "We appreciate your support!", null, ["text_center",  "title", "theme_text"]);
	this._add_data_element("amount", "input", 5, null, ["center"]);
	this._add_element("break", "br");
	this._add_button("confirm_support", "Confirm", async ()=>{
		let amount = this.data.amount_value;
				let key_res = await http.get(payment_host+"/get_test_key");
				let key_text = await key_res.json();
				console.log(JSON.stringify(this.data))
				let form = new FormData()
						form.append("price_id", amount);
						form.append("success", "test");
						form.append("cancel", "test");
						form.append("api_key", key_text["test_key"]);
				let res = await http.post(payment_host+"/single_purchase", form)
				let res_text = await res.text();
		show_note(res_text);
	}, null, ["menu_button", "outline","center"]);
}

/* Basic web stuff */
document.body.onload = function(){
	switch_app("income");
	document.querySelector("#budgets").onclick = _ => {switch_app("budgets");};
	document.querySelector("#income").onclick = _ => {switch_app("income");};
	document.querySelector("#support").onclick = _ => {switch_app("support");};
	document.querySelector("#goals").onclick = _ => {switch_app("goals");};
    // document.querySelector("#clear").onclick = _ => {clear_local_storage()}

}

function clear_local_storage(){
	localStorage.clear()
}


export function switch_app(name){
	apps[name].setup("app_root");
}


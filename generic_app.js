var GenericApp = {
	data: {},
	dom: {},
	setup: function(){},
	input: function(){},
	update: function(){},
	_set_root: function(id){
				this.dom = {}
				this.data = {}
		this.dom.root = document.getElementById(id);
		if (this.dom.root)
			this.dom.root.innerHTML = "";
	},
	_add_element: function (id, type, value, parent_id=null, classes=[]) {
		this.dom[id+"_el"] = document.createElement(type);
		this.dom[id+"_el"].id = id
		switch (type) {
			case "input":
				this.dom[id+"_el"].value = value;
				break;
			default:
				this.dom[id+"_el"].innerText = value;
				break;
		}
		classes.forEach((c)=>{
			this.dom[id+"_el"].classList.add(c)
		})        
		if (!parent_id){
			this.dom.root.append(this.dom[id+"_el"]);
			return
		}
		document.getElementById(parent_id).append(this.dom[id+"_el"]);
	},
	_add_data_element: function (id, type, value, parent_id=null, classes=[]) {
		this.dom[id+"_el"] = document.createElement(type);
		this.dom[id+"_el"].id = id
				this.data[id] = value;
		switch (type) {
			case "input":
				this.dom[id+"_el"].value = value;
								this.dom[id+"_el"].onchange = () => {
										this.data[id] = this.dom[id+"_el"].value;
										this.update()
								}
				break;
			default:
				this.dom[id+"_el"].innerText = this.data[id];
				break;
		}
		classes.forEach((c)=>{
			this.dom[id+"_el"].classList.add(c)
		})        
		if (!parent_id){
			this.dom.root.append(this.dom[id+"_el"]);
			return
		}
		document.getElementById(parent_id).append(this.dom[id+"_el"]);
	},
	_add_button: function (id, value, callback, parent_id=null, classes=[]) {
		this.dom[id+"_btn"] = document.createElement("button");
		this.dom[id+"_btn"].id = id
		this.dom[id+"_btn"].onclick = callback
		this.dom[id+"_btn"].innerText = value
		classes.forEach((c)=>{
			this.dom[id+"_btn"].classList.add(c)
		})
		if (!parent_id){
			this.dom.root.append(this.dom[id+"_btn"]);
			return
		}
		document.getElementById(parent_id).append(this.dom[id+"_btn"]);
	},
	_add_hbox: function (id, parent_id=null, classes=[]) {
		this.dom[id+"_el"] = document.createElement("div");
		this.dom[id+"_el"].id = id
		this.dom[id+"_el"].classList.add("hbox")
		classes.forEach((c)=>{
			this.dom[id+"_el"].classList.add(c)
		})
		if (!parent_id){
			this.dom.root.append(this.dom[id+"_el"]);
			return
		}
		document.getElementById(parent_id).append(this.dom[id+"_el"]);
	},
	_add_vbox: function (id, parent_id=null, classes=[]) {
		this.dom[id+"_el"] = document.createElement("div");
		this.dom[id+"_el"].id = id
		this.dom[id+"_el"].classList.add("vbox")
		classes.forEach((c)=>{
			this.dom[id+"_el"].classList.add(c)
		})
		if (!parent_id){
			this.dom.root.append(this.dom[id+"_el"]);
			return
		}
		document.getElementById(parent_id).append(this.dom[id+"_el"]);
	},
	_add_swapbox: function (id, parent_id=null, classes=[]) {
		this.dom[id+"_el"] = document.createElement("div");
		this.dom[id+"_el"].id = id
		this.dom[id+"_el"].classList.add("swapbox")
		classes.forEach((c)=>{
			this.dom[id+"_el"].classList.add(c)
		})
		if (!parent_id){
			this.dom.root.append(this.dom[id+"_el"]);
			return
		}
		document.getElementById(parent_id).append(this.dom[id+"_el"]);
	},
		_build_list: function (list_el_id, list_data, list_classes, item_button_classes){
			if (!list_data.length)
				return
			let list_el = document.getElementById(list_el_id);
			list_el.innerHTML = "";
			//console.log("building list "+list_data);
			for (let i in list_data){
                let item = list_data[i]
   					//console.log("item: "+item);
					this._add_hbox("item_"+item.name,  list_el_id, list_classes);
					this._add_element(item.name+ "_item_title", "div", item.name, "item_"+item.name);
					this._add_element(item.name+ "_item_value", "div", item.value, "item_"+item.name);
					this._add_button("remove_"+item.name, "X", ()=>{
						let idx = list_data.indexOf(item)
                        list_data.splice(idx, 1);
						this.update();      
					}, "item_"+item.name, item_button_classes);
					//console.log(JSON.stringify(list_data));
				};
		}
}

export {GenericApp as default}
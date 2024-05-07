export let http = {
        get: async(url) =>
        {
                let res = await fetch(url)
                return await res
        },
        post: async(url, data) => {
                let res = await fetch(url, {
                        method: "post",
                        body: data
                })
                return await res
        }

}

export function show_note(message="test message", title=""){
	console.log(message);
	let notification = document.querySelector("#notification");
	document.querySelector("#note_message").innerHTML = message;
	document.querySelector("#note_title").innerHTML = title;
	document.querySelector("#note_close").onclick = hide_note;
	notification.classList.add("visible");
}
export function hide_note(){
	notification.classList.remove("visible");
}

export function get_random_int(max){
    return Math.floor(Math.random() * max)
}

var dev_mode = false;
export default dev_mode
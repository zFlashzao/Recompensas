var click_timeout = 2000;
var clickQuestPeriodicity = 120000;

var collecting = false;
function collectRoutine(){
	if($("#popup_box_quest").filter(".show").length && !collecting){
		collecting = true;
        console.log("CONA");
		let lenAllQuests = $(".quest-complete-btn").length;
		concludeAllQuests();

		setTimeout(()=>{
			console.log("CONA2");
			$("a.tab-link[data-tab='reward-tab']").click();
			setTimeout(()=>collectAllRewards(), click_timeout*(1+.4*Math.random()));
		}, (1 + lenAllQuests + .4*Math.random()) * click_timeout);
	}
}


function concludeAllQuests(){
	$(".quest-complete-btn").each((key, el)=>setTimeout(()=>el.click(), (key + .4*Math.random())* click_timeout));
}

function collectAllRewards(){
	let lenCollectAll = $(".reward-system-claim-all-button").length;

	$(".reward-system-claim-all-button").each((key, el)=>setTimeout(()=>el.click(), (key + .4*Math.random())* click_timeout));
	setTimeout(()=>{
		let lenCollectOne = $(".reward-system-claim-button").length;
		if(!lenCollectOne){
			collecting = false;
			$(".tooltip-delayed").click();
		}
		$(".reward-system-claim-button").each((key, el)=>setTimeout(()=> {
			el.click();
			if(key == lenCollectOne -1){
				collecting = false;
				console.log("CONA4444");
				setTimeout(()=>$(".tooltip-delayed").click(), click_timeout*(1 + Math.random()*.4));
			}
		}, (key + .4*Math.random())* click_timeout));
	}, (lenCollectAll + .4*Math.random())* click_timeout)
}

function clickQuest(timeout){
	setTimeout(()=>{
		$("#new_quest").click();	
		clickQuest(timeout);
	}, clickQuestPeriodicity * (1 + .4*Math.random()))
}

setInterval(collectRoutine, click_timeout);
clickQuest();

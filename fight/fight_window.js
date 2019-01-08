
// ОКНО БОЯ	
let 
	hpPerson = document.createElement("div"),
	hpMonster = document.createElement("div"),
	hpDivPerson = document.createElement("div"),
	hpDivMonster = document.createElement("div"),
	hitOrShoot,
	hpWrapMonster = document.createElement("div");	

let createHpPersonBlock = (name, posHpX, posHpY) => {
	let hpWrapPerson = document.createElement("div");

	hpDivPerson.style.top = `${posHpX}px`;
	hpDivPerson.style.left = `${posHpY}px`;

	hpDivPerson.classList.add("hpDivPerson");
	hpWrapPerson.classList.add("hpWrapPerson");
	hpPerson.classList.add("hpPerson");

	hpWrapPerson.innerHTML = `<span>${name}</span>`;

	wrapper.appendChild(hpDivPerson);
	hpDivPerson.appendChild(hpWrapPerson);
	hpWrapPerson.appendChild(hpPerson);
};

let createHpMonsterBlock = (name, posHpX, posHpY) => {
	
	hpDivMonster.style.top = `${posHpX}px`;
	hpDivMonster.style.left = `${posHpY}px`;

	hpDivMonster.classList.add("hpDivMonster");
	hpWrapMonster.classList.add("hpWrapMonster");
	hpMonster.classList.add("hpMonster");

	if(countClick === 0){
		hpWrapMonster.innerHTML = `<span>${name}</span>`;
	}

	wrapper.appendChild(hpDivMonster);
	hpDivMonster.appendChild(hpWrapMonster);
	hpWrapMonster.appendChild(hpMonster);
};

let createFight = () => {

	let 		
		hitANDshoot = document.createElement("div"),
		hit = document.createElement("div"),
		shoot = document.createElement("div"),
		notification;

	hit.addEventListener("mouseover", () => {
		if(styleLeftForPerson === 0){
			notification = document.createElement("div");
			notification.classList.add ("notification");
			notification.innerHTML = "У вас полное здоровье";
			notification.style.display = 'block';
			hit.appendChild(notification);
		}
	})	

	hit.addEventListener("mouseout", () => {
		if(styleLeftForPerson === 0){
			notification.style.display = 'none';
		}
	})	

	hit.addEventListener("click", () => {
		hitOrShoot = true;
		createModal("block");
	});

	shoot.addEventListener("click", () => {
		hitOrShoot = false;
		createModal("block");
	});

	hitANDshoot.classList.add("hitANDshoot");
	hit.classList.add("hit");
	shoot.classList.add("shoot");
	
	hit.innerHTML = "<p class='lech'>ЛЕЧЕНИЕ</p>";
	shoot.innerHTML = "<p class='damage'>УРОН</p>";

	wrapper.style.marginTop = '-200px';
	wrapper.style.maxWidth = '1600px';
	wrapper.style.height = "850px";

	canvas.width = 1200; 
	canvas.height = 400; 
	
	canvas.style.padding = '300px 0 0 50px'; 

	wrapper.appendChild(hitANDshoot);
	hitANDshoot.appendChild(hit);
	hitANDshoot.appendChild(shoot);

	createHpPersonBlock(enterName.value ,200, 80);

	createHpMonsterBlock(`	${firstNameMonster[(Math.random()*6).toFixed(0)]}
							${secondNameMonster[(Math.random()*6).toFixed(0)]}
							${thirdNameMonster[(Math.random()*6).toFixed(0)]}`
							,150, 975);
	
	wrapper.appendChild(canvas);
	btnBackToMain();
};

// КНОПКА НАЗАД
let btnBackToMain = () => {
	let back = document.createElement("div");
	back.classList.add("btnBack");
	wrapper.appendChild(back);

	back.addEventListener("click", () => {
		wrapper.style.margin = '0 auto';
		wrapper.style.maxWidth = '800px';
		canvas.style.padding = '0'; 

	    while (hpDivPerson.hasChildNodes()) {
	        hpDivPerson.removeChild(hpDivPerson.firstChild);
	    }
	     while (hpDivMonster.hasChildNodes()) {
	        hpDivMonster.removeChild(hpDivMonster.firstChild);
	    }
		clearWrapper();
		createLending();
		countWin = 0;
		enterName.value = "";
	});
}

//ПАДЕНИЕ ГРАНАТЫ
let fallSubject = (pozX, pozY, bumX) => {
	let granata = document.createElement("img"),
		explosion = document.createElement("img");

	granata.src = "img/granata.png";
	explosion.src = "img/bum.png";

	granata.style.position = 'relative';
	granata.style.top = `${pozX}px`;
	granata.style.left = `${pozY}px`;	
	granata.style.height = '50px';	

	wrapper.appendChild(granata); 

	let styleTop = pozX;
	let createFooForAnimation = () => {
		Promise.resolve()
		.then(() => {
			return new Promise(
				resolve => setTimeout(() => {
					if(styleTop <= -110){
						createProhibitionOfActions();
						granata.style.display = 'inline-block';
						explosion.style.display = 'inline-block';
						granata.style.transition = "0.1s linear top";
						granata.style.top = `${styleTop}px`;
						styleTop += 17;
					}
					resolve();         
				}, 0)
			);
		})
		.then(() => setTimeout(()=>{
			granata.style.display = 'none';
			explosion.style.position = 'relative';
			explosion.style.top = `-460px`;
			explosion.style.left = `${bumX}px`;	
			explosion.style.height = '500px';	
			wrapper.appendChild(explosion); 
		}, 2000))
		.then(() => setTimeout(()=>{
			explosion.style.display = 'none';
			clearInterval(stopFall);
			deleteProhibitionOfActions();
		}, 2350))
	}
	let stopFall = setInterval(createFooForAnimation, 1000/60);
}

// ОТМЕНА ДЕЙСТВИЙ ПОЛЬЗОВАТЕЛЯ ПРИ АНИМАЦИИ
let prohibitionOfActionsParent = document.createElement("div"),
	prohibitionOfActions = document.createElement("div");
	
let createProhibitionOfActions = () =>{
	prohibitionOfActions.classList.add("prohibitionOfActions");

	wrapper.appendChild(prohibitionOfActionsParent);
	prohibitionOfActionsParent.appendChild(prohibitionOfActions);
}
let deleteProhibitionOfActions = () =>{
	if(prohibitionOfActionsParent.hasChildNodes()){
		prohibitionOfActionsParent.removeChild(prohibitionOfActions)
	}
}

// УМЕНЬШЕНИЕ УВЕЛИЧЕНИЕ ЗДОРОВЬЯ в % 
let styleLeftForPerson = 0,
	styleLeftForMonster = 0,
	countWin = 0;
let helzChange = (how, who) => {
	if(who === hpPerson){
		if((how < 0 && styleLeftForPerson > -100)||(how > 0 && styleLeftForPerson < 0)){
			styleLeftForPerson += how;
			who.style.transition = "1.5s linear left";
			who.style.left = `${styleLeftForPerson}%`;
		}
		if(styleLeftForPerson === -100){
			Promise.resolve()
			.then(() => {
				return new Promise(
					resolve => setTimeout(() => {
						losingGame();
						createWindowRecord();
					}, 2000)
				);
			})
		}
	}else if(who === hpMonster){
		if((how < 0 && styleLeftForMonster > -100)||(how > 0 && styleLeftForMonster < 0)){
			styleLeftForMonster += how;
			who.style.transition = "1.5s linear left";
			who.style.left = `${styleLeftForMonster}%`;
		}
		if(styleLeftForMonster === -100){
			Promise.resolve()
			.then(() => {
				return new Promise(
					resolve => setTimeout(() => {
						winningGame();
					}, 2000)
				);
			})
		}
	}
}


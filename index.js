let 
	btnEnter = document.createElement("button"), 
	enterName = document.createElement("input"),
	canvas = document.createElement("canvas"),
	context,
	images = [],
	wrapper = document.createElement("section"),
	countClick = 0;

// ЗАГРУЗКА СТРАНИЦЫ
window.addEventListener("load",()=>{
	createLending ();
	playSound("sound/start.mp3");
	btnEnter.addEventListener("click", ()=>{
		clickBtnEnter();
		playSound("sound/click.mp3");
		
	});
	enterName.addEventListener("keypress", (e) => {
		if(e.key === "Enter"){
			clickBtnEnter();
		}
	});
	document.body.addEventListener("selectstart", (e)=>{
		e.preventDefault();
	})
});	

// СОЗДАНИЕ ГЛАВНОЙ СТРАНИЦЫ  ------------------
let createLending = () => {
	let 
		h1 = document.createElement("h1"),
		description = document.createElement("p"),
		labelName = document.createElement("label"),
		playerSelection = document.createElement("section");
		h2 = document.createElement("h2"),
		myName = document.createElement("p");

	wrapper.classList.add("wrapper");
	btnEnter.classList.add("btn");
	description.classList.add("description");
	labelName.classList.add("labelName");
	enterName.classList.add("enterName");
	enterName.setAttribute("type","text");
	enterName.setAttribute( "maxlength","16");
	enterName.setAttribute("placeholder","Имя");
	playerSelection.classList.add("playerSelection");
	canvas.classList.add("canvas");
	myName.classList.add("myName");

	wrapper.style.height = "2600px";

	h1.innerHTML = "RSS Game";
	btnEnter.innerHTML = "ПОГНАЛИ";
	description.innerHTML = 'RSS Game это: <br> Развлекательно-познавательная игра на прохождение. Вводи имя персонажа, одевай его на свой вкус и жми "ПОГНАЛИ"! Тебе предстоят сражения с беспощядными соперниками. Жми на лечение либо урон, выбирай любое из заданий, отвечай правильно и уничтожай монстров!';
	labelName.innerHTML = "Введите имя героя:";
	h2.innerHTML = "Приоденься";
	myName.innerHTML = "<p class='myNameP'>Игру сделал:<span> Евгений Пригодский</span></p>";

	document.body.appendChild(wrapper);
	wrapper.appendChild(h1);
	wrapper.appendChild(btnEnter);
	wrapper.appendChild(description);
	wrapper.appendChild(labelName);
	labelName.appendChild(enterName);
	wrapper.appendChild(playerSelection);
	playerSelection.appendChild(h2);
	playerSelection.appendChild(canvas);
	createTable();
	wrapper.appendChild(myName);

	enterName.focus();createScreenshot();

	enterName.addEventListener("blur", (e)=>{
		if(enterName.value){
			enterName.style.boxShadow = "none";
		}
	});

	drawFunction();
	
};
// СКРИНШОТЫ
let createScreenshot = () => {
	let screenshot = document.createElement("div"),
		imgScreen1 = document.createElement("img"),
		imgScreen2 = document.createElement("img"),
		imgScreen3 = document.createElement("img"),
		imgScreen4 = document.createElement("img");

	screenshot.classList.add("screenshot");
	imgScreen1.classList.add("imgScreen");
	imgScreen2.classList.add("imgScreen");
	imgScreen3.classList.add("imgScreen");
	imgScreen4.classList.add("imgScreen");
	imgScreen1.src = "img/screen1.png";
	imgScreen2.src = "img/screen2.png";
	imgScreen3.src = "img/screen3.png";
	imgScreen4.src = "img/screen4.png";

	screenshot.appendChild(imgScreen1);
	screenshot.appendChild(imgScreen2);
	screenshot.appendChild(imgScreen3);
	screenshot.appendChild(imgScreen4);
	wrapper.appendChild(screenshot);

}

//CLICK И ENTER НА ГЛАВНОЙ СТРАНИЦЕ
let clickBtnEnter = () => {
	if(enterName.value){
		clearWrapper();
		createFight();
		countClick++;
		while (table.hasChildNodes()) {
     	   table.removeChild(table.firstChild);
   		}
	}else{
		document.querySelector(".enterName").focus();
		enterName.style.boxShadow = "inset 0 0 5px 2px red";
	}
}	

// ОЧИСТКА WRAPPER
let clearWrapper = () => {
    while (wrapper.hasChildNodes()) {
        wrapper.removeChild(wrapper.firstChild);
    }
};

// ФОНОВАЯ МУЗЫКА
let playSound = (url) => {
    let audio = document.createElement('embed');
    audio.classList.add("audioFon");
    audio.src = url;
    document.body.appendChild(audio);
}

// СОЗДАНИЕ ТАБЛИЦЫ С ЧАСТЯМИ ТЕЛА ------------------------
	const allFromPerson = [ ["hair", "hair2", "hair3", "hair4", "hairMonster0", "hairMonster1","hairMonster2","hairMonster3"],
							["leftArm", "rightArm", "rightArmMonster", "leftArmMonster"],
							["head", "head1", "head2", "head3","headMonster0","headMonster1", "headMonster2", "headMonster3"],
							["legs","legs2", "legs3", "legs4", "legsMonster0", "legsMonster1", "legsMonster2", "legsMonster3"],
							["torso","torso1", "torso2", "torso3", "torsoMonster0", "torsoMonster1", "torsoMonster2", "torsoMonster3"]
	];
	const table = document.createElement("table");

const createTable = () => {
	const 	tableBlock = document.createElement("div");
			
	tableBlock.classList.add("tableBlock");
	table.classList.add("table");
	wrapper.appendChild(tableBlock);
	tableBlock.appendChild(table);
	
	let row, col;

	for(let tr = 0 ; tr < allFromPerson.length; tr++){
		if(tr !== 1){
			col = document.createElement("tr");
			table.appendChild(col);
			for(let td = 0 ; td < allFromPerson[0].length-4; td++){
				row = document.createElement("td");
				col.appendChild(row);
				const imgPerson = document.createElement("img");

				if(allFromPerson[tr][td]){
					imgPerson.src = `img/${allFromPerson[tr][td]}.png`;
				}

				imgPerson.style.display = 'block';
				imgPerson.style.width = '50px';
				imgPerson.style.height = '50px';
				imgPerson.style.margin = '0px auto';

				if(allFromPerson[tr][td]){
					row.appendChild(imgPerson);
				}
			}
		}
	}
	table.addEventListener("mouseover", (e) => {hoverFooOnAllBlocks(e)});
	table.addEventListener("mouseout", (e) => {hoverFooOnAllBlocks(e)});
	changeBodyParts();
};

// ЗАМЕНА ЧАСТЕЙ ТЕЛА ПЕРСОНАЖА
let changeBodyParts = () => {
	table.addEventListener("click", (e) => {
		let target = e.target;
		while(target != table){
			if(target.tagName === "TD" && target.innerHTML){
				let nameImg = target.firstChild.getAttribute("src").slice(4,-4);
				switch (nameImg) {
					case  "hair": case  "hair2": case  "hair3":	case  "hair4":	
						images["hair"].src = "img/" + nameImg + ".png";
					break;
					case  "legs": case  "legs2": case  "legs3":	case "legs4":	
						images["legs"].src = "img/" + nameImg + ".png";
					break;
					case  "torso": case  "torso1": case  "torso2": case "torso3":	
						images["torso"].src = "img/" + nameImg + ".png";
					break;
					case  "head": case "head1": case "head2": case  "head3":	
						images["head"].src = "img/" + nameImg + ".png";
					break;
				}
				return;
			}
			target = target.parentNode;	
		}
	})
}

// НАВЕДЕНИЕ НА ЧАСТИ ТЕЛА В БЛОКЕ
	const hoverFooOnAllBlocks = (e) => {
		let target = e.target;
		while(target != table){
			if(target.tagName === "TD" && target.innerHTML){
				target.classList.toggle("hoverOnRow");
				return;
			}
			target = target.parentNode;	
		}
	}

// РАБОТА С КАРТИНКОЙ 
const drawFunction = () => {
	canvas.width = 720;
	canvas.height = 440;
	
	for(let element = 0; element < allFromPerson.length; element++){
		for(let innerElement = 0; innerElement < allFromPerson[element].length; innerElement++){
				loadImage(allFromPerson[element][innerElement]);
		}
	}
	context = document.querySelector('canvas').getContext("2d");
}	

// ЗАГРУЗКА КАРТИНОК
const loadImage = (name) => {
	images[name] = new Image();
	images[name].onload = function() { 
	  resourceLoaded();
	}
	images[name].src = "img/" + name + ".png";
}
let 
	totalResources = 6,
	numResourcesLoaded = 0;

let resourceLoaded = () => {
  numResourcesLoaded ++;
  if(numResourcesLoaded === totalResources) {
    setInterval(redraw , 1000 / 60);
  }
}
//  РИСУЕМ ПЕРСОНАЖА
const redraw = (x = 120, y = 250) => {
	canvas.width = canvas.width;

	drawEllipse (x + 40, y + 29, 160 - breathAmt/1.5, 6); // ТЕНЬ
	context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt/1.5);
	context.drawImage(images["legs"], x, y);
	context.drawImage(images["torso"], x, y - 50);
	context.drawImage(images["head"], x - 10, y - 125 - breathAmt/1.5);
	context.drawImage(images["hair"], x - 37, y - 138 - breathAmt/1.5);
	context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt/1.5);	
	drawEllipse(x + 44, y - 68 - breathAmt/1.5, 8, curEyeHeight*0.8); // ЛЕВЫЙ ГЛАЗ
	drawEllipse(x + 61, y - 68 - breathAmt/1.5, 8, curEyeHeight*0.8); // ПРАВЫЙ ГЛАЗ

	drawMonster();
}

// РИСУЕМ СОПЕРНИКА
	let randomHairChange = Math.round(Math.random() * 3);
	let randomLegsChange = Math.round(Math.random() * 3);
	let randomTorsoChange = Math.round(Math.random() * 3);
	let randomHeadChange = Math.round(Math.random() * 3);

	let drawMonster = (x = 1050 ,y = 250) =>{
		drawEllipse (x + 40, y + 29, 160 - breathAmt/2, 6); // ТЕНЬ
		context.drawImage(images["leftArmMonster"], x , y - 50 - breathAmt/2);	
		context.drawImage(images["legsMonster" + randomLegsChange], x, y);
		context.drawImage(images["torsoMonster" + randomTorsoChange], x + 25, y - 48);
		context.drawImage(images["headMonster" + randomHeadChange], x + 8, y - 125 - breathAmt/2);
		context.drawImage(images["hairMonster" + randomHairChange], x + 5, y - 138 - breathAmt/2);
		context.drawImage(images["rightArmMonster"], x + 5, y - 40 - breathAmt/2);	
		drawEllipse(x + 27, y - 68 - breathAmt/2, 8, curEyeHeight*0.8); // ПРАВЫЙ ГЛАЗ
		drawEllipse(x + 45, y - 68 - breathAmt/2, 8, curEyeHeight*0.8); // ЛЕВЫЙ ГЛАЗ
	}

// РИСУЕМ ГЛАЗА
	function drawEllipse (centerX, centerY, width, height) { 
		context.beginPath();
  
  		context.moveTo(centerX, centerY - height/2);

		context.bezierCurveTo(
			centerX + width/2, centerY - height/2,
			centerX + width/2, centerY + height/2,
			centerX, centerY + height/2);

		context.bezierCurveTo(
			centerX - width/2, centerY + height/2,
			centerX - width/2, centerY - height/2,
			centerX, centerY - height/2);

		context.fillStyle = "black";
		context.fill();
		context.closePath();
	}

// ДЫХАНИЕ
	let breathInc = 0.25,
		breathDir = 1,
		breathAmt = 0,
		breathMax = 3,
		breathInterval = setInterval(updateBreath, 1000 / 60);

	function updateBreath() {                         
		if (breathDir === 1) {  // breath in
			breathAmt -= breathInc;
			if (breathAmt < -breathMax) {
				breathDir = -1;
			}
		} else {  // breath out
			breathAmt += breathInc;
			if(breathAmt > breathMax) {
			 	breathDir = 1;
			}
		}
	}	

// МИГАНИЕ
let maxEyeHeight = 14,
	curEyeHeight = maxEyeHeight,
	eyeOpenTime = 0,
	timeBtwBlinks = 2000,
	blinkUpdateTime = 300;                 

let updateBlink = () => { 
	eyeOpenTime += blinkUpdateTime;
	if(eyeOpenTime >= timeBtwBlinks){
		blink();
	}
}

let blink = () => {
	curEyeHeight --;
	if (curEyeHeight <= 0) {
		eyeOpenTime = 0;
		curEyeHeight = maxEyeHeight;
	} else {
		setTimeout(blink, 5);
	}
}

let blinkTimer = setInterval(updateBlink, blinkUpdateTime);



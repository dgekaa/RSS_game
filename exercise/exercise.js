
// СОЗДАНИЕ МАТЕМАТИЧЕСКИХ УПРАЖНЕНИЙ
let createMathExercise = () => {
	let numOne = "" + (Math.random()*25).toFixed(0),
		numTwo = "" + (Math.random()*25).toFixed(0),
		arrSymbol = ["*","-","+"],
		someSymbol = arrSymbol[(Math.random()*2).toFixed(0)];

	questionMathem.innerHTML += `${numOne} ${someSymbol} ${numTwo} = `;
	let answerMathem = document.querySelector(".mathQuestionInput");

	answerMathem.addEventListener("keypress", (e) => {
		if(e.key === "Enter"){
			modalSection.style.height = "180px";
			createModal("none");
			questionMathem.innerHTML = "";

			if(answerMathem.value == eval(numOne + someSymbol + numTwo)){
				ifTrue();
			}else{
				ifFalse();
			}	
		};   
	});	
}

// СОЗДАНИЕ АНГЛИЙСКИХ УПРАЖНЕНИЙ
let createEnglishExercise = () => {
	let engWord = englishTranslate[Math.floor(Math.random() * (englishTranslate.length))].word;
	questionEnglish.innerHTML += `${engWord}`;
	let answerEnglish = document.querySelector(".englishQuestionInput");

	answerEnglish.addEventListener("keypress", (e) => {
		let referenceValue = false;
		if(e.key === "Enter"){
			modalSection.style.height = "180px";
			createModal("none");
			questionEnglish.innerHTML = "";

			englishTranslate.forEach( (elBigArr) => {
				if(elBigArr.word === engWord){
					elBigArr.translation.forEach((elSmallArr) => {
						if(elSmallArr === answerEnglish.value){
							referenceValue = true;
						}
					});
				}
			});

			if(referenceValue){
				ifTrue();
			}else{
				ifFalse();
			}
		}
	});		
}

// ECЛИ ОТВЕТИЛ ВЕРНО
	let ifTrue = () => {
		questionEnglish.innerHTML = "";
		questionMathem.innerHTML = "";
		if(hitOrShoot === true){
			playSound("exercise/sound/hp+.mp3");
			helzChange(25, hpPerson);
		}else{
			Promise.resolve()
			.then(() => {
				return new Promise(
					resolve => setTimeout(() => {
						playSound("exercise/sound/padenie.mp3");
						fallSubject(-900,-145, 870);
						resolve();
					}, 0)
				);
			})
			.then(() => setTimeout(()=>{
				helzChange(-25, hpMonster);
				playSound("exercise/sound/vzriv.mp3");
			}, 2000))
		}
	}

// ECЛИ ОТВЕТИЛ С ОШИБКОЙ
	let ifFalse = () => {
		questionEnglish.innerHTML = "";
		questionMathem.innerHTML = "";
		Promise.resolve()
		.then(() => {
			return new Promise(
				resolve => setTimeout(() => {
					playSound("exercise/sound/padenie.mp3");
					fallSubject(-900,-1050, -50);
					resolve();
				}, 0)
			);
		})
		.then(() => setTimeout(()=>{
			helzChange(-25, hpPerson);
			playSound("exercise/sound/vzriv.mp3");
		}, 2000))
	}
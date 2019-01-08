
//СОЗДАНИЕ МОДАЛЬНОГО ОКНА ЗАДАНИЙ
let 
	modalWrap = document.createElement("div"),
	modalSection = document.createElement("div"),
	mathemButton = document.createElement("div"),
	englishButton = document.createElement("div"),
	questionMathem = document.createElement("div"),
	questionEnglish = document.createElement("div"),
	mathQuestionInput = document.createElement("input"),
	englishQuestionInput = document.createElement("input");

let createModal = (display) => {
	modalWrap.classList.add("modalWrap");
	modalSection.classList.add("modalSection");
	mathemButton.classList.add("mathemButton");
	englishButton.classList.add("englishButton");
	questionMathem.classList.add("questionMathem");
	questionEnglish.classList.add("questionEnglish");

	mathQuestionInput.classList.add("mathQuestionInput");
	mathQuestionInput.setAttribute("type","text");
	mathQuestionInput.setAttribute( "maxlength","4");
	mathQuestionInput.setAttribute("placeholder","Ответ");

	englishQuestionInput.classList.add("englishQuestionInput");
	englishQuestionInput.setAttribute("type","text");
	englishQuestionInput.setAttribute( "maxlength","10");
	englishQuestionInput.setAttribute("placeholder","Ответ");

	mathemButton.innerHTML = "Математика";
	englishButton.innerHTML = "Английский";
	
	modalWrap.style.display = display;
	modalSection.style.height = "155px";
	modalSection.style.display = display;

	questionMathem.style.display = "none";
	questionEnglish.style.display = "none";

	wrapper.appendChild(modalWrap);
	modalWrap.appendChild(modalSection);
	modalSection.appendChild(mathemButton);
	modalSection.appendChild(englishButton);
	modalSection.appendChild(questionMathem);
	modalSection.appendChild(questionEnglish);

	questionMathem.appendChild(mathQuestionInput);
	questionEnglish.appendChild(englishQuestionInput);

	hidenModalClick();
	btnMatEngClick();
	createMathExercise();
	createEnglishExercise();
}

// ЕСЛИ ПРОИГРАЛ
let losingGame = () => {
	let modalLos = document.createElement("div"),
		btnModalLos = document.createElement("div"),
		modalLosWrap = document.createElement("div");

	modalLos.classList.add("modalLos");
	btnModalLos.classList.add("btnModalLos");
	modalLosWrap.classList.add("modalLosWrap");

	modalLos.innerHTML = "<h4>ВЫ ПРОИГРАЛИ</h4>";
	btnModalLos.innerHTML = "<h6>НА ГЛАВНУЮ</h6>";

	wrapper.appendChild(modalLosWrap);
	wrapper.appendChild(modalLos);
	modalLos.appendChild(btnModalLos);

	btnModalLos.addEventListener("click", (e)=>{
		countClick = 0;
		let increasehpMonster = Math.abs(styleLeftForMonster);
		helzChange(increasehpMonster, hpMonster);

		clearWrapper();
		wrapper.style.margin = '0 auto';
		wrapper.style.maxWidth = '800px';
		canvas.style.padding = '0'; 
		enterName.value = "";

		questionMathem.innerHTML = "";
		questionEnglish.innerHTML = "";

		while (hpDivPerson.hasChildNodes()) {
	        hpDivPerson.removeChild(hpDivPerson.firstChild);
	    }
	     while (hpDivMonster.hasChildNodes()) {
	        hpDivMonster.removeChild(hpDivMonster.firstChild);
	    }

		createLending();

		modalLos.style.display= 'none';
		modalLosWrap.style.display= 'none';
	})

	countWin = 0;
	helzChange(100, hpPerson);
}

// ЕСЛИ ВЫИГРАЛ
let winningGame = () => {
	let modalWin = document.createElement("div"),
		
		btnModalWin = document.createElement("div"),
		modalWinWrap = document.createElement("div");

		modalWin.classList.add("modalWin");
		btnModalWin.classList.add("btnModalWin");
		modalWinWrap.classList.add("modalWinWrap");

		modalWin.innerHTML = "<h4>ВЫ ВЫИГРАЛИ</h4>";
		btnModalWin.innerHTML = "<h6>ПРОДОЛЖИТЬ</h6>";

		wrapper.appendChild(modalWinWrap);
		wrapper.appendChild(modalWin);
		modalWin.appendChild(btnModalWin);

		btnModalWin.addEventListener("click", (e)=>{
	
			countClick = 0;
			createHpMonsterBlock(`${firstNameMonster[(Math.random()*6).toFixed(0)]}
							${secondNameMonster[(Math.random()*6).toFixed(0)]}
							${thirdNameMonster[(Math.random()*6).toFixed(0)]}`
							,150, 975);
			countClick ++;
					
			questionMathem.innerHTML = "";
			questionEnglish.innerHTML = "";

			modalWin.style.display = 'none';
			modalWinWrap.style.display = 'none';
			clearWrapper();
		
			while (hpDivPerson.hasChildNodes() || hpDivMonster.hasChildNodes()) {
	        	hpDivPerson.removeChild(hpDivPerson.firstChild);
	        	hpDivMonster.removeChild(hpDivMonster.firstChild);
	    	}
	    	helzChange(100, hpMonster);
			createFight();
			countWin++;

			localStorage.setItem(enterName.value, countWin);
   		})
}

// НАЖАТИЕ и СКРЫТИЕ МОДАЛЬНОГО ОКНА
let hidenModalClick = () => {
	modalWrap.addEventListener("click", (e) => {
		if(e.target.className !== "modalSection" && e.target.className === "modalWrap"){
			modalSection.style.height = "180px";
			createModal("none");
			questionMathem.innerHTML = "";
			questionEnglish.innerHTML = "";
		}
	});
}
//НАЖАТИЕ НА МАТЕМ и АНГЛ
let btnMatEngClick = () => {
	mathemButton.addEventListener("click", (e) => {
		questionEnglish.style.display = "none";
		questionMathem.style.display = "block";
		modalSection.style.height = "420px";
		document.querySelector(".mathQuestionInput").focus();
	});	
	englishButton.addEventListener("click", (e) => {
		questionMathem.style.display = "none";
		questionEnglish.style.display = "block";
		modalSection.style.height = "420px";
		document.querySelector(".englishQuestionInput").focus();
	});	
}

// ОКНО РЕКОРДОВ
let createWindowRecord = () => {
	if(localStorage.getItem(localStorage.key(0)) !== null){
		let windowRecord = document.createElement("div");

		windowRecord.classList.add('windowRecord');
		
		windowRecord.innerHTML = `<span class="tableRezSpan">Ваше имя</span>  Убитых`;

		for ( let LScount = 0, len = localStorage.length; LScount < len; ++LScount ) {
			windowRecord.innerHTML += 
						`<span class="LSspan">${localStorage.key( LScount )}</span> 
						${localStorage.getItem( localStorage.key( LScount ) )} </br>`
		}  
		wrapper.appendChild(windowRecord);
	}
	
}
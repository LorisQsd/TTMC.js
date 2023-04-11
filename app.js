const nextBtn = document.querySelector(".container button");
const firstTitle = document.querySelector(".container h2");
const container = document.querySelector(".container");
const displayScore = document.querySelector("#playerScore");
let score = 1000;
displayScore.textContent = score;

//TEST
// createToast(`Tu as gagné x points !`, "green", "white")
nextBtn.addEventListener("click", () => {
    const rules = document.querySelector(".rules")
    container.style.opacity = "0";
    setTimeout(() => { container.removeChild(rules) }, 400)
    //SKIP RULES
    setTimeout(game, 400)

    function game() {
        container.style.height = ""
        htmlTheme();

        //CHOOSE THEME
        const cards = document.querySelectorAll(".card-theme");
        cards.forEach(card => { card.addEventListener("click", chooseDifficulty) })
    }


    function chooseDifficulty(e) {
        container.style.opacity = "0";
        setTimeout(() => {
            container.setAttribute("class", "container " + e.target.classList[1] + "Q")
            let randomIndex;
            let themeChoosed;
            if (e.target.classList.contains("improbable")) {
                randomIndex = Math.trunc(Math.random() * improbableQuestions.length)
                themeChoosed = improbableQuestions
            } else if (e.target.classList.contains("mature")) {
                randomIndex = Math.trunc(Math.random() * matureQuestions.length)
                themeChoosed = matureQuestions
            } else if (e.target.classList.contains("pleasure")) {
                randomIndex = Math.trunc(Math.random() * pleasureQuestions.length)
                themeChoosed = pleasureQuestions
            } else if (e.target.classList.contains("scolar")) {
                randomIndex = Math.trunc(Math.random() * scolarQuestions.length)
                themeChoosed = scolarQuestions
            }

            if (!themeChoosed.length) {
                container.innerHTML = `
                <h2>Il n'y a plus de question disponible dans la catégorie ${themeChoosed}</h2>
                <h2>Veuillez choisir une autre catégorie</h2>
                `
                container.style.height = "500px"
                container.style.opacity = "1";
                setTimeout(() => { container.style.opacity = "0"; }, 2000)
                setTimeout(game, 2300)
            } else {
                container.innerHTML = `
                <h2>Tu te mets combien en :</h2>
                <h2>${themeChoosed[randomIndex].theme}</h2>
        
                <div class="questions">
                    <div class="question" data-attr="Q1"><h3>Question N°1</h3></div>
                    <div class="question" data-attr="Q2"><h3>Question N°2</h3></div>
                    <div class="question" data-attr="Q3"><h3>Question N°3</h3></div>
                    <div class="question" data-attr="Q4"><h3>Question N°4</h3></div>
                    <div class="question" data-attr="Q5"><h3>Question N°5</h3></div>
                    <div class="question" data-attr="Q6"><h3>Question N°6</h3></div>
                    <div class="question" data-attr="Q7"><h3>Question N°7</h3></div>
                    <div class="question" data-attr="Q8"><h3>Question N°8</h3></div>
                    <div class="question" data-attr="Q9"><h3>Question N°9</h3></div>
                    <div class="question" data-attr="Q10"><h3>Question N°10</h3></div>
                </div>`

                container.style.opacity = "1";
                const questions = document.querySelectorAll(".question")
                // CHOOSE QUESTION DIFFICULTY
                questions.forEach(el => {
                    el.addEventListener("click", () => {
                        const questionID = el.getAttribute("data-attr")

                        container.innerHTML = `
                        
                        <h2>Tu te mets combien en :</h2>
                        <h2>${themeChoosed[randomIndex].theme}</h2>
                
                        <div class="questions clothes">
                            <div class="question-card"><h3>Question N°${questionID.slice(1)}</h3></div>
                            <div class="question-card ask"><p>${themeChoosed[randomIndex][questionID].question}</p></div>
                            <div class="question" data-answer="1"><p>${themeChoosed[randomIndex][questionID].answer1}</p></div>
                            <div class="question" data-answer="2"><p>${themeChoosed[randomIndex][questionID].answer2}</p></div>
                            <div class="question" data-answer="3"><p>${themeChoosed[randomIndex][questionID].answer3}</p></div>
                        </div>`

                        const questionSelected = document.querySelectorAll(".question");

                        questionSelected.forEach(question => {
                            const questionAttr = question.getAttribute("data-answer");
                            const questionp = question.querySelector("p");
                            question.addEventListener("click", checkResult)

                            function checkResult() {
                                if (themeChoosed[randomIndex][questionID].goodAnswer === questionAttr) {
                                    console.log("BONNE REPONSE")
                                    question.style.backgroundColor = "green";
                                    questionp.style.color = "white"

                                    score += (questionID.slice(1)) * 100;
                                    displayScore.textContent = score;

                                    createToast(`Tu as gagné <strong> ${(questionID.slice(1)) * 100} </strong> points !`, "green", "white")
                                    const toast = container.querySelector(".toast")
                                    toast.animate([{ transform: "scale(1)" }, { transform: "scale(1.2)" }], 1300, 1)
                                    setTimeout(() => { container.style.opacity = "0" }, 1500)
                                    setTimeout(game, 1600)

                                    // On retire la question de la base de donnée de manière à ne pas retomber dessus
                                    themeChoosed.splice(randomIndex, 1)
                                    console.log(themeChoosed)
                                } else {
                                    console.log("MAUVAISE REPONSE")
                                    question.style.backgroundColor = "crimson";
                                    questionp.style.color = "white"

                                    score -= (questionID.slice(1)) * 100;
                                    displayScore.textContent = score;

                                    createToast(`Tu as perdu <strong> ${(questionID.slice(1)) * 100} </strong> points ! :(`, "crimson", "white")
                                    const toast = container.querySelector(".toast")
                                    toast.animate([{ transform: "scale(1)" }, { transform: "scale(1.2)" }], 1300, 1)
                                    setTimeout(() => { container.style.opacity = "0" }, 1500)
                                    setTimeout(game, 1600)

                                    themeChoosed.splice(randomIndex, 1)
                                    console.log(themeChoosed)
                                }
                            }
                        })

                    })

                })
            }

        }, 400)
    }
})


function htmlTheme() {
    container.backgroundColor = "white";
    removeClass();
    container.innerHTML = `
    
    <h2>Choisi un thème !</h2>
        <div class="themes">
            <div class="card-theme pleasure"><h3>PLAISIR</h3></div>
            <div class="card-theme scolar"><h3>SCOLAIRE</h3></div>
            <div class="card-theme mature"><h3>MATURE</h3></div>
            <div class="card-theme improbable"><h3>IMPROBABLE</h3></div>
        </div>`
    container.style.opacity = "1";
}

function removeClass() {
    if (container.classList.contains("improbableQ")) {
        container.classList.remove("improbableQ")
    } else if (container.classList.contains("pleasureQ")) {
        container.classList.remove("pleasureQ")
    } else if (container.classList.contains("scolarQ")) {
        container.classList.remove("scolarQ")
    } else if (container.classList.contains("matureQ")) {
        container.classList.remove("matureQ")
    }
}

function createToast(status, bgcolor, txtcolor, e) {
    const toastInfo = document.createElement("p");
    toastInfo.className = "toast";

    toastInfo.innerHTML = status;
    toastInfo.style.backgroundColor = bgcolor;
    toastInfo.style.color = txtcolor;
    container.appendChild(toastInfo)

    setTimeout(() => {
        toastInfo.style.opacity = "0"
        setTimeout(() => { toastInfo.remove() }, 300)

    }, 1000)
}
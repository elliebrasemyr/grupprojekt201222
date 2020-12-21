class UI {

    static async paintUI(array, i, userScore, correctAnswers) {
        // let container = document.querySelector(".container");
        let wrapper = document.querySelector(".wrapper");
        const output = [];
        console.log(`current user score: ${userScore}`)

        if (i < array.length) {

            output.push(`
            <div class="container">
                <div class="question">
                    <h1>${array[i].question}</h1>
                </div>
                <div class="question-number">
                    <p>This is question ${i+1} of ${array.length}</p>
                </div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${((i+1)*100)/array.length}%">              
                    </div>
                </div>
                <div class="btn option option-1">
                    ${array[i].answers[0].answer}
                </div>
                <div class="btn option option-2">
                    ${array[i].answers[1].answer}
                </div>
                <div class="btn option option-3">
                    ${array[i].answers[2].answer}
                </div>
                <div class="btn option option-4">
                    ${array[i].answers[3].answer}
                </div>
                <div class="navigation">
                    <div class="btn nav-btn next next-disabled">
                        Next
                    </div>
                    <div class="btn nav-btn restart">
                        Restart
                    </div>
                </div>
            </div>
                `);

                wrapper.innerHTML = output.join('\n');

        } else {

            output.push(`
            <div class="results">
                <div class="score">
                    You scored ${correctAnswers} of ${array.length}!
                </div>
                `);

                let whichQuestion;
                output.push(
                    array.forEach((elem, i) => {
                        whichQuestion++
                        output.push(`
                        <div class="qu qu-${i+1}">
                            ${elem.question}
                        </div>
                        `);
                        elem.answers.forEach((elem, i) => {
                            output.push(`
                            <div class="qu-${whichQuestion}-op-${i+1} op">
                                ${elem.answer}
                            </div>
                            `);
                        });
                    }));

                    output.push(`
                    <div class="navigation">
                        <div class="btn nav-btn nav-btn-full restart">
                            Restart
                        </div>
                    </div>
                    `);

            wrapper.innerHTML = output.join('\n');
        }
              
    }

}

export default UI
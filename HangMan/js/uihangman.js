class UI{
    constructor(){
        //Placeholders
        this.wordEl = document.getElementById('word');
        this.wrongLetters = document.getElementById('wrong-letter');
        this.lastMess = document.getElementById('won-or-lose');
        this.letterExist = document.querySelector('.warning-message');
        this.bodyPart = document.querySelectorAll('.body-part');
        this.popup = document.getElementById('popup');

        this.correctLetters = [];
        this.wrongLetters = [];
    }

    displayWord(selectedWord){
        //Split() Method divides a string into an ordered list of substrings,
        //then it puts the substrings into an array and return it.
        //
        this.wordEl.innerHTML = `
        ${selectedWord.split('').map(letter =>   
            `<span class="letter">
                ${this.correctLetters.includes(letter) ? letter : ''}
            </span>`).join('')}`;

        //Create a word so we can comper it to the word we looking for
        //replace will replace all new line character in string,
        //second parameter choose = replace with what.
        const innerWord = this.wordEl.innerText.replace(/\n/g, '');
       
        if(innerWord === selectedWord){
            this.lastMess.innerText = 'You Won!';
            this.popup.style.display = 'flex';
        }
    }

    updateWrongLetters(){
        this.wrongLetters.innerHTML =
        //If wrongLetters length is greater then 0 write out: "wronge:" else nothing
        //map creates a new array with wrong letters user input
        `
        ${this.wrongLetters.length > 0 ? '<h5 class="block">Wrong:</h5>' : ''}
        ${this.wrongLetters.map(letter => `<p>${letter}</p>`)}
        `;
        //part = the hole code of one line/cicle in svg on HTML
        //index = witch index the part has
        //In CSS the part is displays as none, so foreach wrongletter that has'nt a bigger index then
        //all parts. Make that element to block (show in DOM)
        this.bodyPart.forEach((part, index) =>{
            const errors = this.wrongLetters.length;
            if(index < errors){
                part.style.display = 'block';
            } else{
                part.style.display = 'none';
            }
        })
        
        //If array wrongLetters lenght is the same as bodypars length, -> You Lose messege
        if(this.wrongLetters.length === this.bodyPart.length){
            this.lastMess.innerText = 'You Lose!';
            this.popup.style.display = 'flex';
        }
    }

    showMessage(){
        /*Showing a class in css by adding the class to dom*/
        this.letterExist.classList.add('show');
        /* Removes the class after 2s */
        setTimeout(() =>{
            this.letterExist.classList.remove('show');
        }, 2000);
    }

    keyDown(selectedWord, e){
        //e = witch key u press, each letter on the keyboard has a nr
        //in this case we reduce actions if ex. the user press a number or anything else then a-z
        //Also have the selectedWord in the parameter to check where we go next, is the letter
        //includes in the word or not
        if(e.keyCode >= 65 && e.keyCode <= 90){
            
            //make every keypress to uppercase
            const letter = e.key.toUpperCase();
    
            if(selectedWord.includes(letter)){
                if(!this.correctLetters.includes(letter)){
                    //Puch letter to Array
                    this.correctLetters.push(letter);
                    //Calls method displayWord
                    this.displayWord(selectedWord);
                } else{
                    //Show message that the letter already entered
                    this.showMessage();
                }
            } else{
                if(!this.wrongLetters.includes(letter)){
                    this.wrongLetters.push(letter);
    
                    this.updateWrongLetters();
                } else{
                    this.showMessage();
                }
            }
        }
    }

    btnStartOver(selectedWord){
        //"clean" arrays so its empty for next game
        this.correctLetters.splice(0);
        this.wrongLetters.splice(0);
        
        //putting a new word on DOM
        this.displayWord(selectedWord);
        
        this.updateWrongLetters();
    
        this.popup.style.display = '';
    }
}

export default UI;
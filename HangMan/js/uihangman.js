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
        this.wrongLettersArray = [];
    }
    displayWord(selectedWord){
        //Split() Method divides a string into an ordered list of substrings,
        //then it puts the substrings into an array and returns it.
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
        //If wrongLetters length is greater then 0 write out: "wronge:" else nothing
        //map creates a new array with wrong letters user input
        this.wrongLetters.innerHTML =   `
                                        ${this.wrongLettersArray.length > 0 ? '<h5 class="block">Wrong:</h5>' : ''}
                                        ${this.wrongLettersArray.map(letter => `<p>${letter}</p>`)}
                                        `;
        //part = the hole code of one line/cicle in svg on HTML
        //index = witch index the part has
        //In CSS the part is displays as none, so foreach wrongletter that has'nt a bigger index then
        //all parts. Make that element to block (show in DOM)
        this.bodyPart.forEach((part, index) =>{
            const errors = this.wrongLettersArray.length;
            if(index < errors){
                part.style.display = 'block';
            } else{
                part.style.display = 'none';
            }
        })
        
        //If array wrongLetters lenght is the same as bodypars length, -> You Lose messege
        if(this.wrongLettersArray.length === this.bodyPart.length){
            this.lastMess.innerText = 'You Lose!';
            this.popup.style.display = 'flex';
        }
    }
    showMessage(){
        this.letterExist.classList.add('show');         //Showing a class in css by adding the class to DOM      
        setTimeout(() =>{
            this.letterExist.classList.remove('show');  //Removes the class after 2s
        }, 2000);
    }
    keyDown(selectedWord, e){
        //e = witch key u press, each letter on the keyboard has a nr
        //in this case we reduce actions if ex. the user press a number or anything else then a-z
        //Also have the selectedWord in the parameter to check where we go next, is the letter
        //includes in the word or not or have the user allready wrote it?
        if(e.keyCode >= 65 && e.keyCode <= 90){
            const letter = e.key.toUpperCase();         //make every keypress to uppercase
    
            if(selectedWord.includes(letter)){
                if(!this.correctLetters.includes(letter)){
                    this.correctLetters.push(letter);   //Puch letter to Array
                    this.displayWord(selectedWord);     //Calls method displayWord
                } else{
                    this.showMessage();                 //Show message that the letter already entered
                }
            } else{
                if(!this.wrongLettersArray.includes(letter)){
                    this.wrongLettersArray.push(letter);//Puch letter to Array
                    this.updateWrongLetters();          //Calls method updateWrongLetters
                } else{
                    this.showMessage();                 //Show message that the letter already entered
                }
            }
        }
    }
    btnStartOver(selectedWord){

        this.correctLetters.splice(0);                  //"clean" arrays so its empty for next game
        this.wrongLettersArray.splice(0);
        
        this.displayWord(selectedWord);                 //putting a new word on DOM
        
        this.updateWrongLetters();                      //cleaning wrong letters and the hangman
    
        this.popup.style.display = '';                  //Take away the popup
    }
}

export default UI;
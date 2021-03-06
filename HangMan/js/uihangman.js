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
        this.wordEl.innerHTML = `
                                ${selectedWord.split('').map(letter =>   
                                `<span class="letter">
                                ${this.correctLetters.includes(letter) ? letter : ''}
                                </span>`).join('')}`;

        const innerWord = this.wordEl.innerText.replace(/\n/g, '');
       
        if(innerWord === selectedWord){
            this.lastMess.innerText = 'You Won!';
            this.popup.style.display = 'flex';
        }
    }
    updateWrongLetters(){
        this.wrongLetters.innerHTML =   `
                                        ${this.wrongLettersArray.length > 0 ? '<h5 class="block">Wrong:</h5>' : ''}
                                        ${this.wrongLettersArray.map(letter => `<p>${letter}</p>`)}
                                        `;
        this.bodyPart.forEach((part, index) =>{
            const errors = this.wrongLettersArray.length;
            if(index < errors){
                part.style.display = 'block';
            } else{
                part.style.display = 'none';
            }
        })
        
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
        if(e.keyCode >= 65 && e.keyCode <= 90){
            const letter = e.key.toUpperCase();         //make every keypress to uppercase
    
            if(selectedWord.includes(letter)){
                if(!this.correctLetters.includes(letter)){
                    this.correctLetters.push(letter);   //Push letter to Array
                    this.displayWord(selectedWord);     //Calls method displayWord
                } else{
                    this.showMessage();                 //Show message that the letter already entered
                }
            } else{
                if(!this.wrongLettersArray.includes(letter)){
                    this.wrongLettersArray.push(letter);//Push letter to Array
                    this.updateWrongLetters();          //Calls method updateWrongLetters
                } else{
                    this.showMessage();                 //Show message that the letter already entered
                }
            }
        }
    }
    btnStartOver(selectedWord){

        this.correctLetters.splice(0);                  //clean arrays so its empty for next game
        this.wrongLettersArray.splice(0);
        
        this.displayWord(selectedWord);                 //putting a new word on DOM
        
        this.updateWrongLetters();                      //clean DOM from wrong letters and the hangman
    
        this.popup.style.display = '';                  //Take away the popup
    }
}

export default UI;
import Api from "./hangmanapi.js"
import UI from "./uihangman.js" 
/*===============*/
 
const ui = new UI;                              //Instansiera

Api.getInfo()
.then(data=>{
    const playBtn = document.getElementById('play');
    const words = data.santa;
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    
    ui.displayWord(selectedWord);

    window.addEventListener('keydown', e =>{ 
            ui.keyDown(selectedWord, e)                                 //Push the word and the keyNr to method in UI
    })
    playBtn.addEventListener('click', () =>{
        
        selectedWord = words[Math.floor(Math.random() * words.length)]; //Create a new random word from JSON file
        
        ui.btnStartOver(selectedWord);                                  //Pass the new word to the method in ui
    })

})

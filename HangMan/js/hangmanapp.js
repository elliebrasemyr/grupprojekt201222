import Api from "./hangmanapi.js"
import UI from "./uihangman.js" 
/*===============*/

const api = new Api;
const ui = new UI;

api.getInfo()
.then(data=>{
    const playBtn = document.getElementById('play');
    const words = data.santa;
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    ui.displayWord(selectedWord);
    window.addEventListener('keydown', e =>{
        if(e.keyCode){ 
            ui.keyDown(selectedWord, e)
        }
    })
    playBtn.addEventListener('click', () =>{
        //Create a new random word
        selectedWord = words[Math.floor(Math.random() * words.length)];
        //pass the new word to the method in ui
        ui.btnStartOver(selectedWord);
    })

})

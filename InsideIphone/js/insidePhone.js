class Time{
  static datetime(){
    const clock = document.getElementById("clock");
    clock.innerText = (new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }
}

document.addEventListener('DOMContentLoaded', e =>{
  Time.datetime();
})



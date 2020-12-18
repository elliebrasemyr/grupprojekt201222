function currentTime() {
    let date = new Date(); /* creating object of Date class */
    let hour = date.getHours();
    let min = date.getMinutes();
    
    hour = updateTime(hour);
    min = updateTime(min);
    
    document.getElementById("clock").innerText = `${hour} : ${min}`; /* adding time to the div */
  }
  
  function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
  }
  
  currentTime();
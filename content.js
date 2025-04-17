function sendEvent(e, data={}){
    const problemName = window.location.pathname.split("/problems/")[1]?.split("/")[0] || 'unknown';
chrome.runtime.sendMessage({
    action:"log_event",
    event: {e, ...data, problem: problemName, timestamp: Date.now() }
})
}

//Keystrokes tracker
let lastKeyTime = null

document.addEventListener("keydown", e => {
    const currentTime = Date.now()
    let typingSpeed = null

    if(lastKeyTime !== null){
        typingSpeed = currentTime - lastKeyTime
    }
    lastKeyTime = currentTime;

    sendEvent("keystroke", {
        typingSpeed: typingSpeed
    })
    
})

//Pasting
document.addEventListener("paste",()=>{
    sendEvent("paste")
})

//Tab Switches
 document.addEventListener("visibilitychange", () =>{
    if(document.hidden){
        sendEvent("tab_switch")
    }
    else{
        sendEvent("tab_return")
    }
 })

 //Idle detection
 let lastMove = Date.now()
 
 document.addEventListener('mousemove', () => {
    if (Date.now() - lastMove > 10000){
        sendEvent('idle')
    }
    lastMove = Date.now()
 })
 
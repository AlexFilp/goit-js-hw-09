!function(){refs={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.body};var t=!1,n=null;refs.startBtn.addEventListener("click",(function(){if(t)return;t=!0,n=setInterval((function(){refs.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),refs.stopBtn.addEventListener("click",(function(){clearInterval(n),t=!1}))}();
//# sourceMappingURL=01-color-switcher.95e4ea88.js.map
!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.body},n=!1,e=null;startBtn.disabled=!1,t.startBtn.addEventListener("click",(function(){if(n)return;n=!0,startBtn.disabled=!0,e=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),n=!1,startBtn.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.74ead139.js.map

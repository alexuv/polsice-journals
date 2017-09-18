"use strict";function changeIcon(e){e.target.parentNode.className.includes("active")?e.target.parentNode.classList.remove("icon--active"):e.target.parentNode.className+=" icon--active"}window.onload=function(){for(var e=document.getElementsByClassName("icons"),t=0;t<e.length;t++)e[t].addEventListener("click",changeIcon,!1)};
//# sourceMappingURL=main.js.map

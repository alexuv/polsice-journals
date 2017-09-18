window.onload = function() {
	var elements = document.getElementsByClassName("icons");
	// Array.from(elements).forEach(function(element) {
	// 	element.addEvenetListener("click", changeIcon);
	// });
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener("click", changeIcon, false);
	}
};

function changeIcon(e) {
	if (e.target.parentNode.className.includes("active")) {
		e.target.parentNode.classList.remove("icon--active");
	} else {
		e.target.parentNode.className += " icon--active";
	}
}

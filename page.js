let sectionHeader = document.querySelector("#notes");
let sectionElements = nextUntil(sectionHeader, "h1");

sectionHeader.style.display = "none";
sectionElements.forEach(el => el.style.display = "none");

function nextUntil (elem, selector) {
	var siblings = [];
	elem = elem.nextElementSibling;
	while (elem) {
		if (elem.matches(selector)) { break; }

		siblings.push(elem);
		elem = elem.nextElementSibling;
	}
	return siblings;
};
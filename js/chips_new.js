// Fetch chip template, input field and tags container
const chipTemplate = document.querySelector('#chip-template');
const input = document.querySelector('.tags-input');
const tags = document.querySelector('.tags');

const handleChipInput = (e) => {
	const { value } = e.target;
	// If value doesn't include ',', return
	if (!value.includes(',')) return;
	
	// Clone the chip template node
	const chip = chipTemplate.content.cloneNode(true);
	// Assign value to the chip
	chip.querySelector('.chip-title').textContent = value.split(',')[0];
	// Insert the chip in the tags container before the input element
	tags.insertBefore(chip, input);
	// Reset the value
	e.target.value = '';
}

input.addEventListener('input', handleChipInput);

const removeTags = () =>{
	const myNode = document.querySelector(".tags");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.lastChild);
	}
}

const chipClickHandler = (event) => {
	tags.removeChild(event.currentTarget);
}
var input = document.querySelector(".chip-input");
var chips = document.querySelector(".chips");

input.addEventListener('keypress', (e) => {
	if(e.which == 13){
		var chip = document.createElement('div');
		chip.classList.add('chip');
		chip.addEventListener('click', chipClickHandler);

		var chip_text = document.createElement('span');
		chip_text.classList.add('chip--text');
		chip_text.innerHTML = input.value;

		var chip_button = document.createElement('span');
		chip_button.classList.add('chip--button');
		chip_button.innerHTML = 'X';

		var deleteIcon = document.createElement('img');
		deleteIcon.src = '/assets/cross_icon.svg';
		deleteIcon.style.fill = 'red';
		deleteIcon.width = 10;
		
		// chip_button.append(deleteIcon);

		chip.appendChild(chip_text);
		chip.appendChild(chip_button);
		chips.appendChild(chip);

		input.value = '';
	}
})
  
function chipClickHandler(event){
	chips.removeChild(event.currentTarget);
}
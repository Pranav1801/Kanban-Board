var input = document.querySelector(".chip-input");
var chips = document.querySelector(".chips");

// document.querySelector(".form-field")
//    .addEventListener('click',() => {
//       input.style.display = 'block';
//       input.focus();
//    });
   
// input.addEventListener('blur',()=>{
//   input.style.display = 'none';
// });

// input.addEventListener('keypress', function(event){
// 	if(event.which === 13) {
     
      

//       chips.appendChild(function ()
//       {
//          var _chip = document.createElement('div');

//          _chip.classList.add('chip');
//          _chip.addEventListener('click', chipClickHandler);

//          _chip.append(
//             (function ()
//             {
//                var _chip_text = document.createElement('span');
//                _chip_text.classList.add('chip--text');
//                _chip_text.innerHTML = input.value;

//                return _chip_text;
//             })(),
//             (function ()
//             {
//                var _chip_button = document.createElement('span');
//                _chip_button.classList.add('chip--button');
//                _chip_button.innerHTML = 'x';

//                return _chip_button;
//             })()
//          );

//          return _chip;
//       }());
//       input.value = '';
//    }
// });


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
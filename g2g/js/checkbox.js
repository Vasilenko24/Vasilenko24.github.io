
const district = document.querySelector('#loc-1');
const suburb = document.querySelector('#loc-7');
const village = document.querySelector('#loc-10');
const centrAbr = document.querySelector('#abr-1');
const centrAll = document.querySelector('#trade-36');


    const disabledCheckbox = e => {
        const checkbox = document.querySelectorAll('.checkbox');
        
        checkbox.forEach(checkbox => {
            if (checkbox.name === e.target.name) {
                checkbox.disabled = e.target.checked;
                checkbox.checked = false;
            }
        });
    };

district.addEventListener('click', disabledCheckbox);
suburb.addEventListener('click', disabledCheckbox);
village.addEventListener('click', disabledCheckbox);
centrAbr.addEventListener('click', disabledCheckbox);
centrAll.addEventListener('click', disabledCheckbox);


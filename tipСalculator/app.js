const bill = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.tip');
const customTip = document.querySelector('.custom-tip');
const people = document.getElementById('people');
const tipAmount = document.querySelector('.tip-amount-amount');
const totalAmount = document.querySelector('.total-amount');
const resetButton = document.querySelector('.reset');


bill.addEventListener('input', calculateTip);
people.addEventListener('input', calculateTip);
customTip.addEventListener('input', calculateTip);
resetButton.addEventListener('click', () => {
    bill.value = '';
    people.value = '';
    customTip.value = '';
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
})

customTip.addEventListener('click', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    calculateTip();
})

tipButtons.forEach(button =>{
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        customTip.value = '';
        calculateTip();
    })
})



function calculateTip() {
    let billAmount = parseFloat(bill.value);
    let numberOfPeople = parseInt(people.value);
    let tipPercentage = 0;
    const activeTipButton = document.querySelector('.tip.active');
    
    if (activeTipButton) {
        tipPercentage = parseFloat(activeTipButton.value) / 100;
    } else if (customTip.value) {
        tipPercentage = parseFloat(customTip.value) / 100;
    }
     const tipPerPerson = (billAmount * tipPercentage) / numberOfPeople;
     const totalPerPerson = (billAmount / numberOfPeople) + tipPerPerson;
     
  if (numberOfPeople > 0 && billAmount > 0) {
    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipAmount.textContent = '$0.00';
    totalAmount.textContent = '$0.00';
  }
}


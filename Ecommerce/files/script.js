document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('btn');
    const menu = document.getElementById('menu');
    const menuItems = menu.querySelectorAll('a');
    const nav = document.querySelector('nav');

    button.addEventListener('click', function() {
        menuItems.forEach(function(item) {
            if (item.style.display === 'none' || item.style.display === '') {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        nav.classList.toggle('expanded');
        adjustSectionPadding();
    });

    function adjustSectionPadding() {
        const navHeight = nav.offsetHeight;
        document.querySelectorAll('section').forEach(function(section) {
            section.style.paddingTop = `${navHeight}px`;
        });
    }
});

const cat = document.getElementById('cat');
const dropdown = document.getElementById('dropdown');
const lgnBtn = document.getElementById('lgn-btn');
const loginForm = document.getElementById('login-form');
const sections = document.getElementsByTagName('section');
const mainCartBtn = document.getElementById('mainCart-btn');
const cart = document.getElementById('cart');
const cartArray = [];
const cartButtons = Array.from(document.getElementsByClassName('cart-btn'));
const cards = Array.from(document.getElementsByClassName('card-title'));
const amts = Array.from(document.getElementsByClassName('amount'));
const cartTable = document.getElementById('cart-table');
const crosses = document.getElementsByClassName('cross');
const tot_amt = document.getElementById("tot_amt");

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);
});

document.getElementById('popup').addEventListener('click', function() {
    this.remove();
});

cat.addEventListener('mouseover', function () {
    dropdown.style.display = 'block';
});

dropdown.addEventListener('mouseover', function () {
    dropdown.style.display = 'block';
});

dropdown.addEventListener('mouseout', function () {
    dropdown.style.display = 'none';
});

cat.addEventListener('mouseout', function () {
    dropdown.style.display = 'none';
});

const blurTheSections = function() {
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        section.style.filter = 'blur(5px)';
    }
}

const unblurTheSections = function() {
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        section.style.filter = 'none';
    }
}

lgnBtn.addEventListener('click', function () {
    loginForm.style.display = 'block';
    blurTheSections();
});

mainCartBtn.addEventListener('click', function () {
    cart.style.display = 'block';
    blurTheSections();
});

document.addEventListener('click', function (e) {
    const isClickOutsideLoginForm = !loginForm.contains(e.target) && e.target !== lgnBtn && e.target !== mainCartBtn;
    const isClickOutsideCart = !cart.contains(e.target) && e.target !== mainCartBtn && e.target !== lgnBtn;

    if (isClickOutsideLoginForm && loginForm.style.display === 'block') {
        loginForm.style.display = 'none';
        unblurTheSections();
    }

    if (isClickOutsideCart && cart.style.display === 'block') {
        cart.style.display = 'none';
        unblurTheSections();
    }
});

let count = 1;
let total = 0;

cartButtons.forEach((btn, indexOfBtn) => {
    btn.addEventListener("click", () => {
        let valueItem = cards[indexOfBtn].innerHTML;
        let amountString = amts[indexOfBtn].innerHTML;
        let intAmount = parseInt(amountString.replace(/,/g, ''));
        total += intAmount;
        tot_amt.innerHTML = "₹" + total;
        cartArray.push(valueItem);
        console.log(cartArray);

        let newRow = cartTable.insertRow();
        let firstCell = newRow.insertCell(0);
        let secondCell = newRow.insertCell(1);
        let thirdCell = newRow.insertCell(2);
        let fourthCell = newRow.insertCell(3);

        firstCell.innerHTML = count++;
        secondCell.innerHTML = valueItem;
        thirdCell.innerHTML = amountString;
        fourthCell.innerHTML = "<img src='../images/pngegg.png' class='cross'>";
    });
});

cartTable.addEventListener('click', function(event) {
    if (event.target.classList.contains('cross')) {
        event.stopPropagation();
        let row = event.target.parentElement.parentElement;
        let item = row.cells[1].innerHTML;
        let amountString = row.cells[2].innerHTML;
        let intAmount = parseInt(amountString.replace(/,/g, ''));

        let itemIndex = cartArray.indexOf(item);
        if (itemIndex > -1) {
            cartArray.splice(itemIndex, 1);
        }

        total -= intAmount;
        tot_amt.innerHTML = "₹" + total;

        row.parentElement.removeChild(row);

        if (cartArray.length === 0) {
            count = 1;
        }
    }
});

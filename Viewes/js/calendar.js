var date = new Date;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
"October", "November", "December"];
var monthIndex = date.getMonth();
var currentYear = date.getFullYear();
var month = monthNames[monthIndex];
var monthName = document.querySelector("h1");
monthName.innerText = month + " " + currentYear;
setDays(date);

function setDays(date) {
    var days = new Date(date);
    days.setDate(1);
    days.setDate(1-days.getDay());
    var daysMonth = document.querySelectorAll(".day-number");
    daysMonth.forEach(function(element) {
        if(days.getMonth() !== date.getMonth()) {
            element.style.color = "gray";
        } else {
            element.style.color = "";
        }

        element.innerText = days.getDate();

        var dayOfMonth = days.getDate();
        days.setDate(dayOfMonth + 1);  
    })
}

var buttonPrev = document.querySelector(".prev");
buttonPrev.addEventListener('click', () => {
    monthIndex = date.getMonth() - 1;
    date.setMonth(monthIndex);
    month = monthNames[date.getMonth()];

    var monthName = document.querySelector("h1");
    monthName.innerText = month + " " + date.getFullYear();
    setDays(date);
});

var buttonNext = document.querySelector(".next");
buttonNext.addEventListener('click', () => {
    monthIndex = date.getMonth() + 1;
    date.setMonth(monthIndex);
    month = monthNames[date.getMonth()];
    
    var monthName = document.querySelector("h1");
    monthName.innerText = month + " " + date.getFullYear();
    setDays(date);
});


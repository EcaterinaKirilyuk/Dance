var date = new Date;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
"October", "November", "December"];
var monthIndex = date.getMonth();
var month = monthNames[monthIndex];
var monthName = document.querySelector("h1");
monthName.innerText = month + " " + date.getFullYear();
setDays(date);

var calendarData = new Map();
calendarData.set("token", localStorage.token);
calendarData.set("month", date.getMonth() +1); 
calendarData.set("year", date.getFullYear());

get(calendarData, "calendar/training/list", onSuccessUpdateCalendar);

function onSuccessUpdateCalendar() {
    var response = JSON.parse(this.response);
    if (response.success == true) {
        console.log(response);
        var blockNumbers = document.querySelectorAll("div.day-number");
        blockNumbers.forEach(function(element) {

            if(response.list.length === 0) {
                return;
            }
        
            do {
                var row = response.list[0];

                if (element.dataset.fulldate === row.datetime.substr(0, 10)) {
                    var event = createEvent (row.datetime.substr(11, 5), row.style.toLowerCase(), row.clients);
                    event.addEventListener("click", function (e) {
                        var timeInput = document.querySelector('#DeleteModal input[name="time"]');
                        timeInput.value = e.currentTarget.children[0].innerText;
                        var styleInput = document.querySelector('#DeleteModal input[name="style"]');
                        styleInput.value = e.currentTarget.children[1].innerText;
                        var dateInput = document.querySelector('#DeleteModal input[name="date"]');
                        var fullDate = e.currentTarget.parentElement.previousElementSibling.dataset.fulldate;
                        dateInput.value = fullDate;
                        deleteModal.style.display = "block";
                    });
                    element.nextElementSibling.appendChild(event);
                    response.list.shift(0);
                }

            } while(response.list.length > 0 && element.dataset.fulldate === row.datetime.substr(0, 10));
        })
    }
}

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

        if(days.getMonth() + 1 < 10) {
            element.dataset.month = "0" + (days.getMonth() + 1);
        } else {
            element.dataset.month = days.getMonth() + 1;
        }

        if(days.getDate() + 1 < 10) {
            element.dataset.date = "0" + days.getDate();
        } else {
            element.dataset.date = days.getDate();
        }

        element.dataset.year = days.getFullYear();
        element.dataset.fulldate = days.getFullYear() + "-" + element.dataset.month + "-" + element.dataset.date;
        element.innerText = days.getDate();

        var dayOfMonth = days.getDate();
        days.setDate(dayOfMonth + 1);  
    })
}

function createEvent (time, style, count) {
    var eventBlock = document.createElement("div");
    eventBlock.className="event";

    var timeBlock = document.createElement("div");
    var styleBlock = document.createElement("div");
    var countBlock = document.createElement("div");


    eventBlock.appendChild(timeBlock);
    timeBlock.innerText=time;
    eventBlock.appendChild(styleBlock);
    styleBlock.innerText=style;
    eventBlock.appendChild(countBlock);
    countBlock.innerText=count;

    return eventBlock;
}

function appentEventToList () {
    // createEvent (time, style, count);
    var list = document.querySelectorAll("div.list");
    list.appendChild(eventBlock);
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



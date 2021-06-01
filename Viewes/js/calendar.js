var date = new Date;
date.setDate(15);
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", 
"October", "November", "December"];
var month = monthNames[date.getMonth()];
var monthName = document.querySelector("h1");
monthName.innerText = month + " " + date.getFullYear();
setDays(date);
manageTrainings();


function manageTrainings() {
    var elemEvents = document.querySelectorAll("div.event");
    elemEvents.forEach(function(elem){
        elem.remove();
    })

    var calendarData = new Map();
    calendarData.set("token", localStorage.token);
    calendarData.set("month", date.getMonth() +1); 
    calendarData.set("year", date.getFullYear());
    
    get(calendarData, "calendar/training/list", onSuccessUpdateCalendar);
}

function onSuccessUpdateCalendar() {
    var response = JSON.parse(this.response);
    if (response.success == true) {
        var tokenData = new FormData();
        tokenData.set("token", localStorage.token); 
        post(tokenData, "user/type", function() {
            var responseUserType = JSON.parse(this.response);
            if(responseUserType.success == true) {
                var blockNumbers = document.querySelectorAll("div.day-number");

                if(responseUserType.type == "TRAINER")
                {
                    blockNumbers.forEach(function(element) {
                        appendDataToBlocks(element, response.list, function (e) {
                            appendDataToDeleteModal(e.currentTarget);
                            deleteModal.style.display = "block";
                        });
                    });
                } else {
                    blockNumbers.forEach(function(element) {
                        appendDataToBlocks(element, response.list, function (e) {
                            var eventBlock = e.currentTarget;


                            

                            if(eventBlock.dataset.registered == 1) {
                                var trainingData = new Map();
                                trainingData.set("token", localStorage.token);
                                var trainingId = eventBlock.dataset.id;
                                trainingData.set("training_id", trainingId);

                                del(trainingData, "calendar/training/register", function(event) {
                                    unsubcribe(event.currentTarget, eventBlock);
                                });

                            } else {
                                var trainingData = new FormData();
                                trainingData.set("token", localStorage.token);
                                var trainingId = eventBlock.dataset.id;
                                trainingData.set("training_id", trainingId);

                                post(trainingData, "calendar/training/register", function(event) {
                                    subcribe(event.currentTarget, eventBlock);
                                });
                            }

                        });
                    });
                }
            }
        });
        
    }
}

function unsubcribe(xmlHttpRequest, element) {
    var responseUnsubcribe = JSON.parse(xmlHttpRequest.response);
    if(responseUnsubcribe.success == true) {
        element.style.backgroundColor=null;
        element.dataset.registered=0;
        element.children[2].innerText = Number(element.children[2].innerText)-1;

    }
}

function subcribe(xmlHttpRequest, element) {
    var responseUnsubcribe = JSON.parse(xmlHttpRequest.response);
    if(responseUnsubcribe.success == true) {
        element.style.backgroundColor="var(--kepel)";
        element.dataset.registered=1;
        element.children[2].innerText = Number(element.children[2].innerText)+1;
    }
}



/**
 * 
 * @param {Element} element 
 * @param {Array} list
 * @param {Function} eventClickHandler
 * @returns 
 */
function appendDataToBlocks(element, list, eventClickHandler) {
    if(list.length === 0) {
        return;
    }

    do {
        var row = list[0];

        if (element.dataset.fulldate === row.datetime.substr(0, 10)) {
            var event = createEvent (row.datetime.substr(11, 5), row.style.toLowerCase(), row.clients, row.id, row.registered);
            event.addEventListener("click", eventClickHandler);
            element.nextElementSibling.appendChild(event);
            list.shift(0);
        }

    } while(list.length > 0 && element.dataset.fulldate === row.datetime.substr(0, 10));
}

/**
 * 
 * @param {Element} eventTarget 
 */
function appendDataToDeleteModal(eventTarget) {
    var idInput = document.querySelector('#DeleteModal input[name="id"]');
    idInput.value = eventTarget.dataset.id;
    var timeInput = document.querySelector('#DeleteModal input[name="time"]');
    timeInput.value = eventTarget.children[0].innerText;
    var styleInput = document.querySelector('#DeleteModal input[name="style"]');
    styleInput.value = eventTarget.children[1].innerText;
    var dateInput = document.querySelector('#DeleteModal input[name="date"]');
    var fullDate = eventTarget.parentElement.previousElementSibling.dataset.fulldate;
    dateInput.value = fullDate;
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

        if(days.getDate() < 10) {
            element.dataset.date = "0" + days.getDate();
        } else {
            element.dataset.date = days.getDate();
        }

        element.dataset.year = days.getFullYear();
        element.dataset.fulldate = days.getFullYear() + "-" + element.dataset.month + "-" + element.dataset.date;
        element.innerText = days.getDate();

        var dayOfMonth = days.getDate();
        days.setDate(dayOfMonth + 1);  
    });
}

function createEvent (time, style, count, id, registered) {
    var eventBlock = document.createElement("div");
    eventBlock.className="event";
    eventBlock.dataset.id = id;
    eventBlock.dataset.registered = registered;
    if (registered == true) {
        eventBlock.style.backgroundColor="var(--kepel)";
    }

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

var buttonPrev = document.querySelector(".prev");
buttonPrev.addEventListener('click', () => {
    changeMonth(date.getMonth() - 1);
});

var buttonNext = document.querySelector(".next");
buttonNext.addEventListener('click', () => {
    changeMonth(date.getMonth() + 1);
});

function changeMonth(monthIndex) {
    date.setDate(15);
    date.setMonth(monthIndex);
    month = monthNames[date.getMonth()];
    
    var monthName = document.querySelector("h1");
    monthName.innerText = month + " " + date.getFullYear();
    setDays(date);
    manageTrainings();

}



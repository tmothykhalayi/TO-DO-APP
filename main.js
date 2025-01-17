// variables
let mainBody = document.querySelector(".main-body")
let lightMode = document.getElementById("light");
let taskInput = document.getElementById("input");
let headingNote = document.querySelector(".note")
let taskContent = document.querySelector(".task-content")
let checkSign = document.getElementsByClassName("check")
let crossSign = document.querySelector(".delete")
let leftTasks = document.querySelector(".number")
let statusArray = Array.from(document.querySelectorAll(".status span"))
let allFilterButton = document.querySelector(".status .all")
let activeFilterButton = document.querySelector(".status .actived")
let completedFilterButton = document.querySelector(".status .completed")
let deleteAllButton = document.querySelector(".delete-all")


// functions
// ============================================================================


// events on loading
let dcsfv = document.querySelectorAll(".task-input label")


// dcsfv.innerHTML.style.backgroundColor = "  hsl(235, 21%, 11%)"

console.log(dcsfv)

document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementsByClassName('.task-input');
    if (element) {
        element.style.color = 'red'; // Example of manipulating the style
    } else {
        console.error('Element not found!');
    }
});

window.onload = function () {

    taskInput.focus()

    headingNote.innerHTML = "create a new todo ..."

    getFinishedTasks()

    getStoredTasks()

    countOfRemainingTasks()

    reset()

    LightMode()

    changeIcon()

    fitting(mediaQuery)

}

storeSatusColor()

getStoredSatusColor()



// ============================================================================


taskInput.onfocus = function () {

    headingNote.innerHTML = "currently typing"

}



// ================================================================================

// enter input value by clicking "enter press"

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        event.preventDefault()

        enteringValues()
    }

})

// enter input value by "on blur event"

taskInput.onblur = enteringValues


function enteringValues() {

    if (taskInput.value == "") {

        // swal("Oops", "You Have to Add a Task !", "error")
        headingNote.innerHTML = "create a new todo ..."


    } else {

        headingNote.innerHTML = "create a new todo ..."

        storeTask()

        addingNewTask(taskInput.value)
        taskInput.value = ""

        countOfRemainingTasks()


    }
}
//================================================================================

// Adding New Task

function addingNewTask(taskcontent) {
    let taskContainer = document.createElement("div")
    taskContainer.className = "task"


    // add tasks 

    let checkDiv = document.createElement("div")
    checkDiv.className = "check"

    // drag attribute

    checkDiv.setAttribute("draggable", "true")

    let taskElement = document.createElement("label")
    taskElement.className = "label"
    let inputText = document.createTextNode(taskcontent)
    taskElement.appendChild(inputText)

    let doneSign = document.createElement("img")
    doneSign.src = "./images/icon-check.svg"
    doneSign.className = "ok"

    checkDiv.appendChild(taskElement)
    checkDiv.appendChild(doneSign)

    taskContainer.appendChild(checkDiv)

    // add cross sign
    let crossSign = document.createElement("img")
    crossSign.src = "./images/icon-cross.svg"
    crossSign.className = "delete"

    taskContainer.appendChild(crossSign)

    taskContent.appendChild(taskContainer)
}

//================================================================================


// complete task + delete task

document.addEventListener("click", function (e) {

    if (e.target.parentNode.classList.contains("check")) {

        e.target.parentNode.classList.toggle("finished")

        countOfRemainingTasks()

        window.localStorage.setItem(e.target.innerHTML, "finished")



        if (!e.target.parentNode.classList.contains("finished")) {

            for (let [key, value] of Object.entries(localStorage)) {

                if (e.target.innerHTML === key) {

                    window.localStorage.removeItem(key)

                    window.localStorage.setItem(e.target.innerHTML, "tasks")
                }


            }

        }

    }


    if (e.target.classList.contains("delete")) {

        let content = e.target.previousSibling.children[0].innerHTML

        for (let [key, value] of Object.entries(localStorage)) {

            if (content === key)

                window.localStorage.removeItem(key)
        }

        e.target.parentNode.remove()

        countOfRemainingTasks()

    }

})


//================================================================================

// delete all


document.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-full")) {

        taskContent.innerHTML = ""

        window.localStorage.clear()

        countOfRemainingTasks()

        reset()

    }

})

// delete completed tasks

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("delete-all")) {

        if (window.localStorage.length) {

            for (let [key, value] of Object.entries(localStorage)) {

                if (value === "finished") {

                    window.localStorage.removeItem(key)

                }
            }

            taskContent.innerHTML = ""

            for (let [key, value] of Object.entries(localStorage)) {

                if (value === "tasks") {

                    addingNewTask(key)

                }
            }

        }

    }

})





//================================================================================

// count left tasks

function countOfRemainingTasks() {

    let remainingTasks = Array.from(checkSign).filter(function (e) {

        if (!e.classList.contains("finished")) {

            return e
        }

    })

    leftTasks.innerHTML = remainingTasks.length
}

//================================================================================

// store tasks in local storage
function storeTask() {

    window.localStorage.setItem(taskInput.value, "tasks")


}

function getStoredTasks() {

    if (window.localStorage.length) {

        for (let [key, value] of Object.entries(localStorage)) {

            if (value === "tasks") {
                addingNewTask(key)
            }

        }
    }
}



function getFinishedTasks() {

    if (window.localStorage.length) {

        for (let [key, value] of Object.entries(localStorage)) {

            if (value === "finished") {

                addingNewTask(key)

                Array.from(checkSign).forEach(ele => {

                    if (key === ele.childNodes[0].innerHTML) {

                        ele.classList.add("finished")

                    }
                });

            }

        }
    }
}

//================================================================================

// storeColor


function storeSatusColor() {

    document.addEventListener("click", function (ee) {

        statusArray.forEach(elem => {

            elem.classList.remove("active")


        })

        if (ee.target.parentNode.classList.contains("status")) {

            ee.target.classList.add("active")

            window.localStorage.setItem("class", ee.target.innerHTML)
        }
    })
}


function getStoredSatusColor() {

    if (window.localStorage.getItem("class")) {

        statusArray.forEach(elem => {

            for (let [key, value] of Object.entries(localStorage)) {

                if (elem.innerHTML === value) {

                    elem.classList.add("active")

                }

            }

        })

    }
}
//================================================================================
// reset 

function reset() {

    statusArray.forEach(elem => {

        window.localStorage.removeItem("class")

        elem.classList.remove("active")

        statusArray[0].classList.add("active")
    })

}
//================================================================================

// filter
allFilterButton.addEventListener("click", function () {

    taskContent.innerHTML = ""

    getFinishedTasks()

    for (let [key, value] of Object.entries(localStorage)) {

        if (key !== "class" && value !== "finished" && key !== "moon") {

            addingNewTask(key)

        }
    }

})


activeFilterButton.addEventListener("click", function () {

    taskContent.innerHTML = ""

    for (let [key, value] of Object.entries(localStorage)) {


        if (value == "tasks") {


            addingNewTask(key)

        }

    }
})

completedFilterButton.addEventListener("click", function () {

    taskContent.innerHTML = ""

    getFinishedTasks()

})
//================================================================================

// light Mode

let moonMode = "./images/icon-moon.svg"
let sunMood = "./images/icon-sun.svg"

let darkModeMainColor = "hsl(235, 24%, 19%)"
let lightModeMainColor = "hsl(0, 0%, 98%)"


lightMode.addEventListener("click", function () {

    window.localStorage.setItem("moon", lightMode.getAttributeNode("src").nodeValue)

    changeIcon()

})




function changeIcon() {

    lightMode.getAttributeNode("src").nodeValue == moonMode ? dark() : sun();
    fitting(mediaQuery)
}


function dark() {
    lightMode.setAttribute("src", sunMood)
    mainBody.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')"
    mainBody.style.backgroundColor = "  hsl(235, 21%, 11%)"
    taskContent.style.backgroundColor = darkModeMainColor
    taskInput.parentNode.style.backgroundColor = darkModeMainColor
    taskInput.style.backgroundColor = darkModeMainColor
    leftTasks.parentElement.parentElement.style.backgroundColor = darkModeMainColor
    Array.from(document.getElementsByClassName("footer")).forEach(element => {
        element.children[2].style.backgroundColor = darkModeMainColor

    });

}

function sun() {
    lightMode.setAttribute("src", moonMode)
    mainBody.style.backgroundImage = "url('./images/bg-desktop-light.jpg')"
    mainBody.style.backgroundColor = " hsl(236, 33%, 92%)"
    taskContent.style.backgroundColor = lightModeMainColor
    taskInput.parentNode.style.backgroundColor = lightModeMainColor
    taskInput.style.backgroundColor = lightModeMainColor
    leftTasks.parentElement.parentElement.style.backgroundColor = lightModeMainColor
    Array.from(document.getElementsByClassName("footer")).forEach(element => {
        element.children[2].style.backgroundColor = lightModeMainColor

    });
}





function LightMode() {


    for (let [key, value] of Object.entries(localStorage)) {

        if (key == "moon") {

            lightMode.setAttribute("src", value)
        }

    }
}



//================================================================================

// media Query

let mediaQuery = window.matchMedia('(max-width: 768px)')

function fitting(e) {

    if (e.matches) {

        if (lightMode.getAttributeNode("src").nodeValue == moonMode) {


            mainBody.style.backgroundImage = "url('./images/bg-mobile-light.jpg')"

        } else {

            mainBody.style.backgroundImage = "url('./images/bg-mobile-dark.jpg')"

        }

    } else {

        if (lightMode.getAttributeNode("src").nodeValue == moonMode) {


            mainBody.style.backgroundImage = "url('./images/bg-desktop-light.jpg')"

        } else {

            mainBody.style.backgroundImage = "url('./images/bg-desktop-dark.jpg')"

        }
    }

}

mediaQuery.addListener(fitting)

fitting(mediaQuery)


//======================================================================
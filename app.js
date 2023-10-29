const form = document.forms[0];
const years = document.getElementsByClassName("agespan")[0];
const months = document.getElementsByClassName("agespan")[1];
const days = document.getElementsByClassName("agespan")[2];
const monthsList = [31,28,31,30,31,30,31,31,30,31,30,31];
var error = false;
form.addEventListener("submit",function(){
    event.preventDefault();
    if (error==true){
        for (let i=0;i<3; i++){
            form[i].style.borderColor="hsl(0, 0%, 8%)";
            form.getElementsByTagName("label")[i].style.color="hsl(0, 0%, 8%)";
        }
        text=form.querySelectorAll("p");
        for (let i=0; i<text.length;i++){
            text[i].remove();
        }
    }
    if (validForm()===true){
        ageCalculate();
        error = false;
    }
    else{
        error = true;
    }
})

function validForm(){
    var day = parseInt(form.elements[0].value);
    var month = parseInt(form.elements[1].value);
    var year = parseInt(form.elements[2].value);
    var birth = new  Date(`${year}-${month}-${day}`);
    var date = new Date();
    var valid = true;
    if (isNaN(month)){
        valid = false;
        const para = document.createElement("p");
        const node = document.createTextNode("This field is required");
        para.appendChild(node);
        const dayDiv = document.getElementById("monthDiv");
        dayDiv.appendChild(para);
        form[1].style.borderColor = "hsl(0, 100%, 67%)";
        form.getElementsByTagName("label")[1].style.color= "hsl(0, 100%, 67%)";
    }
    else if((month<1)||(month>12)){
        valid = false;
        const para = document.createElement("p");
        const node = document.createTextNode("Must be a valid month");
        para.appendChild(node);
        const dayDiv = document.getElementById("monthDiv");
        dayDiv.appendChild(para);
        form[1].style.borderColor = "hsl(0, 100%, 67%)";
        form.getElementsByTagName("label")[1].style.color= "hsl(0, 100%, 67%)";
    }
    if (isNaN(year)){
        valid = false;
        const para = document.createElement("p");
        const node = document.createTextNode("This field is required");
        para.appendChild(node);
        const dayDiv = document.getElementById("yearDiv");
        dayDiv.appendChild(para);
        form[2].style.borderColor = "hsl(0, 100%, 67%)";
        form.getElementsByTagName("label")[2].style.color= "hsl(0, 100%, 67%)";
    }
    else if(year>date.getFullYear()){
        valid = false;
        const para = document.createElement("p");
        const node = document.createTextNode("Must be in the past");
        para.appendChild(node);
        const dayDiv = document.getElementById("yearDiv");
        dayDiv.appendChild(para);
        form[2].style.borderColor = "hsl(0, 100%, 67%)";
        form.getElementsByTagName("label")[2].style.color= "hsl(0, 100%, 67%)";
    }
    if (isNaN(day)){
        valid = false;
        const para = document.createElement("p");
        const node = document.createTextNode("This field is required");
        para.appendChild(node);
        const dayDiv = document.getElementById("dayDiv");
        dayDiv.appendChild(para);
        form[0].style.borderColor = "hsl(0, 100%, 67%)";
        form.getElementsByTagName("label")[0].style.color= "hsl(0, 100%, 67%)";
    }
    else if((day<1) || (day>31)){
        valid = false;
        const para = document.createElement("p");
        const node = document.createTextNode("Must be a valid day");
        para.appendChild(node);
        const dayDiv = document.getElementById("dayDiv");
        dayDiv.appendChild(para);
        form[0].style.borderColor = "hsl(0, 100%, 67%)";
        form.getElementsByTagName("label")[0].style.color= "hsl(0, 100%, 67%)";
    }
    else if((day>monthsList[month-1])){
        valid = false;
        const para = document.createElement("p");
        const node = document.createTextNode("Must be a valid date");
        para.appendChild(node);
        const dayDiv = document.getElementById("dayDiv");
        dayDiv.appendChild(para);
        for (let i=0; i<3; i++){
            form[i].style.borderColor= "hsl(0, 100%, 67%)";
            form.getElementsByTagName("label")[i].style.color= "hsl(0, 100%, 67%)";
        }
    }
    return valid;
}


function ageCalculate(){
    var day = parseInt(form.elements[0].value);
    var month = parseInt(form.elements[1].value);
    var year = parseInt(form.elements[2].value);
    var birth = new  Date(`${year}-${month}-${day}`);
    var date = new Date();
    ageDate = new Date(date-birth);
    years.innerText = parseInt(ageDate.getFullYear()-1970);
    months.innerText = parseInt(ageDate.getMonth());

    actualDay = date.getDate();
    if (actualDay<day){
        days.innerText = actualDay+monthsList[date.getMonth()]-day
    }
    else if (actualDay>day){
        days.innerText = actualDay-day;
    }
    else{
        days.innerText = 0;
    }
}
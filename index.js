
var isThePageEmpty = 0;
var taskNumber = 0;
var inputId = "1";
var colorId = "1";
var inputIdString = "";
var addInputString = "";
var oldInput = "";
var newInput = "";
var deleteButtonId = "1";
var editButtonId = "1";
var ulId = "1";
var timeId = "1";
var deleteString = "";
var deleteNumber = "";
var editString = "";
var editNumber = "";
var saveChangesButtonId = "";
var imageSrc = "images/red-dot.png";
var isEditEnabled = "false";

  

$(window).on('beforeunload', isListEmpty)  
{  
    isListEmpty();
}

// Adds to the dropdown-button event listeners for the color select
$("#dropdown-button").click(function() {
    $("#img-red").click(updateColorSButtonRed);
    $("#img-blue").click(updateColorSButtonBlue);
    $("#img-green").click(updateColorSButtonGreen);
    $("#img-yellow").click(updateColorSButtonYellow);
});

function isListEmpty() {
    if(isThePageEmpty === 0) {
        $("#color-select").hide();
        $("#add-input").hide();
        $("#add-button").hide();
        $(".colors").hide();
        $("#empty-page-button").show();
        $("#empty-page-image").show();
    }
    else{
        $("#empty-page-button").hide();
        $("#empty-page-image").hide();
        $("#color-select").show();
        $("#add-input").show();
        $("#add-button").show();
        $(".colors").show();
    }
}

function addFirstItem() {
    $("#empty-page-button").hide();
    $("#empty-page-image").hide();
    $("#color-select").show();
    $("#img-main").show();
    $("#dropdown-button").show();
    $("#add-input").show();
    $("#add-button").show();
    $(".colors").show();

    // $("#img-red").click(updateColorSButtonRed);
    // $("#img-blue").click(updateColorSButtonBlue);
    // $("#img-green").click(updateColorSButtonGreen);
    // $("#img-yellow").click(updateColorSButtonYellow);
}

$("#empty-page-button").click(addFirstItem);
$("#add-button").click(handleClick);

function handleClick() {
    var addInput = $("#add-input")[0].value;

    $("#add-input")[0].value = "";

    if(addInput != "") {
        addNewTask(addInput);
    }
    else {
        alert("Please enter a value");
    }
    
}

function addNewTask(addInput) {
    taskNumber++;
    isThePageEmpty++;
    addInputString = addInput;

    // $("#img-red").click(updateColorSButtonRed);
    // $("#img-blue").click(updateColorSButtonBlue);
    // $("#img-green").click(updateColorSButtonGreen);
    // $("#img-yellow").click(updateColorSButtonYellow);

    $(".list").append('<ul id = "moment" class="new-ul"></ul>');
    ulId = "ul" + taskNumber;
    $('#moment').attr('id', ulId);
    appendItem();
}

function appendItem() {
    
    colorId = "color" + taskNumber;
    $('#' + ulId).append('<li id="color-li" class = "color-li"><a href="#"><img id="temp-id" class="dot-images" src="'+imageSrc+'"></a></li>');
    $('#temp-id').attr('id', colorId);
    $("#img-main").attr('src' , 'images/red-dot.png');
    imageSrc = "images/red-dot.png";
    

    inputId = "input" + taskNumber;
    $('#' + ulId).append('<li id = "wait" class="item" >'+addInputString+'</li>');
    $('#wait').attr('id', inputId);

    deleteButtonId = "delete-button" + taskNumber;
    $('#' + ulId).append('<button id = "holdon" class="delete-button"></button>');
    $('#holdon').attr('id', deleteButtonId);
    $('#' + deleteButtonId).click(deleteButton);

    editButtonId = "edit-button" + taskNumber;
    $('#' + ulId).append('<button id = "something" class="edit-button"></button>');
    $('#something').attr('id', editButtonId);
    $('#' + editButtonId).click(editButton);

    timeId = "time" + taskNumber;
    var timeCreated = timeConverter(new Date().getTime());
    $('#' + ulId).append('<br><span id="time" class = "time" text-align: left;>'+timeCreated+'</span>');
    $('#time').attr('id', timeId);
}

function deleteButton(button) {
    deleteString = '#' + button.currentTarget.id;
    deleteNumber = (deleteString[deleteString.length - 1]);
    $('#ul' + deleteNumber).remove();
    isThePageEmpty--;
    isListEmpty();
}

function editButton(button) {

    if(isEditEnabled == "false")
    {
        isEditEnabled = "true";

        $("#color-select").hide();
        $("#img-main").hide();
        $("#dropdown-button").hide();
        $("#add-input").hide();
        $("#add-button").hide();

        editString = '#' + button.currentTarget.id;

        if(editString.length === 13){
            editNumber = (editString[editString.length - 1]);
        }
        else {
            editNumber = (editString[editString.length - 2] + "" + editString[editString.length - 1]);
        }

        inputId = "textBoxInput" + editNumber;
        ulId = "ul" + editNumber;
        $('#' + ulId).addClass("margin-buttom-50");

        
        

        oldInput = $('#input' + editNumber)[0].innerHTML;
        $('#' + ulId).append('<div id = "div33" class = "center" ><input id="'+inputId+'" type="text" class="new-task-edit task-edit" "></input><br></div>');
        $('#' + inputId).val(oldInput);
        
        saveChangesButtonId = "saveChangesButton" + editNumber;
        $('#' + ulId).append('<div id = "div33" class = "center" ><button id="'+saveChangesButtonId+'" class="save-changes-button" ">save</button></div>');

        $('#' + saveChangesButtonId).click(saveChanges);
    }
    
}

function saveChanges() {
    newInput = $('#' + inputId)[0].value;
    $('#input' + editNumber).text(newInput);
    $('#' + inputId).remove();
    $('#' + saveChangesButtonId).remove();
    $("#color-select").show();
    $("#img-main").show();
    $("#dropdown-button").show();
    $("#add-input").show();
    $("#add-button").show();
    $('#' + ulId).removeClass("margin-buttom-50");
    isEditEnabled = "false";
    $('#div33').remove();
    $('#div33').remove();
}

// Using unix timestamp, converting it into date and time
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date + ', ' + ' ' + hour + ':' + min ;
    return time;
}

function updateColorSButtonRed() {
    $("#img-main").attr('src' , 'images/red-dot.png');
    imageSrc = "images/red-dot.png";
    console.log("red clicked, arc is: " + imageSrc);
}

function updateColorSButtonBlue() {
    $("#img-main").attr('src' , 'images/blue-dot.png');
    imageSrc = "images/blue-dot.png";
    console.log("blue clicked, arc is: " + imageSrc);
}

function updateColorSButtonGreen() {
    $("#img-main").attr('src' , 'images/green-dot.png');
    imageSrc = "images/green-dot.png";
    console.log("green clicked, arc is: " + imageSrc);
}

function updateColorSButtonYellow() {
    $("#img-main").attr('src' , 'images/yellow-dot.png');
    imageSrc = "images/yellow-dot.png";
    console.log("yellow clicked, arc is: " + imageSrc);
}


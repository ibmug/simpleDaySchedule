//Lets create a block for each day. 
//Each block consists of three things.
//Hour, Comments, Button to save.
//We need to show the color of the current hour.
//Create a div for each hour(12 in total)


///First thing we must do is show the current date.
//Straight from W3 Shool
//var d = new Date();
var d = moment().format("MMM Do YYYY");  ;
console.log(d);
// var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//var dateString = days[d.getDay()] +" "+ d.getDate() + " "+ months[d.getMonth()] + " " + d.getFullYear();
//var currentHour = d.getHours(); //Used to track which of the days we'll color gray, blue or green.
var currentHour = moment().format('h');
var dateString = d;
console.log(currentHour);
$("#currentDay").text(dateString);

console.log(dateString);
console.log(currentHour);



//Lets create a simple block for the first day and see how that looks
for(var i = 0; i<24;i++){
    var rowEl = $("<div>");
rowEl.addClass("row");
rowEl.prop('id',"row-"+i);
var dateEl = $("<div>");
dateEl.addClass("hour");
dateEl.text((i+1)+":00");
var commentEl = $("<textarea>");
commentEl.addClass('description')


//console.log(currentHour);
if(i < currentHour-1){
    //commentEl.css("background-color", "#d1d1d1");
    commentEl.addClass('past');
} else if(i=== Math.floor(currentHour-1)){

    commentEl.addClass('present');
}else if(i > currentHour-1){
    commentEl.addClass('future');
}

commentEl.addClass("col-8");
var comment = "This is a placeholder for something to do...";
//commentEl.text(comment);
commentEl.prop('placeholder', comment);
var buttonEl = $("<button>");//Maybe add an image to the button?
buttonEl.prop('id', i);
buttonEl.addClass("saveBtn");
buttonEl.html('<i class="far fa-save"></i>')
var container = $("#hourDetail")

//container.addClass("time-block");
rowEl.append(dateEl);
rowEl.append(commentEl);
rowEl.append(buttonEl);
container.append(rowEl);

}




//This section here scrolls the user to the hour before the current one..
var idString = "#row-"+ (currentHour-2);
console.log(idString);
$('html, body').animate({
    
    scrollTop: $(idString).offset().top
}, 2000);



///We need to create an array of strings.
//The array should contain 24 strings, one comment for each day.
//If we want to add an even cooler feature, we could do an array of arrays, which involves the week.
//So 
var dayArray = new Array;
function createDefaultDayRecords(){
    //If there are no records, we create default

    var divisionOfDay = 23 //24 hours a day. This should be hardcoded or default 
    //maybe a future version can consider dividing into 30 minute blocks?
    
    //console.log("FORING");
    for(var counterHour= 0; counterHour <= divisionOfDay; counterHour++){
        dayArray[counterHour] ="This is the "+(counterHour+1)+ ":00 comment"; 
        console.log(dayArray);
        $("#row-"+counterHour).find('textarea').eq(0).text(dayArray[counterHour]);
    }
    //Lets assign an item for each day?
    //I guess a question would be what would be best, an item for each
    //or an array for each record....
    localStorage.setItem("hourlyRecords-"+moment().format('l'), JSON.stringify(dayArray));
}



 //set new submission
    //localStorage.setItem("user", JSON.stringify(user));
    
    // get submission for today
    var dateinFormat = moment().format('l');
    console.log(dateinFormat);
    dayArray = JSON.parse(localStorage.getItem("hourlyRecords-"+dateinFormat));
    console.log(dayArray);
    if(dayArray != null){
        //Populate with Hourly records.
        console.log("Array is not empty");

        for(var x = 0; x<= dayArray.length; x++){
            if(dayArray[x] !=null){
                $("#row-"+x).find('textarea').eq(0).text(dayArray[x]);
            }else{
                $("#row-"+x).find('textarea').eq(0).text("Add something to do..");
            }
        }
    }else{
        console.log("Creating Default Records...")
        createDefaultDayRecords();
    }


$(".saveBtn").on('click',function(event){
    event.preventDefault;
    //(this)
    var buttonId = $(this).attr("id");
   var commentOfButton  = $("#row-"+buttonId).find('textarea').eq(0).val();
   var dateFormat = moment().format('l');
    dayArray[buttonId]= commentOfButton;
    localStorage.setItem("hourlyRecords-"+dateFormat, JSON.stringify(dayArray));

    
})

//We need to create a 
//createDefaultDayRecords();
// }; //contains the 'amountofDivitions' in the day.
//


 
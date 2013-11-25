$(document).ready(function() {
    //Get user office for UTC offset
    var office = $("[name='office']").val();
    startTime(office);
});

function startTime(office) {
    //Extra functionality for Date to calculate DST
    Date.prototype.stdTimezoneOffset = function() {
        var jan = new Date(this.getFullYear(), 0, 1);
        var jul = new Date(this.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    Date.prototype.dst = function() {
        return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }
    
    //Calculate Offset based on Office
    var offset = 0;
    if (office == 0 || office == 1) {
        //SLC
        offset = -7;
    }
    else if (office == 2) {
        //Switzerland
        offset = 1;
    }
    else if (office == 3) {
        //China
        offset = 8;
    }
    else if (office == 4) {
        //Taiwan
        offset = 8;
    }
    
    var now = new Date();
    //Calculate Daylight Savings time in areas where that matters
    if (office < 3) {
        if (now.dst()) { offset += 1; }   
    }
    var today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours() + offset, now.getUTCMinutes(), now.getUTCSeconds());
    var h= today.getHours();
    var m= today.getMinutes();
    // add a zero in front of numbers<10
    m= checkTime(m);
    ampm = h >= 12 ? "pm" : "am";
    h = h % 12;
    if (h == 0) {
      h = 12;
    }
    var clock = document.getElementById('clock');
    if (clock != null) {
      clock.innerHTML = h + ":" + m + " " + ampm;
      t = setTimeout(function(){ startTime(office) }, 500);
    }
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
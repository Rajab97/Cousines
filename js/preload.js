//pageLoad
var PAGELOADPROGRESS = 0;
var LOADEDIMAGES = 0;
var PRELOADER = $("#fill");
var IMAGECOUNT = $("img").length;
console.log(IMAGECOUNT);
var PERCENTAGEPERIMAGE = 100 / IMAGECOUNT;
if (IMAGECOUNT > 0) {
    pageonLoad();
} else {
    $("#pageLoad").css({ "display": "none" });
    $("body").css({ display: "none" });
}


function pageonLoad() {


    for (let i = 0; i < IMAGECOUNT; i++) {
        var image_copy = new Image();
        image_copy.src = document.images[i].src;
        image_copy.onload = onLoadImage;
        image_copy.onerror = onLoadImage;
    }
}

function onLoadImage() {
    LOADEDIMAGES++;
    PAGELOADPROGRESS += PERCENTAGEPERIMAGE;
    if (LOADEDIMAGES == IMAGECOUNT || PAGELOADPROGRESS >= 100) {
        console.log("Finish");

        $("#pageLoad").delay(500).fadeOut("slow", function() {
            $("body").css({ overflow: "auto" });
        });

    }
    $("#fill").animate({ width: PAGELOADPROGRESS + "%" }, 1);
}
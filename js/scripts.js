var WINDOW_WIDTH = $("body").width();
const MOBILE_PHONES = 576;
const TABLETS = 768;
const LAPTOPS = 992;
const DESKTOPS = 1200;
const DESKTOPSLARGE = 1440;
var COLORCHANGEDTEXTS = ".colorChangedText";
var CURRENTSECTIONCOLOR;
var SCROLLTOPVALUE = 0;

var NEWARRIVALINTERVAL;
// var LEFTPOSNEWARRIVAL = 0;
// let LEFTPOSITIONOFTEXT = 0;
//Whem window resize
$(window).resize(function() {
    WINDOW_WIDTH = $("body").width();


    //Menu function
    if (IS_MENU_OPENED && WINDOW_WIDTH <= MOBILE_PHONES) {
        closeDialog();
    }
    closeMenu();

    //configure shop section
    // if (WINDOW_WIDTH >= LAPTOPS) {
    //     configureShopSectionOnDesktop();
    // } else {
    //     configureShopSectionOnMobile();
    // }

    if (WINDOW_WIDTH <= MOBILE_PHONES) {
        configureRecentlyViewed(20);
    } else if (WINDOW_WIDTH <= TABLETS) {
        configureRecentlyViewed(25);
    } else if (WINDOW_WIDTH <= LAPTOPS) {
        configureRecentlyViewed(30);
    } else {
        configureRecentlyViewed(40);
    }

    //newArrivalsProduct
    configureNewArrivalsProducts();
    //footer
    // if (WINDOW_WIDTH < LAPTOPS) {
    //     configureAccardionOnMobile();
    // } else {
    //     configureAccardionOnDesktop();
    // }

    //narTopHeight
    $("#navTopHeight").height($("#nav-bar").outerHeight() + "px");

    //  calculateWithOfProductsFilterElements();

});

//When Page load
$(document).ready(function() {
    WINDOW_WIDTH = $("body").width();

    if (WINDOW_WIDTH >= LAPTOPS) {
        configureShopSectionOnDesktop();
    }
    if (newArrivals != undefined && newArrivals != null) {
        for (let newArrival of newArrivals) {
            configureNewArrivals(newArrival);

            setInterval(function() {
                moveNewArrival(newArrival);
            }, 10)
        }
    }

    if (WINDOW_WIDTH <= MOBILE_PHONES) {
        configureRecentlyViewed(20);
    } else if (WINDOW_WIDTH <= TABLETS) {
        configureRecentlyViewed(20);
    } else if (WINDOW_WIDTH <= LAPTOPS) {
        configureRecentlyViewed(30);
    } else {
        configureRecentlyViewed(40);
    }

    //icons colors
    ChangeIconColors(IconsColorAndImageRelation[0].color);
    //newArrivalsProduct
    configureNewArrivalsProducts();
    if (WINDOW_WIDTH < LAPTOPS) {
        configureAccardionOnMobile();
    } else {
        configureAccardionOnDesktop();
    }

    //narTopHeight
    $("#navTopHeight").height($("#nav-bar").outerHeight() + "px");

    //ProductsPageFilterParts
    calculateWithOfProductsFilterElements();
    colorsOfProductsFilter();
});

$(window).scroll(function(e) {

    //Search icon
    if ($(document).scrollTop() == 0) {
        hideSearchInMinSize();
    } else if (SCROLLTOPVALUE > $(document).scrollTop()) {
        showSearchInMinSize();
    } else {
        hideSearchInMinSize();
    }
    SCROLLTOPVALUE = $(document).scrollTop();

    //Title
    if (SCROLLTOPVALUE > 50 && WINDOW_WIDTH > LAPTOPS) {
        $('.center .logoTitle').css({ "opacity": "0" })
    } else if (SCROLLTOPVALUE < 50) {
        $('.center .logoTitle').css({ "opacity": "1" })
    }

    ShowWhiteBackground($(document).scrollTop());
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Home Page Slider

var swiperH = new Swiper('.swiper-container-h', {
    speed: 800,
    spaceBetween: 0,
    direction: 'horizontal',
    pagination: {
        el: '.swiper-pagination-h',
        clickable: true,
        renderBullet: function(index, className) {
            return '<span class="' + className + ' ' + COLORCHANGEDTEXTS.substring(1, COLORCHANGEDTEXTS.length) + '">' + slideCategories[index] + '</span>';
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
var swiperV = new Swiper('.swiper-container-v', {
    speed: 800,
    direction: 'vertical',
    spaceBetween: 0,

    pagination: {
        el: '.swiper-pagination-v',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-v-button-next',
        prevEl: '.swiper-v-button-prev',
    }
});
var swiperNewArrivals = new Swiper('.swiper-newArrivals', {
    slidesPerView: 2,
    spaceBetween: 20,
    freeMode: true,
    navigation: {
        nextEl: '.newArrivals-next',
        prevEl: '.newArrivals-prev',
    },
    // init: false,
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 25,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        1440: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
    }
});


var nextSlideSelector = swiperH.params.el + " > ." + swiperH.params.wrapperClass + " > ." + swiperH.params.slideNextClass;
var prevSlideSelector = swiperH.params.el + " > ." + swiperH.params.wrapperClass + " > ." + swiperH.params.slidePrevClass;



if (swiperH != null && swiperH != undefined) {

    if (swiperH.eventsListeners && swiperH.eventsListeners.snapIndexChange != null && swiperH.eventsListeners.snapIndexChange != undefined) {

        swiperH.eventsListeners.snapIndexChange.push(function() {

            setPrevAndNextCategoriesToArrows(this);

            let verticalSlide = swiperV[this.snapIndex]
            SlideChangeColor(verticalSlide);
        })
    }
}
if (swiperV != null && swiperV != undefined) {
    if (isIterable(swiperV)) {
        for (let vSlider of swiperV) {
            vSlider.eventsListeners.snapIndexChange.push(function() {
                SlideChangeColor(this);
            })
        }
    }
}

function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}
//down to next section in mobile
$(".swiper-next-section").click(function() {
    let heightOfDocumnet = $("#slider").height();
    $("html, body").animate({ scrollTop: heightOfDocumnet }, 1250);
});
//SetInitialIcons
if (swiperV.eventsListeners && swiperH.eventsListeners && swiperV.eventsListeners.snapIndexChange != null && swiperV.eventsListeners.snapIndexChange != undefined && swiperH.eventsListeners.snapIndexChange != null && swiperH.eventsListeners.snapIndexChange != undefined) {
    SlideChangeColor(swiperV[swiperH.snapIndex]);
    setPrevAndNextCategoriesToArrows(swiperH);
}

//Set initial right and left categories to arrows


function SlideChangeColor(vSlide) {
    let activeVerticalElement = $(vSlide.slides[vSlide.snapIndex])[0];
    ChangeGlobalTextColors($(activeVerticalElement).attr("color"))
    ChangeIconColors($(activeVerticalElement).attr("color"))
}

function ChangeGlobalTextColors(color) {
    CURRENTSECTIONCOLOR = color;
    for (let elem of $(COLORCHANGEDTEXTS)) {
        $(elem).css({
            "color": CURRENTSECTIONCOLOR,
            "border-color": CURRENTSECTIONCOLOR
        })
    }
}

function ChangeIconColors(color) {
    console.log(color);
    for (let elem of IconsColorAndImageRelation) {
        if (elem.color == color) {
            if (swiperH.eventsListeners.snapIndexChange != null && swiperH.eventsListeners.snapIndexChange != undefined) {
                $(swiperH.navigation.nextEl).children('.buttonContent').children('.slideIcon').attr("src", elem.rightArrowSrc)
                $(swiperH.navigation.prevEl).children('.buttonContent').children('.slideIcon').attr("src", elem.leftArrowSrc)
                $(swiperV[swiperH.snapIndex].navigation.nextEl).children('.buttonContent').children('.slideIcon').attr("src", elem.downArrowSrc)
                $(swiperV[swiperH.snapIndex].pagination.el).children(".swiper-pagination-bullet").css({
                    "background": elem.color,
                    "border": "none"
                })
                $(swiperV[swiperH.snapIndex].pagination.el).children(".swiper-pagination-bullet.swiper-pagination-bullet-active").css({
                    "border": "1px solid" + " " + elem.color,
                    "background": "transparent"
                })
                console.log(color);
            }
            $(".menuIcon").attr("src", elem.menuIcon);
            $(".searchIcon").attr("src", elem.searchIcon);
            $(".signinIcon").attr("src", elem.signinIcon);
            $(".favoritesIcon").attr("src", elem.favoritesIcon);
            $(".chartIcon").attr("src", elem.chartIcon);
            $(".searchMinIcon").attr("src", elem.searchMinIcon);
            $(".slideNextSectionIcon").attr("src", elem.downArrowSrc);

            $(".line").css({ "background-color": elem.color });
        }
    }
}

function setPrevAndNextCategoriesToArrows(slider) {
    let prevCategory;
    let nextCategory;
    if (slider.snapIndex > 0) {
        prevCategory = slider.slides[slider.snapIndex - 1].attributes["category"].value
    }
    if (slider.snapIndex < slider.slides.length - 1) {
        nextCategory = slider.slides[slider.snapIndex + 1].attributes["category"].value
    }
    $(slider.navigation.nextEl).children('.buttonContent').children(".nextCategory").text(nextCategory);
    $(slider.navigation.prevEl).children('.buttonContent').children(".prevCategory").text(prevCategory);
}
// function configureSlide(contentWidth) {

//     if (contentWidth >= LAPTOPS) {
//         $('.swiper-button-next').css({ "display": "initial" });
//         $('.swiper-button-prev').css({ "display": "initial" });
//         $(".swiper-pagination-h").css({ "display": "none" });
//     } else {
//         $('.swiper-button-next').css({ "display": "none" });
//         $('.swiper-button-prev').css({ "display": "none" });
//         $(".swiper-pagination-h").css({ "display": "initial" });
//     }

// }
function ShowWhiteBackground(scrollTop) {
    let heightOfDevice = $(window).height();
    if (scrollTop > heightOfDevice + 200) {
        $("#whiteBackground").addClass("active");
    } else {
        $("#whiteBackground").removeClass("active");
    }
}

function showSearchInMinSize() {
    if (WINDOW_WIDTH < TABLETS) {
        $(".navMinSearch").css({ "opacity": "1", "height": "auto" });
        $(".searchIcon").css({ "opacity": "0" });
    } else {
        $(".navMinSearch").css({ "opacity": "0", "height": "0px" });
        $(".searchIcon").css({ "opacity": "1" });
    }
}

function hideSearchInMinSize() {
    $(".navMinSearch").css({ "opacity": "0", "height": "0px" });
    $(".searchIcon").css({ "opacity": "1" });
}
//nav Search Open
$(".openSearchCommand").click(function(e) {
    e.preventDefault();
    $("#searchPage").addClass("open");
    $("#searchPage").removeClass("close");
    sleep(400).then(() => { showDialog(); });

});
//nav Search Close
$(".closeSearch").click(function(e) {
    e.preventDefault();
    $("#searchPage").addClass("close");
    $("#searchPage").removeClass("open");
    closeDialog();
});
//focus to input on icon click
$("#searchInputRef").click(function() {
    document.getElementById("searchInput").focus();
});
/////////////Menu 
$(".menuIcon").click(function(e) {
    e.preventDefault();
    let menu = $("#menu");
    menu.css({ "left": "0" });
    IS_MENU_OPENED = true;
    configureMenuOnOpen();
    console.log("openMenu");
    if (WINDOW_WIDTH <= MOBILE_PHONES) {
        sleep(400).then(() => { showDialog(); });
    }
});
$(".menuClose").click(function() {
    closeMenu();
})
var IS_MENU_OPENED = false;
// $("#menu").mouseenter(function() {
//     IS_MENU_OPENED = true;
// });
// $("#menu").mouseleave(function() {
//     closeMenu();
// });
function closeMenu() {
    if (IS_MENU_OPENED == true) {

        IS_MENU_OPENED = false;
        let menu = $("#menu");
        menu.css({ "left": "-100%" });
        $(".subContent").css({ "left": "100%" });
        console.log("closeMenu");
        if (WINDOW_WIDTH <= MOBILE_PHONES) {
            closeDialog();
        }
    }
}

function showDialog() {
    // document.getElementById('dialog').classList.add('show')
    console.log("ShowDialog");
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
};

function closeDialog() {
    console.log("closeDialog");
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    // document.getElementById('dialog').classList.remove('show');
}

function configureNewArrivalsProducts() {
    let newArrivals = $("#newArrivalProducts");
    if (newArrivals != null && newArrivals != undefined) {
        let swiper = $(newArrivals).children('.swiper-newArrivals');
        let imageSectionHeight = $(swiper).children('.swiper-wrapper').children('.swiper-slide').children('.link').children('.imgSection').height();
        console.log(imageSectionHeight);
        let nextPrevButtons = $(swiper).children(".next-prev-buttons");
        $(nextPrevButtons).height(imageSectionHeight + "px");
    }
}

function configureMenuOnOpen() {
    let HeightOfBreadcrump = $("#menu .breadcrump").outerHeight();
    let HeightOfContent = $("#menu").outerHeight() - HeightOfBreadcrump;

    if (WINDOW_WIDTH < LAPTOPS) {
        console.log("Configure");
        for (let theme of $(".shopByThemeMobile")) {
            let widthOfShopByTheme = 0;
            for (let elem of $(theme).children(".shopByThemeElements").children("ul").children("li").children("a")) {
                widthOfShopByTheme += $(elem).outerWidth() + 11;
            }
            $(theme).children(".shopByThemeElements").children("ul").width(widthOfShopByTheme + "px");
        }
    }
    $("#menu .baseContent").height(HeightOfContent + "px");
};

function configureShopSectionOnDesktop() {
    configureShopSectionOnMobile();
    let shop = $("#shop");
    let counter = 0;
    let minusTop = $($("#shop").children(".shopPart")[0]).height() / 3;
    for (let part of $(shop).children(".shopPart")) {

        if (counter > 0 && counter < $(shop).children(".shopPart").length - 1) {
            $(part).children(".partLeft").css({ "position": "relative", "top": -minusTop + "px" });
        } else if (counter == $(shop).children(".shopPart").length - 1) {
            $(part).css({ "position": "relative", "top": -minusTop + "px" });
        }
        counter++;
    }
    $(shop).height($(shop).height() - minusTop);
};

function configureShopSectionOnMobile() {
    let shop = $("#shop");
    let counter = 0;

    for (let part of $(shop).children(".shopPart")) {

        if (counter > 0 && counter < $(shop).children(".shopPart").length - 1) {
            $(part).children(".partLeft").css({ "position": "initial", "top": "0px" });
        } else if (counter == $(shop).children(".shopPart").length - 1) {
            $(part).css({ "position": "initial", "top": "0px" });
        }
        counter++;
    }
    $(shop).css({ "height": "auto" });
};

function configureNewArrivals(newArrival) {
    let boldNewArrival = newArrival.boldTextElement;
    let lightNewArrival = newArrival.lightTextElement;


    let newArrivalSec = $(newArrival.newArrivalSectionId);
    if (newArrivalSec != null && newArrivalSec != undefined) {



        let boldNewArrivalWidth = newArrival.WIDTHOFTEXTELEMENT;
        $(newArrivalSec).children(newArrival.newArrivalSectionLine).children(newArrival.boldElementClass).css({ "left": newArrival.LEFTPOSITIONOFTEXT + "px" })
        newArrival.LEFTPOSITIONOFTEXT += boldNewArrivalWidth;

        let lightNewArrivalWidth = newArrival.WIDTHOFTEXTELEMENT;
        $(newArrivalSec).children(newArrival.newArrivalSectionLine).children(newArrival.lightElementClass).css({ "left": newArrival.LEFTPOSITIONOFTEXT + "px" })
        newArrival.LEFTPOSITIONOFTEXT += lightNewArrivalWidth;

        $(newArrivalSec).children(newArrival.newArrivalSectionLine).width(boldNewArrivalWidth + lightNewArrivalWidth + "px");

        for (let i = 0; i < 15; i++) {
            let lineWidth = $(newArrivalSec).children(newArrival.newArrivalSectionLine).width();
            let newLineWidth = lineWidth + boldNewArrivalWidth + lightNewArrivalWidth;

            $(newArrivalSec).children(newArrival.newArrivalSectionLine).width(newLineWidth + "px");

            $(newArrivalSec).children(newArrival.newArrivalSectionLine).append(boldNewArrival);
            $(newArrivalSec).children(newArrival.newArrivalSectionLine).children(newArrival.boldElementClass + ":last-child").css({ "left": newArrival.LEFTPOSITIONOFTEXT + "px" });
            newArrival.LEFTPOSITIONOFTEXT += boldNewArrivalWidth;

            $(newArrivalSec).children(newArrival.newArrivalSectionLine).append(lightNewArrival);
            $(newArrivalSec).children(newArrival.newArrivalSectionLine).children(newArrival.lightElementClass + ":last-child").css({ "left": newArrival.LEFTPOSITIONOFTEXT + "px" });
            newArrival.LEFTPOSITIONOFTEXT += lightNewArrivalWidth;
        }
    }
};

function configureRecentlyViewed(length) {
    let newArrivalSection = $(".swiper-newArrivals");
    if (newArrivalSection != null && newArrivalSection != undefined) {

        for (let slide of $(newArrivalSection).children(".swiper-wrapper").children(".swiper-slide")) {
            let productInfo = $(slide).children(".link").children(".productInfo");
            let titleText = $(productInfo).children(".productTitle").attr("text");
            if (length < titleText.length) {
                $(productInfo).children(".productTitle").text(titleText.substring(0, length) + "...");
            } else {
                $(productInfo).children(".productTitle").text(titleText);
            }
            $(productInfo).children(".productTitle").attr("text", titleText);
            console.log(titleText);
        }
    }
}

function configureAccardionOnMobile() {
    let content = $(".accordion-content")
    if (content != undefined && content != null) {
        let accordions = $(content).children(".accordion");
        for (let accordion of accordions) {
            let content = $(accordion).children(".subAccordionContent");
            let ul = $(content).children("ul");
            let ulElements = $(ul).children("li");
            let heightOfUl = 0;
            for (let li of ulElements) {
                heightOfUl += $(li).outerHeight();
            }
            $(content).attr("innerHeight", heightOfUl)
            $(ul).height(heightOfUl + "px");
        }
    }
}

function configureAccardionOnDesktop() {
    let content = $(".accordion-content")
    if (content != undefined && content != null) {
        let accordions = $(content).children(".accordion");
        for (let accordion of accordions) {
            let content = $(accordion).children(".subAccordionContent");
            let ul = $(content).children("ul");
            let ulElements = $(ul).children("li");
            for (let li of ulElements) {
                $(li).height("auto");
            }
            $(ul).height("auto");
        }
    }
}

function moveNewArrival(newArrival) {
    let newArrivalSec = $(newArrival.newArrivalSectionId);
    let boldNewArrivalWidth = newArrival.WIDTHOFTEXTELEMENT;
    let lightNewArrivalWidth = newArrival.WIDTHOFTEXTELEMENT;

    if (newArrivalSec != null && newArrivalSec != undefined) {

        newArrival.LEFTPOSNEWARRIVAL -= 1;
        if (newArrival.LEFTPOSNEWARRIVAL % (boldNewArrivalWidth + lightNewArrivalWidth) == 0) {
            console.log(boldNewArrivalWidth + lightNewArrivalWidth);
            addNewArrivalElenent(newArrival);
            $(newArrival.newArrivalSectionId).children(newArrival.newArrivalSectionLine).children(newArrival.boldElementClass + ":first-child").remove();
            $(newArrival.newArrivalSectionId).children(newArrival.newArrivalSectionLine).children(newArrival.lightElementClass + ":first-child").remove();
        }
        $(newArrivalSec).children(newArrival.newArrivalSectionLine).css({ "left": newArrival.LEFTPOSNEWARRIVAL + "px" });
    }
}

function addNewArrivalElenent(newArrival) {
    let boldNewArrival = newArrival.boldTextElement;
    let lightNewArrival = newArrival.lightTextElement;

    let newArrivalSec = $(newArrival.newArrivalSectionId);
    if (newArrivalSec != null && newArrivalSec != undefined) {
        let boldNewArrivalWidth = newArrival.WIDTHOFTEXTELEMENT;
        let lightNewArrivalWidth = newArrival.WIDTHOFTEXTELEMENT;

        let lineWidth = $(newArrivalSec).children(newArrival.newArrivalSectionLine).width();
        let newLineWidth = lineWidth + boldNewArrivalWidth + lightNewArrivalWidth;

        $(newArrivalSec).children(newArrival.newArrivalSectionLine).width(newLineWidth + "px");

        $(newArrivalSec).children(newArrival.newArrivalSectionLine).append(boldNewArrival);
        $(newArrivalSec).children(newArrival.newArrivalSectionLine).children(newArrival.boldElementClass + ":last-child").css({ "left": newArrival.LEFTPOSITIONOFTEXT + "px" });
        newArrival.LEFTPOSITIONOFTEXT += boldNewArrivalWidth;

        $(newArrivalSec).children(newArrival.newArrivalSectionLine).append(lightNewArrival);
        $(newArrivalSec).children(newArrival.newArrivalSectionLine).children(newArrival.lightElementClass + ":last-child").css({ "left": newArrival.LEFTPOSITIONOFTEXT + "px" });
        newArrival.LEFTPOSITIONOFTEXT += lightNewArrivalWidth;
    }
};

function navigateToSubCategory(path) {
    let subContent;
    for (let content of $("#menu .subContent")) {
        let contentPath = $(content).attr("menuPath")
        if (contentPath != null && contentPath != undefined && contentPath == path) {
            subContent = $(content);
        }
    }
    let heightOfBreadcump = $(subContent).children(".subContentBreadcrump").outerHeight();
    let heightOfContent = $(subContent).outerHeight() - heightOfBreadcump;
    $(subContent).children(".content").height(heightOfContent + "px");
    $(subContent).css({ "left": "0" });
};
window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

//Open sub menus
$(".menuNav").click(function(e) {
    let path = $(e.currentTarget).attr("pathTo");
    navigateToSubCategory(path);
});
$(".menuBreadcrumpNav").click(function(e) {
    let path = $(e.currentTarget).attr("pathTo");
    $(".subContent").css({ "left": "100%" });
    navigateToSubCategory(path);
});
$(".menuPrevious").click(function(e) {
    let subContent = $(e.currentTarget).parent().parent();
    $(subContent).css({ "left": "100%" });
});

//Subscribtion
$("#subscriptionForm #email").focus(function() {
    $("#subscriptionForm #forEmail").addClass("active");
    if ($(".subscribeFocusContent").hasClass("active") || $(".unSubscribeFocusContent").hasClass("active")) {
        return;
    }
    $(".subscribeFocusContent").animate({ height: "175px", opacity: "1" }, 500);
    $(".subscribeFocusContent").addClass("active")
})
$("#subscriptionForm #email").focusout(function() {
    if (!($(this).val().length > 0)) {
        $("#subscriptionForm #forEmail").removeClass("active");
    }
    // $(".subscribeFocusContent").animate({ height: "0px", opacity: "0" }, 500);
})
$('input:radio[name="gender"]').change(
    function() {
        if ($(this).is(':checked')) {
            $(".radioButton .radioButtonEffect").removeClass("active");
            $(this).siblings(".radioButtonEffect").addClass("active");
        }
    });
$(".wantUnsubscribe").click(function(e) {
    e.preventDefault();
    $(".subscribeFocusContent").animate({ height: "0px", opacity: "0" }, 500, function() {
        $(".unSubscribeFocusContent").animate({ height: "125px", opacity: "1" }, 500);
    });
    $(".subscribeFocusContent").removeClass("active")
    $(".unSubscribeFocusContent").addClass("active")
});
$(".wantSubscribe").click(function(e) {
    e.preventDefault();

    $(".unSubscribeFocusContent").animate({ height: "0px", opacity: "0" }, 500,
        function() {
            $(".subscribeFocusContent").animate({ height: "175px", opacity: "1" }, 500);
        });
    $(".unSubscribeFocusContent").removeClass("active")
    $(".subscribeFocusContent").addClass("active")
});
var swiperMenu = new Swiper('.shopByThemeLaptop', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 15,
    autoResize: false,
    resizeReInit: true,
    freeMode: true,
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
    }
});


$(".accordion-content .accordion").click(function() {

    if (WINDOW_WIDTH < LAPTOPS) {



        if (!$(this).hasClass("active")) {
            $(".accordion-content .accordion.active .subAccordionContent").animate({ height: "0px" }, 500);
            $(".accordion-content .accordion.active").removeClass("active");

            $(this).addClass("active");
            $(this).children(".subAccordionContent").animate({ height: $(this).children(".subAccordionContent").attr("innerHeight") + "px" }, 500);

        } else {

            $(this).removeClass("active");
            $(this).children(".subAccordionContent").animate({ height: "0px" }, 500);
        }
    }

});

var heightOfProductsNaviation
var isBigFilterOpened = false;
$(".filterButton").click(function(e) {
    e.preventDefault();

    if (WINDOW_WIDTH >= LAPTOPS) {
        heightOfProductsNaviation = $("#productsNaviation").outerHeight();
        isBigFilterOpened = true;
        $("#navTopHeight").animate({ height: "0px" }, 500);
        $("#nav-bar").animate({ opacity: "0" }, 500, function() { $("#nav-bar").css({ display: "none" }) });
        $("#productsNaviation").animate({ height: "0px", opacity: "0" }, 500);
        $("#allProducts").animate({ width: "75%" }, 500);

        // $("#productsFilter").animate({ right: "0px" }, 500);
    } else {
        //   $("#productsFilter").animate({ right: "0px" }, 500);
        isBigFilterOpened = false;
        showDialog();
    }
    $("#productsFilter").addClass("active");
});
$(".closeFilter").click(function(e) {

    console.log(isBigFilterOpened);
    if (isBigFilterOpened) {
        $("#nav-bar").css({ display: "block" })
        $("#nav-bar").animate({ opacity: "1" }, 500);
        $("#navTopHeight").animate({ height: $("#nav-bar").outerHeight() + "px" }, 500);
        $("#productsNaviation").animate({ "height": heightOfProductsNaviation + "px", opacity: "1" }, 500);
        $("#allProducts").animate({ width: "100%" }, 500);
    } else {
        closeDialog();
    }
    $("#productsFilter").removeClass("active");
});

$(".showAll").click(function(e) {

    let ul = $(this).parent().siblings("ul");
    if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $(this).animate({ "opacity": "0.2" }, 500, function() {
            $(this).attr("src", iconLinks.plus);
            $(this).animate({ "opacity": "1" }, 500)
        });
        $(ul).animate({ width: "100%" }, 1000);
    } else {
        $(this).removeClass("active");
        $(this).animate({ "opacity": "0.2" }, 500, function() {
            $(this).attr("src", iconLinks.minus);
            $(this).animate({ "opacity": "1" }, 500)
        });
        let ulExWidth = $(ul).attr("withOfUl");
        $(ul).animate({ width: ulExWidth + "px" }, 1000);
    }
});

function calculateWithOfProductsFilterElements() {
    let content = $("#productsFilter .productsFilter");
    let filetParts = $(content).children('.calculatedWidth');
    for (let part of filetParts) {
        let withOfUl = 0;
        let ul = $(part).children("ul");
        let initialWidth = $(ul).outerWidth();
        console.log(initialWidth);
        for (let li of $(ul).children("li")) {
            withOfUl += $(li).outerWidth();
        }
        if (withOfUl > initialWidth) {
            $(ul).width(withOfUl + 5 + "px");
            $(ul).attr("withOfUl", withOfUl + 5);
        } else {
            $(part).children("h3").children(".showAll").css({ display: "none" })
        }
    }
}

function colorsOfProductsFilter() {
    let content = $("#productsFilter .productsFilter");
    let filetPartsColor = $(content).children('.calculatedWidth.ColorFilter');
    let liElements = $(filetPartsColor).children("ul").children("li");
    for (let li of liElements) {
        let color = $(li).children("a").children("span").attr("colorCode");
        console.log(color);
        $(li).children("a").children("span").css({ "background-color": color });
    }
}

$(".activateSpecialOffer").click(function(e) {
    e.preventDefault();
    let elemThis = this;
    if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $(this).children("span").animate({ left: "50%" }, 250);
        $(this).children("span").children(".close").animate({ opacity: "0" }, 125, function() {
            $(elemThis).children("span").children(".close").css({ display: "none" });
            $(elemThis).children("span").children(".check").css({ display: "block" });
            $(elemThis).children("span").children(".check").animate({ opacity: "1" }, 125);
        });
    } else {
        $(this).removeClass("active");
        $(this).children("span").animate({ left: "0%" }, 250);
        $(this).children("span").children(".check").animate({ opacity: "0" }, 125, function() {
            $(elemThis).children("span").children(".check").css({ display: "none" });
            $(elemThis).children("span").children(".close").css({ display: "block" });
            $(elemThis).children("span").children(".close").animate({ opacity: ".5" }, 125);
        });
    }
})
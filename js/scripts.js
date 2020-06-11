var WINDOW_WIDTH = $("body").width();
var BROWSERHEIGHT = $(window).height();
const MOBILE_PHONES = 576;
const TABLETS = 768;
const LAPTOPS = 992;
const DESKTOPS = 1200;
const DESKTOPSLARGE = 1440;
var COLORCHANGEDTEXTS = ".colorChangedText";
var CURRENTSECTIONCOLOR;
var SCROLLTOPVALUE = 0;
var ISCHANGEDTOSLIDER = false;
var NEWARRIVALINTERVAL;
// var LEFTPOSNEWARRIVAL = 0;
// let LEFTPOSITIONOFTEXT = 0;
//Whem window resize

$(window).on('load', function() {
    loadImages();
});

$(window).resize(function() {
    WINDOW_WIDTH = $("body").width();
    BROWSERHEIGHT = $(window).height();

    //Menu function

    //navheight
    $("#nav-height").height($("#nav-bar").outerHeight() + "px");

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

    //  Product detail slider
    if ($("#productDetail").length) {
        productDetailChangeToSlider();
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

    //Product detail slider
    if ($("#productDetail").length) {
        if (WINDOW_WIDTH > LAPTOPS)
            ISCHANGEDTOSLIDER = true;
        productDetailChangeToSlider();
    }
    if ($("#productDetail").length && WINDOW_WIDTH > LAPTOPS) {
        changeColorsOfNav("#000");
    }
    //navheight
    if ($(".newArrivalProducts").length) {
        // ChangeIconColors(IconsColorAndImageRelation[0].color);
        //newArrivalsProduct
        configureNewArrivalsProducts();
    }
    $("#nav-height").height($("#nav-bar").outerHeight() + "px");
    //icons colors

    if (WINDOW_WIDTH < LAPTOPS) {
        configureAccardionOnMobile();
    } else {
        configureAccardionOnDesktop();
    }

    //Product detail bottom info
    if ($("#productBottomInfoDesktop").length) {
        animateProductDetailBottomInfo();
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
        changeColorsOfNav($("body").attr("navColor"));
        ChangeGlobalTextColors($("body").attr("navColor"));
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

if ($("#slider").length) {
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
    console.log(swiperH.snapIndex);
    setPrevAndNextCategoriesToArrows(swiperH);
    SlideChangeColor(swiperV[swiperH.snapIndex]);
}

var swiperNewArrivals = new Swiper('.swiper-newArrivals', {
    slidesPerView: 2,
    spaceBetween: 10,
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
            spaceBetween: 10,
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


//Set initial right and left categories to arrows


function SlideChangeColor(vSlide) {
    let activeVerticalElement = $(vSlide.slides[vSlide.snapIndex])[0];
    let color = $(activeVerticalElement).attr("color");
    $("body").attr("navColor", color);
    ChangeGlobalTextColors(color);
    ChangeIconColors(color);
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
    console.log(color + " color");
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
            }
            $(".slideNextSectionIcon").attr("src", elem.downArrowSrc);
        }
    }
    changeColorsOfNav(color);
}

function changeColorsOfNav(color) {
    console.log(color);

    for (let elem of IconsColorAndImageRelation) {
        if (elem.color == color) {
            $(".menuIcon").attr("src", elem.menuIcon);
            $(".searchIcon").attr("src", elem.searchIcon);
            $(".signinIcon").attr("src", elem.signinIcon);
            $(".favoritesIcon").attr("src", elem.favoritesIcon);
            $(".chartIcon").attr("src", elem.chartIcon);
            $(".searchMinIcon").attr("src", elem.searchMinIcon);
            $(".previousPage").attr("src", elem.exPageArrow);
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
        if (WINDOW_WIDTH <= MOBILE_PHONES) {
            closeDialog();
        }
    }
}

function showDialog() {
    // document.getElementById('dialog').classList.add('show')
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
};

function closeDialog() {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    // document.getElementById('dialog').classList.remove('show');
}

function configureNewArrivalsProducts() {
    let newArrivals = $(".newArrivalProducts");
    if (newArrivals != null && newArrivals != undefined) {
        for (let newArr of newArrivals) {
            let swiper = $(newArr).children('.swiper-newArrivals');
            let imageSectionHeight = $(swiper).children('.swiper-wrapper').children('.swiper-slide').children('.link').children('.imgSection').height();
            let nextPrevButtons = $(swiper).children(".next-prev-buttons");
            $(nextPrevButtons).height(imageSectionHeight + "px");
        }

    }
}

function configureMenuOnOpen() {
    let HeightOfBreadcrump = $("#menu .breadcrump").outerHeight();
    let HeightOfContent = $("#menu").outerHeight() - HeightOfBreadcrump;

    if (WINDOW_WIDTH < LAPTOPS) {
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

// function configureRecentlyViewed(length) {
//     let newArrivalSection = $(".swiper-newArrivals");
//     if (newArrivalSection != null && newArrivalSection != undefined) {

//         for (let slide of $(newArrivalSection).children(".swiper-wrapper").children(".swiper-slide")) {
//             let productInfo = $(slide).children(".link").children(".productInfo");
//             let titleText = $(productInfo).children(".productTitle").attr("text");
//             if (length < titleText.length) {
//                 $(productInfo).children(".productTitle").text(titleText.substring(0, length) + "...");
//             } else {
//                 $(productInfo).children(".productTitle").text(titleText);
//             }
//             $(productInfo).children(".productTitle").attr("text", titleText);
//             console.log(titleText);
//         }
//     }
// }

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
        $("#allProducts").animate({ width: "70%" }, 500);
        $("#allProducts").addClass("active");
        // $("#productsFilter").animate({ right: "0px" }, 500);
    } else {
        //   $("#productsFilter").animate({ right: "0px" }, 500);
        isBigFilterOpened = false;
        showDialog();
    }
    $("#productsFilter").addClass("active");
});
$(".closeFilter").click(function(e) {

    if (isBigFilterOpened) {
        $("#nav-bar").css({ display: "block" })
        $("#nav-bar").animate({ opacity: "1" }, 500);
        $("#navTopHeight").animate({ height: $("#nav-bar").outerHeight() + "px" }, 500);
        $("#productsNaviation").animate({ "height": heightOfProductsNaviation + "px", opacity: "1" }, 500);
        $("#allProducts").animate({ width: "100%" }, 500);
        $("#allProducts").removeClass("active");
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

function sizeDefaultHeight() {
    for (let sizeSelect of $(".sizeSelect")) {
        $(sizeSelect).children(".default").attr("previousHeight", $(sizeSelect).children(".default").height())
    }
}
sizeDefaultHeight();
//products size hover
$(".sizeSelect").hover(function() {
        // if($(this).hasClass("active")){

        // }
        if (!$(this).hasClass("active")) {
            let heightOfSizeSelect = 0;
            for (let li of $(this).children("li")) {
                heightOfSizeSelect += $(li).height();
            }
            heightOfSizeSelect -= $(this).children(".default").height();
            $(this).children(".default").animate({ height: "0px", opacity: "0" }, 350);

            $(this).parent(".sizeContent").animate({ height: heightOfSizeSelect + "px" }, 350);
            $(this).animate({ height: heightOfSizeSelect + "px" }, 350, function() {
                $(this).addClass("active");
            });
        }
    },
    function() {
        let heightOfSizeSelect = 0;
        $(this).children(".default").animate({ height: $(this).children(".default").attr("previousHeight") + "px", opacity: "1" }, 350);
        heightOfSizeSelect += +$(this).children(".default").attr("previousHeight");


        $(this).parent(".sizeContent").animate({ height: heightOfSizeSelect + "px" }, 350);
        $(this).animate({ height: heightOfSizeSelect + "px" }, 350, function() {
            $(this).removeClass("active");
        });

    });

$(".imgContent").hover(function() {
    $(this).children(".imgContentBottom").children(".sizeContent").animate({ height: $(".sizeSelect").children(".default").height() + "px" }, 350);
}, function() {
    $(this).children(".imgContentBottom").children(".sizeContent").animate({ height: "0px" }, 350);
})

mobileAndTabletCheck = function() {
    let check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


$(".productDetail").click(function(e) {
    if (mobileAndTabletCheck()) {
        e.preventDefault();
    }
});

$(".seeColumnButton").click(function(e) {
    e.preventDefault();
    if ($(this).hasClass("fourColumn")) {
        $(".product").removeClass("item2");
        $(".product").addClass("item4");
        $(this).removeClass("fourColumn");
        $(this).addClass("twoColumn");
        $(this).text($(this).attr('seeTwoColumn'));
    } else if ($(this).hasClass("twoColumn")) {
        $(".product").removeClass("item4");
        $(".product").addClass("item2");
        $(this).removeClass("twoColumn");
        $(this).addClass("fourColumn");
        $(this).text($(this).attr('seeFourColumn'));
    }
})

function loadImages() {
    let images = $(".unloadedImage");
    for (let image of images) {
        let newImage = document.createElement("img");
        newImage.src = $(image).data("src");
        $(newImage).on('load', function() {
            $(image).attr("src", this.src);
            let sources = $(image).siblings("source");
            let loadedSrc = sources[sources.length - 1];
            let loaded = $(loadedSrc).attr('loaded');
            if (typeof loaded !== typeof undefined && loaded !== false) {
                // $(sources[sources.length - 1]).remove();
                // $(image).parent().prepend(loadedSrc);
                $(image).parent().prepend(loadedSrc);
                //$(sources[0]).attr("srcset", $(loadedSrc).attr("srcset"));
                //$(sources[0]).attr("type", $(loadedSrc).attr("type"));
            }
            $(image).removeClass("unloadedImage");
            if ($(image).parent().parent().parent().hasClass("blur")) {
                $(image).parent().parent().parent().removeClass("blur");
                $(image).parent().parent().parent().siblings(".productInfo").removeClass("blur");
                $(image).parent().parent().parent().siblings(".loadContent").remove();
                $(image).addClass("unblur");
            }

        });
        $(newImage).on('error', function() {
            $(image).removeClass("unloadedImage");
            $(image).removeClass("blur");
            $(image).addClass("unblur");
        });
    }
}


var PRODUCTDETAIL;

function productDetailChangeToSlider() {
    console.log(ISCHANGEDTOSLIDER);
    if (WINDOW_WIDTH < LAPTOPS && !ISCHANGEDTOSLIDER) {
        console.log("1");
        ISCHANGEDTOSLIDER = true;
        $("#productDetail").children(".images").addClass("swiper-container").removeClass("imgContent");
        $("#productDetail").children(".images").children(".imagesWrap").addClass("swiper-wrapper").removeClass("imgContentWrapper");
        $("#productDetail").children(".images").children(".imagesWrap").children("div").addClass("swiper-slide").removeClass("productImage");

        PRODUCTDETAIL = new Swiper('.swiper-container', {
            direction: 'horizontal',
            speed: 400,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
            },
        });

        ProductDetailSliderChangeColor($(PRODUCTDETAIL.slides[PRODUCTDETAIL.snapIndex]).attr("color"));
        PRODUCTDETAIL.eventsListeners.snapIndexChange.push(function() {
            if (!PRODUCTDETAIL.destroyed) {
                console.log($(PRODUCTDETAIL.slides[PRODUCTDETAIL.snapIndex]).attr("color") + " " + PRODUCTDETAIL.snapIndex);
                ProductDetailSliderChangeColor($(PRODUCTDETAIL.slides[PRODUCTDETAIL.snapIndex]).attr("color"));
            }
        })
        $("#nav-height").css({ display: "none" });
    } else if (WINDOW_WIDTH > LAPTOPS && ISCHANGEDTOSLIDER == true) {
        console.log("2");
        ISCHANGEDTOSLIDER = false;
        $("#productDetail").children(".images").addClass("imgContent").removeClass("swiper-container");
        $("#productDetail").children(".images").children(".imagesWrap").addClass("imgContentWrapper").removeClass("swiper-wrapper");
        $("#productDetail").children(".images").children(".imagesWrap").children("div").addClass("productImage").removeClass("swiper-slide");
        $("#nav-height").css({ display: "block" });


        if (PRODUCTDETAIL != null && PRODUCTDETAIL != undefined) {
            PRODUCTDETAIL.destroy();

            ChangeGlobalTextColors("#000");
            changeColorsOfNav("#000");
            $("body").attr("navColor", "#000");

            $("#productDetail .images .swiper-button-next").remove();
            $("#productDetail .images").append('<div class="swiper-button-next"><img class="slideIcon" src="assets/img/right-white.svg" alt=""></div>');
            $("#productDetail .images .swiper-button-prev").remove();
            $("#productDetail .images").append('<div class="swiper-button-prev"><img class="slideIcon" src="assets/img/left-white.svg" alt=""></div>');
            $("#productDetail .swiper-pagination").remove();
            $("#productDetail .images").append('<div class="swiper-pagination"></div>');


        }
    }
}

function ProductDetailSliderChangeColor(color) {
    $("body").attr("navColor", color);
    ChangeGlobalTextColors(color);
    ChangeIconColorsOfProductDetailSlider(color)
}

// function ChangeGlobalTextColors(color) {
//     CURRENTSECTIONCOLOR = color;
//     for (let elem of $(COLORCHANGEDTEXTS)) {
//         $(elem).css({
//             "color": CURRENTSECTIONCOLOR,
//             "border-color": CURRENTSECTIONCOLOR
//         })
//     }
// }
function ChangeIconColorsOfProductDetailSlider(color) {
    for (let elem of IconsColorAndImageRelation) {
        if (elem.color == color) {
            if (PRODUCTDETAIL.eventsListeners.snapIndexChange != null && PRODUCTDETAIL.eventsListeners.snapIndexChange != undefined) {
                $(PRODUCTDETAIL.navigation.nextEl).children('.slideIcon').attr("src", elem.rightThinArrow)
                $(PRODUCTDETAIL.navigation.prevEl).children('.slideIcon').attr("src", elem.leftThinArrow)

                $(".swiper-container .swiper-pagination-bullet").css({ "background-color": color, "border": "1px solid " + color });
            }
        }
    }
    changeColorsOfNav(color);
}

function animateProductDetailBottomInfo() {
    let footerSection = document.getElementById("footer");
    let ProductDetailBottomInfoObserverOptions = {
        threshold: 0,
        rootMargin: "0px 0px 0px 0px"
    };
    let colorSectionObserver = new IntersectionObserver(function(entry, observer) {

        if (entry[0].isIntersecting) {
            $("#productBottomInfoDesktop").removeClass("active");
            $("#productBottomInfoMobile").removeClass("active");
            $(".colorFilter .popup").fadeOut("400");
            $(".sizeFilter .popup").fadeOut("400");
        } else {
            $("#productBottomInfoDesktop").addClass("active");
            $("#productBottomInfoMobile").addClass("active");
        }
    }, ProductDetailBottomInfoObserverOptions);
    colorSectionObserver.observe(footerSection);
}

//Product detail size select hover
$(".filter-type-js .view").hover(function() {
    let heightOfPopUp = $(this).siblings(".popupDesktop").outerHeight();
    $(this).siblings(".popupDesktop").css({ top: -heightOfPopUp + "px" });
    $(this).siblings(".popupDesktop").fadeIn("fast");
}, function(target) {
    if (!$(target.relatedTarget).hasClass("bridge")) {
        $(this).siblings(".popupDesktop").fadeOut("fast");
    }
})
$(".filter-type-js .popupDesktop").hover(function() {

}, function(target) {
    $(this).fadeOut("fast");
})

//Color Filter Mobile
$(".mobile-filter .view").click(function() {
    let popQuery = $(this).attr("popUp");
    openPopUp(popQuery);
});
$("#fixedCover").click(function() {
    closeFilterPopUp();
});

function openPopUp(popUpQuery) {
    $("#productBottomInfoMobile").removeClass("active");
    $("#fixedCover").fadeIn(400);
    $("body").css({ "overflow": "hidden" });
    console.log(popUpQuery);
    $(popUpQuery).addClass("active");
    $(popUpQuery).children(".popup").delay(400).animate({ bottom: 0 }, 400);
}

function closeFilterPopUp() {
    for (let popup of $(".filterMobilePopUps")) {
        if ($(popup).hasClass("active")) {
            $("#fixedCover").fadeOut(400);
            $("body").css({ "overflow": "auto" });
            $(popup).removeClass("active");
            $(popup).children(".popup").animate({ bottom: "-100%" }, 400, function() {
                $("#productBottomInfoMobile").addClass("active");
            });

        }
    }
}
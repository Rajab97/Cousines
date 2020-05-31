const colorChangedSections = document.querySelectorAll("[bcgColor]");
const colorSectionObserverOptions = {
    threshold: 0,
    rootMargin: "0px 0px -" + BROWSERHEIGHT + "px 0px"
};
const colorSectionObserver = new IntersectionObserver(function(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            changeColorsOfNav($(entry.target).attr("bcgColor"));
            ChangeGlobalTextColors($(entry.target).attr("bcgColor"));
        }
    }
}, colorSectionObserverOptions);

for (let section of colorChangedSections) {
    colorSectionObserver.observe(section);
}
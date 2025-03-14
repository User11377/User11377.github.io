document.addEventListener("DOMContentLoaded", function () {
    const moreText = document.getElementById("moreText");
    const btnText = document.getElementById("readMoreBtn");

    btnText.addEventListener("click", function () {
        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "inline";
            btnText.innerHTML = "Weniger anzeigen";
        } else {
            moreText.style.display = "none";
            btnText.innerHTML = "Mehr zu SmartScale";
        }
    });
});

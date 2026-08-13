const navLinks = document.querySelectorAll(".navlink");
const burger = document.querySelector(".harm-burger");
const links = document.querySelector(".links");
const icon = burger.querySelector("i");
const typing = document.querySelector("#text")
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#formStatus");
const submitBtn = document.querySelector("#submitBtn")


contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.querySelector("#name").value.trim()
    const email = document.querySelector("#email").value.trim()
    const message = document.querySelector("#message")
    if (!name || !email || !message) {
        formStatus.textContent = "Please fill all the feilds";
        return
    }
    submitBtn.disabled = true;
    submitBtn.textContent = "sending..."
    formStatus.textContent = ""

    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit"
        formStatus.textContent = "Response submitted successfully"

        contactForm.reset()
        setTimeout(() => {
            formStatus.textContent = "";
        }, 3000);

    }, 2000)

})

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navLinks.forEach((nav) => {
            nav.classList.remove('active');
        })
        link.classList.add("active");
        links.classList.remove("active");
        icon.classList.replace("fa-xmark", "fa-bars")
        // icon.classList.remove("fa-xmark");
        // icon.classList.add("fa-bars");
    })
})
const container = document.querySelector(".card");

const next = document.querySelector('.frwd-btn');
const previous = document.querySelector('.previous-btn')

next.addEventListener('click', () => {
    container.scrollBy({
        left: -320,
        behavior: "smooth"
    })
})
previous.addEventListener("click", () => {
    container.scrollBy({
        left: +320,
        behavior: "smooth"
    });
});


burger.addEventListener("click", () => {
    links.classList.toggle("active");

    if (links.classList.contains("active")) {
        // icon.classList.remove("fa-bars");
        // icon.classList.add("fa-xmark");
        icon.classList.replace("fa-bars", "fa-xmark")
    } else {
        icon.classList.replace("fa-xmark", "fa-bars")
    }

});
const text = [
    "MERN SACK DEVELOPER",
    "AI WITH FULLSTACK DEVELOPER",
    "FULL STACK DEVELOPER"
];
let charIndex = 0;
let textIndex = 0;

function type() {
    if (charIndex < text[textIndex].length) {
        typing.textContent += text[textIndex][charIndex]
        charIndex++;
        setTimeout(type, 100)
    }
    else {
        setTimeout(() => {
            textIndex++;
            charIndex = 0;
            if (textIndex >= text.length) {
                textIndex = 0;
                charIndex = 0
            }
            typing.textContent = "";

            setTimeout(type, 100)
        }, 2000)

    }
}
type()
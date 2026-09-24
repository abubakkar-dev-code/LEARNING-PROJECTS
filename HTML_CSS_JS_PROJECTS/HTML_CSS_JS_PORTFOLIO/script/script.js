const navLinks = document.querySelectorAll(".navlink");
const burger = document.querySelector(".harm-burger");
const links = document.querySelector(".links");
const icon = burger.querySelector("i");
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
// API-Data fetching
const API_URL = "http://localhost:5000/api";

async function getProfile() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error("Profile fetch failed:", error);
    }
}

function escapeHtml(value = "") {
    return String(value).replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
    })[character]);
}

async function getProjects() {
    try {
        const response = await axios.get(`${API_URL}/projects`);
        const projects = response.data.data || [];
        const projectsList = document.querySelector("#projects-list");
        projectsList.replaceChildren();

        projectsList.innerHTML = projects.map((project) => {
            const technologies = (project.technologies || [])
                .map((technology) => `<p>${escapeHtml(technology)}</p>`)
                .join("");
            const image = escapeHtml(project.images?.[0] || "./assets/Screenshot 2026-08-10 081420.png");
            const liveDemo = escapeHtml(project.liveDemo || "#");
            const githubUrl = escapeHtml(project.githubUrl || "#");
            const isOngoing = ["on-going", "ongoing"].includes(
                String(project.status || "").toLowerCase(),
            );
            const projectActions = isOngoing
                ? `<span style="margin: 10px 0; color: #a78bfa;">Update soon</span>`
                : `<a target="_blank" rel="noopener" href="${liveDemo}" style="display: flex;gap: 5px;margin-top: 10px;align-items: center;">Live Demo<span>↗</span></a>
                   <a target="_blank" rel="noopener" href="${githubUrl}" style="display: flex;gap: 5px;margin-top: 10px;">Git Hub<i class="fa-brands fa-github"></i></a>`;

            return `
                <div class="each-card">
                    <div class="card-top">
                        <div><img src="${image}" alt="${escapeHtml(project.title)}" onerror="this.onerror=null;this.src='./assets/Screenshot 2026-08-10 081420.png';" /></div>
                        <div>
                            <span style="color: white;padding: 5px 6px;background-color: #4f2aa5;border-radius: 7px;">${escapeHtml(project.status || "PROJECT")}</span>
                            <h4 style="margin-top: 25px;font-size: large;">${escapeHtml(project.title)}</h4>
                            <p style="font-size: smaller;margin-top: 20px;max-width: 500px;">${escapeHtml(project.shortDescription)}</p>
                        </div>
                    </div>
                    <div class="card-p" style="margin: 0 15px 15px;">${technologies}</div>
                    <div class="divider3"></div>
                    <div class="link-div" style="display: flex; justify-content: space-between;padding: 0 10px 12px 10px;">
                        ${projectActions}
                    </div>
                </div>`;
        }).join("");
    } catch (error) {
        console.error("Projects fetch failed:", error);
    }
}

getProfile()
getProjects()

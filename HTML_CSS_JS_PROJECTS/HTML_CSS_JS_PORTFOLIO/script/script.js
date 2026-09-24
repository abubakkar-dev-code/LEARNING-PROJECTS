const navLinks = document.querySelectorAll(".navlink");
const burger = document.querySelector(".harm-burger");
const links = document.querySelector(".links");
const icon = burger.querySelector("i");

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

function renderContactLinks(profile = {}) {
    const links = profile.socialLinks || [];
    const socialLinks = links.map((link) => {
        const label = link.toLowerCase().includes("github") ? "GitHub" :
            link.toLowerCase().includes("linkedin") ? "LinkedIn" : "Social profile";
        const icon = label === "GitHub" ? "fa-github" :
            label === "LinkedIn" ? "fa-linkedin" : "fa-link";
        return `<a class="contact-link" target="_blank" rel="noopener" href="${escapeHtml(link)}"><i class="fa-brands ${icon}"></i><span>${label}</span></a>`;
    }).join("");

    document.querySelector("#contact-links").innerHTML = `
        <a class="contact-link" href="mailto:${escapeHtml(profile.email)}"><i class="fa-solid fa-envelope"></i><span>${escapeHtml(profile.email)}</span></a>
        <a class="contact-link" href="tel:${escapeHtml(profile.phone)}"><i class="fa-solid fa-phone"></i><span>${escapeHtml(profile.phone)}</span></a>
        ${socialLinks}`;
}

async function getProfile() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        const result = await response.json();
        if (!response.ok || !result.data) {
            throw new Error(result.message || "Profile request failed");
        }
        const profile = result.data;
        renderContactLinks({
            email: profile.email || "hello@example.com",
            phone: profile.phone || "+91 8072062979",
            socialLinks: profile.socialLinks || [
                "https://github.com/abubakkar-dev-code",
                "https://www.linkedin.com/"
            ]
        });
    } catch (error) {
        console.error("Profile fetch failed:", error);
        renderContactLinks({
            email: "abubakkarm620@example.com",
            phone: "+91 8072062979",
            socialLinks: [
                "https://github.com/abubakkar-dev-code",
                "https://www.linkedin.com/in/abubakkar-a-a-692504267/"
            ]
        });
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

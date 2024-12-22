document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("resume-form").classList.remove("hidden");
});

// Autosave to localStorage
function saveFormData() {
    const formData = new FormData(document.getElementById("resume-form"));
    const formObject = {};

    // Save main form fields
    formData.forEach((value, key) => (formObject[key] = value));

    // Save dynamic fields
    formObject["experiences"] = getDynamicEntries("experience-container", "work-experience-group");
    formObject["educations"] = getDynamicEntries("education-container", "education-entry");
    formObject["projects"] = getDynamicEntries("projects-container", "project-entry");
    formObject["certifications"] = getDynamicEntries("certifications-container", "certification-entry");

    localStorage.setItem("resumeFormData", JSON.stringify(formObject));
}

function loadFormData() {
    const savedData = localStorage.getItem("resumeFormData");
    if (savedData) {
        const formObject = JSON.parse(savedData);

        // Load main form fields
        Object.keys(formObject).forEach((key) => {
            if (["experiences", "educations", "projects", "certifications"].includes(key)) return;
            const field = document.querySelector(`[name="${key}"]`);
            if (field) field.value = formObject[key];
        });

        // Load dynamic fields
        if (formObject["experiences"]) {
            loadDynamicEntries("experience-container", "work-experience-group", formObject["experiences"]);
        }
        if (formObject["educations"]) {
            loadDynamicEntries("education-container", "education-entry", formObject["educations"]);
        }
        if (formObject["projects"]) {
            loadDynamicEntries("projects-container", "project-entry", formObject["projects"]);
        }
        if (formObject["certifications"]) {
            loadDynamicEntries("certifications-container", "certification-entry", formObject["certifications"]);
        }

        updateResumePreview(); // Update preview with loaded data
    }
}

// Utility to extract dynamic entries
function getDynamicEntries(containerId, entryClass) {
    const container = document.getElementById(containerId);
    const entries = [];
    container.querySelectorAll(`.${entryClass}`).forEach((entry) => {
        const inputs = {};
        entry.querySelectorAll("input, textarea").forEach((field) => {
            inputs[field.name] = field.value;
        });
        entries.push(inputs);
    });
    return entries;
}

// Utility to load dynamic entries
function loadDynamicEntries(containerId, entryClass, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear existing entries
    data.forEach((item) => {
        const newEntry = document.createElement("div");
        newEntry.classList.add(entryClass);

        let entryHTML = "";
        Object.keys(item).forEach((key) => {
            const value = item[key];
            entryHTML += `
                <div class="input-group">
                    <label for="${key}">${key.split("-").join(" ")}</label>
                    ${key.includes("description") || key.includes("responsibilities") ? `
                    <textarea name="${key}" placeholder="${key.split("-").join(" ")}">${value}</textarea>` : `
                    <input type="text" name="${key}" placeholder="${key.split("-").join(" ")}" value="${value}">`}
                </div>
            `;
        });

        entryHTML += `<button type="button" class="remove-entry-button">Remove</button>`;
        newEntry.innerHTML = entryHTML;
        container.appendChild(newEntry);
    });
}

window.addEventListener("load", loadFormData);
document.querySelectorAll("input, textarea, select").forEach((field) => {
    field.addEventListener("input", () => {
        saveFormData();
        updateResumePreview();
    });
});

function handleAddRemoveButtons(containerId, entryClass) {
    const container = document.getElementById(containerId);

    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-entry-button")) {
            event.target.closest(`.${entryClass}`).remove();
            saveFormData();
            updateResumePreview();
        }
    });
}

document.getElementById("add-experience").addEventListener("click", () => {
    const container = document.getElementById("experience-container");
    const newExperience = document.createElement("div");
    newExperience.classList.add("work-experience-group");

    newExperience.innerHTML = `
        <div class="input-group">
            <label for="job-title">Job Title</label>
            <input type="text" name="job-title" placeholder="Software Engineer">
        </div>
        <div class="input-group">
            <label for="company">Company</label>
            <input type="text" name="company" placeholder="ABC Corp">
        </div>
        <div class="input-group">
            <label for="work-dates">Dates Worked</label>
            <input type="text" name="work-dates" placeholder="Jan 2020 - Dec 2022">
        </div>
        <div class="input-group">
            <label for="responsibilities">Responsibilities</label>
            <textarea name="responsibilities" placeholder="Describe your responsibilities and achievements"></textarea>
        </div>
        <button type="button" class="remove-entry-button">Remove</button>
    `;
    container.appendChild(newExperience);
    saveFormData();
    updateResumePreview();
});

document.getElementById("add-education").addEventListener("click", () => {
    const container = document.getElementById("education-container");
    const newEducation = document.createElement("div");
    newEducation.classList.add("education-entry");

    newEducation.innerHTML = `
        <div class="input-group">
            <label for="degree">Degree</label>
            <input type="text" name="degree" placeholder="B.Sc. in Computer Science">
        </div>
        <div class="input-group">
            <label for="institution">Institution</label>
            <input type="text" name="institution" placeholder="XYZ University">
        </div>
        <div class="input-group">
            <label for="graduation-year">Graduation Year</label>
            <input type="text" name="graduation-year" placeholder="2023">
        </div>
        <button type="button" class="remove-entry-button">Remove</button>
    `;
    container.appendChild(newEducation);
    saveFormData();
    updateResumePreview();
});

document.getElementById("add-project").addEventListener("click", () => {
    const container = document.getElementById("projects-container");
    const newProject = document.createElement("div");
    newProject.classList.add("project-entry");

    newProject.innerHTML = `
        <div class="input-group">
            <label for="project-title">Project Title</label>
            <input type="text" name="project-title" placeholder="Project Title">
        </div>
        <div class="input-group">
            <label for="project-description">Description</label>
            <textarea name="project-description" placeholder="Describe the project"></textarea>
        </div>
        <button type="button" class="remove-entry-button">Remove</button>
    `;
    container.appendChild(newProject);
    saveFormData();
    updateResumePreview();
});

document.getElementById("add-certification").addEventListener("click", () => {
    const container = document.getElementById("certifications-container");
    const newCertification = document.createElement("div");
    newCertification.classList.add("certification-entry");

    newCertification.innerHTML = `
        <div class="input-group">
            <label for="certification-title">Certification Title</label>
            <input type="text" name="certification-title" placeholder="Certification Title">
        </div>
        <div class="input-group">
            <label for="certification-year">Year</label>
            <input type="text" name="certification-year" placeholder="Year">
        </div>
        <button type="button" class="remove-entry-button">Remove</button>
    `;
    container.appendChild(newCertification);
    saveFormData();
    updateResumePreview();
});

handleAddRemoveButtons("experience-container", "work-experience-group");
handleAddRemoveButtons("education-container", "education-entry");
handleAddRemoveButtons("projects-container", "project-entry");
handleAddRemoveButtons("certifications-container", "certification-entry");

function updateResumePreview() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const linkedin = document.getElementById("linkedin").value;
    const portfolio = document.getElementById("portfolio").value;
    const summary = document.getElementById("summary").value;

    const educationGroups = document.querySelectorAll(".education-entry");
    let educationDetails = "";
    educationGroups.forEach((group) => {
        const degree = group.querySelector('input[name="degree"]').value;
        const institution = group.querySelector('input[name="institution"]').value;
        const graduationYear = group.querySelector('input[name="graduation-year"]').value;

        educationDetails += `
            <p><strong>${degree}</strong>, ${institution} (${graduationYear})</p>
        `;
    });

    const experienceGroups = document.querySelectorAll(".work-experience-group");
    let experiences = "";
    experienceGroups.forEach((group) => {
        const jobTitle = group.querySelector('input[name="job-title"]').value;
        const company = group.querySelector('input[name="company"]').value;
        const workDates = group.querySelector('input[name="work-dates"]').value;
        const responsibilities = group.querySelector('textarea[name="responsibilities"]').value;

        experiences += `
            <div class="experience-item">
                <p><strong>${jobTitle}</strong> at ${company} (${workDates})</p>
                <p>${responsibilities}</p>
            </div>
        `;
    });

    const projectGroups = document.querySelectorAll(".project-entry");
    let projects = "";
    projectGroups.forEach((group) => {
        const projectTitle = group.querySelector('input[name="project-title"]').value;
        const projectDescription = group.querySelector('textarea[name="project-description"]').value;

        projects += `
            <div class="project-item">
                <p><strong>${projectTitle}</strong></p>
                <p>${projectDescription}</p>
            </div>
        `;
    });

    const certificationGroups = document.querySelectorAll(".certification-entry");
    let certifications = "";
    certificationGroups.forEach((group) => {
        const certificationTitle = group.querySelector('input[name="certification-title"]').value;
        const certificationYear = group.querySelector('input[name="certification-year"]').value;

        certifications += `
            <p><strong>${certificationTitle}</strong> (${certificationYear})</p>
        `;
    });

    const skills = document.getElementById("skills").value;
    const style = document.getElementById("style").value;

    const output = `
        <div class="${style}">
            <div class="header">
                <h1>${name}</h1>
                <p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
                <p><strong>LinkedIn:</strong> ${linkedin} | <strong>Portfolio:</strong> ${portfolio}</p>
            </div>
            <h2>Summary</h2>
            <p>${summary}</p>
            <h2>Education</h2>
            ${educationDetails}
            <h2>Work Experience</h2>
            ${experiences}
            <h2>Projects</h2>
            ${projects}
            <h2>Certifications</h2>
            ${certifications}
            <h2>Skills</h2>
            <p>${skills}</p>
        </div>
    `;

    const outputDiv = document.getElementById("resume-output");
    outputDiv.innerHTML = output;
    outputDiv.classList.remove("hidden");
    document.getElementById("download-resume").classList.remove("hidden");
}

document.getElementById("download-resume").addEventListener("click", () => {
    const element = document.getElementById("resume-output");
    const opt = {
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 4, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
});

document.getElementById("autofill-resume").addEventListener("click", function () {
    document.getElementById("name").value = "Aadithya Srinivasan";
    document.getElementById("email").value = "aasri@seas.upenn.edu";
    document.getElementById("phone").value = "+1 908-565-1881";
    document.getElementById("linkedin").value = "https://linkedin.com/in/aadithya-srinivasan-777936269/";
    document.getElementById("portfolio").value = "https://asrinivasan75.github.io/";
    document.getElementById("summary").value = "Experienced professional with a strong background in software engineering and data analysis.";

    document.getElementById("education-container").innerHTML = `
        <div class="education-entry">
            <div class="input-group">
                <label for="degree">Degree</label>
                <input type="text" name="degree" placeholder="B.Sc. in Computer Science" value="B.Sc. in Computer Science">
            </div>
            <div class="input-group">
                <label for="institution">Institution</label>
                <input type="text" name="institution" placeholder="University of Pennsylvania" value="University of Pennsylvania">
            </div>
            <div class="input-group">
                <label for="graduation-year">Graduation Year</label>
                <input type="text" name="graduation-year" placeholder="2023" value="2023">
            </div>
            <button type="button" class="remove-entry-button">Remove</button>
        </div>
    `;

    document.getElementById("experience-container").innerHTML = `
        <div class="work-experience-group">
            <div class="input-group">
                <label for="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="Software Engineer" value="Software Engineer">
            </div>
            <div class="input-group">
                <label for="company">Company</label>
                <input type="text" name="company" placeholder="ABC Corp" value="ABC Corp">
            </div>
            <div class="input-group">
                <label for="work-dates">Dates Worked</label>
                <input type="text" name="work-dates" placeholder="Jan 2020 - Dec 2022" value="Jan 2020 - Dec 2022">
            </div>
            <div class="input-group">
                <label for="responsibilities">Responsibilities</label>
                <textarea name="responsibilities" placeholder="Describe your responsibilities and achievements">Led a team to develop a scalable e-commerce platform.</textarea>
            </div>
            <button type="button" class="remove-entry-button">Remove</button>
        </div>
    `;

    document.getElementById("projects-container").innerHTML = `
        <div class="project-entry">
            <div class="input-group">
                <label for="project-title">Project Title</label>
                <input type="text" name="project-title" placeholder="ML for Predictive Analysis" value="ML for Predictive Analysis">
            </div>
            <div class="input-group">
                <label for="project-description">Description</label>
                <textarea name="project-description" placeholder="Describe the project">Developed predictive models using machine learning techniques.</textarea>
            </div>
            <button type="button" class="remove-entry-button">Remove</button>
        </div>
        <div class="project-entry">
            <div class="input-group">
                <label for="project-title">Project Title</label>
                <input type="text" name="project-title" placeholder="Web Development for E-commerce" value="Web Development for E-commerce">
            </div>
            <div class="input-group">
                <label for="project-description">Description</label>
                <textarea name="project-description" placeholder="Describe the project">Built a full-stack web application for an online store using React and Node.js.</textarea>
            </div>
            <button type="button" class="remove-entry-button">Remove</button>
        </div>
    `;

    document.getElementById("certifications-container").innerHTML = `
        <div class="certification-entry">
            <div class="input-group">
                <label for="certification-title">Certification Title</label>
                <input type="text" name="certification-title" placeholder="Certified JavaScript Developer" value="Certified JavaScript Developer">
            </div>
            <div class="input-group">
                <label for="certification-year">Year</label>
                <input type="text" name="certification-year" placeholder="2021" value="2021">
            </div>
            <button type="button" class="remove-entry-button">Remove</button>
        </div>
        <div class="certification-entry">
            <div class="input-group">
                <label for="certification-title">Certification Title</label>
                <input type="text" name="certification-title" placeholder="Certified Data Analyst" value="Certified Data Analyst">
            </div>
            <div class="input-group">
                <label for="certification-year">Year</label>
                <input type="text" name="certification-year" placeholder="2020" value="2020">
            </div>
            <button type="button" class="remove-entry-button">Remove</button>
        </div>
    `;

    document.getElementById("skills").value = "JavaScript, Python, Machine Learning, Data Analysis, Software Engineering, React, Node.js";

    updateResumePreview();
});

document.getElementById("generate-resume").addEventListener("click", updateResumePreview);

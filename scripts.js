document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("resume-form").classList.remove("hidden");
});

function handleAddRemoveButtons(containerId, entryClass) {
    const container = document.getElementById(containerId);

    container.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-entry-button")) {
            event.target.closest(`.${entryClass}`).remove();
            updateResumePreview(); // Update the preview when items are removed
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
    updateResumePreview(); // Update the preview when new entries are added
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
    updateResumePreview(); // Update the preview when new entries are added
});

handleAddRemoveButtons("experience-container", "work-experience-group");
handleAddRemoveButtons("education-container", "education-entry");

document.getElementById("style").addEventListener("change", updateResumePreview);
document.getElementById("name").addEventListener("input", updateResumePreview);
document.getElementById("email").addEventListener("input", updateResumePreview);
document.getElementById("phone").addEventListener("input", updateResumePreview);
document.getElementById("linkedin").addEventListener("input", updateResumePreview);
document.getElementById("portfolio").addEventListener("input", updateResumePreview);
document.getElementById("skills").addEventListener("input", updateResumePreview);

function updateResumePreview() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const linkedin = document.getElementById("linkedin").value;
    const portfolio = document.getElementById("portfolio").value;

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
            <p><strong>${jobTitle}</strong> at ${company} (${workDates})</p>
            <p>${responsibilities}</p>
        `;
    });

    const skills = document.getElementById("skills").value;
    const style = document.getElementById("style").value;

    const output = `
        <div class="${style}">
            <h1>${name}</h1>
            <p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
            <p><strong>LinkedIn:</strong> ${linkedin} | <strong>Portfolio:</strong> ${portfolio}</p>
            <h2>Education</h2>
            ${educationDetails}
            <h2>Work Experience</h2>
            ${experiences}
            <h2>Skills</h2>
            <p>${skills}</p>
        </div>
    `;

    const outputDiv = document.getElementById("resume-output");
    outputDiv.innerHTML = output;
    outputDiv.classList.remove("hidden");
    document.getElementById("download-resume").classList.remove("hidden");
}

document.getElementById("download-resume").addEventListener("click", function () {
    const doc = new jspdf.jsPDF({
        format: 'letter', // 8.5 x 11 inches
        unit: 'in',
    });
    const content = document.getElementById("resume-output");
    doc.html(content, {
        callback: function (doc) {
            doc.save("resume.pdf");
        },
        x: 0.5,
        y: 0.5,
        width: 7.5, // Adjust width
    });
});

document.getElementById("autofill-resume").addEventListener("click", function () {
    document.getElementById("name").value = "John Doe";
    document.getElementById("email").value = "johndoe@example.com";
    document.getElementById("phone").value = "+1 123-456-7890";
    document.getElementById("linkedin").value = "https://linkedin.com/in/johndoe";
    document.getElementById("portfolio").value = "https://johndoe.dev";

    document.getElementById("education-container").innerHTML = `
        <div class="education-entry">
            <div class="input-group">
                <label for="degree">Degree</label>
                <input type="text" name="degree" placeholder="B.Sc. in Computer Science" value="B.Sc. in Computer Science">
            </div>
            <div class="input-group">
                <label for="institution">Institution</label>
                <input type="text" name="institution" placeholder="XYZ University" value="XYZ University">
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

    document.getElementById("skills").value = "JavaScript, Python, Team Leadership";

    updateResumePreview();
});

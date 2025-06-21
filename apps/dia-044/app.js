// Generador de CV en PDF - Día 44
class CVGenerator {
    constructor() {
        this.experienceCount = 1;
        this.educationCount = 1;
        this.projectCount = 1;
        this.languageCount = 1;
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadTemplate();
    }

    initializeElements() {
        this.previewSection = document.getElementById("previewSection");
        this.cvPreview = document.getElementById("cvPreview");
        this.experienceContainer = document.getElementById("experienceContainer");
        this.educationContainer = document.getElementById("educationContainer");
        this.projectsContainer = document.getElementById("projectsContainer");
        this.languagesContainer = document.getElementById("languagesContainer");
    }

    setupEventListeners() {
        // Botones principales
        document.getElementById("previewCV").addEventListener("click", () => this.previewCV());
        document.getElementById("downloadPDF").addEventListener("click", () => this.downloadPDF());
        document.getElementById("loadTemplate").addEventListener("click", () => this.loadTemplate());
        document.getElementById("clearForm").addEventListener("click", () => this.clearForm());

        // Botones de agregar
        document.getElementById("addExperience").addEventListener("click", () => this.addExperience());
        document.getElementById("addEducation").addEventListener("click", () => this.addEducation());
        document.getElementById("addProject").addEventListener("click", () => this.addProject());
        document.getElementById("addLanguage").addEventListener("click", () => this.addLanguage());

        // Checkbox de trabajo actual
        document.addEventListener("change", (e) => {
            if (e.target.classList.contains("current-job")) {
                const endDateInput = e.target.closest(".experience-item").querySelector(".end-date");
                if (e.target.checked) {
                    endDateInput.value = "";
                    endDateInput.disabled = true;
                } else {
                    endDateInput.disabled = false;
                }
            }
        });
    }

    addExperience() {
        const container = this.experienceContainer;
        const experienceItem = document.createElement("div");
        experienceItem.className = "experience-item";
        experienceItem.innerHTML = `
            <div class="form-group">
                <label>Puesto</label>
                <input type="text" class="job-title" placeholder="Desarrollador Frontend">
            </div>
            <div class="form-group">
                <label>Empresa</label>
                <input type="text" class="company" placeholder="Nombre de la empresa">
            </div>
            <div class="form-group">
                <label>Ubicación</label>
                <input type="text" class="job-location" placeholder="Ciudad, País">
            </div>
            <div class="form-group">
                <label>Fecha de Inicio</label>
                <input type="month" class="start-date">
            </div>
            <div class="form-group">
                <label>Fecha de Fin</label>
                <input type="month" class="end-date">
                <label class="checkbox-label">
                    <input type="checkbox" class="current-job"> Trabajo actual
                </label>
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea class="job-description" rows="3" placeholder="Describe tus responsabilidades y logros..."></textarea>
            </div>
            <button class="btn btn-danger remove-experience">Eliminar</button>
        `;
        
        container.appendChild(experienceItem);
        this.experienceCount++;
        
        // Event listener para eliminar
        experienceItem.querySelector(".remove-experience").addEventListener("click", () => {
            experienceItem.remove();
        });
    }

    addEducation() {
        const container = this.educationContainer;
        const educationItem = document.createElement("div");
        educationItem.className = "education-item";
        educationItem.innerHTML = `
            <div class="form-group">
                <label>Título</label>
                <input type="text" class="degree" placeholder="Licenciatura en Ciencias de la Computación">
            </div>
            <div class="form-group">
                <label>Institución</label>
                <input type="text" class="institution" placeholder="Nombre de la universidad">
            </div>
            <div class="form-group">
                <label>Ubicación</label>
                <input type="text" class="edu-location" placeholder="Ciudad, País">
            </div>
            <div class="form-group">
                <label>Fecha de Graduación</label>
                <input type="month" class="graduation-date">
            </div>
            <div class="form-group">
                <label>GPA (opcional)</label>
                <input type="text" class="gpa" placeholder="3.8/4.0">
            </div>
            <button class="btn btn-danger remove-education">Eliminar</button>
        `;
        
        container.appendChild(educationItem);
        this.educationCount++;
        
        // Event listener para eliminar
        educationItem.querySelector(".remove-education").addEventListener("click", () => {
            educationItem.remove();
        });
    }

    addProject() {
        const container = this.projectsContainer;
        const projectItem = document.createElement("div");
        projectItem.className = "project-item";
        projectItem.innerHTML = `
            <div class="form-group">
                <label>Nombre del Proyecto</label>
                <input type="text" class="project-name" placeholder="Mi Proyecto Web">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <textarea class="project-description" rows="2" placeholder="Breve descripción del proyecto..."></textarea>
            </div>
            <div class="form-group">
                <label>URL (opcional)</label>
                <input type="url" class="project-url" placeholder="https://mi-proyecto.com">
            </div>
            <div class="form-group">
                <label>Tecnologías</label>
                <input type="text" class="project-tech" placeholder="React, Node.js, MongoDB">
            </div>
            <button class="btn btn-danger remove-project">Eliminar</button>
        `;
        
        container.appendChild(projectItem);
        this.projectCount++;
        
        // Event listener para eliminar
        projectItem.querySelector(".remove-project").addEventListener("click", () => {
            projectItem.remove();
        });
    }

    addLanguage() {
        const container = this.languagesContainer;
        const languageItem = document.createElement("div");
        languageItem.className = "language-item";
        languageItem.innerHTML = `
            <div class="form-group">
                <label>Idioma</label>
                <input type="text" class="language-name" placeholder="Español">
            </div>
            <div class="form-group">
                <label>Nivel</label>
                <select class="language-level">
                    <option value="Nativo">Nativo</option>
                    <option value="Avanzado">Avanzado</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Básico">Básico</option>
                </select>
            </div>
            <button class="btn btn-danger remove-language">Eliminar</button>
        `;
        
        container.appendChild(languageItem);
        this.languageCount++;
        
        // Event listener para eliminar
        languageItem.querySelector(".remove-language").addEventListener("click", () => {
            languageItem.remove();
        });
    }

    getFormData() {
        const data = {
            personal: {
                fullName: document.getElementById("fullName").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                location: document.getElementById("location").value,
                linkedin: document.getElementById("linkedin").value,
                github: document.getElementById("github").value,
                summary: document.getElementById("summary").value
            },
            experience: [],
            education: [],
            skills: document.getElementById("skills").value.split(",").map(s => s.trim()).filter(s => s),
            projects: [],
            languages: []
        };

        // Experiencia
        document.querySelectorAll(".experience-item").forEach(item => {
            const experience = {
                title: item.querySelector(".job-title").value,
                company: item.querySelector(".company").value,
                location: item.querySelector(".job-location").value,
                startDate: item.querySelector(".start-date").value,
                endDate: item.querySelector(".current-job").checked ? "Presente" : item.querySelector(".end-date").value,
                description: item.querySelector(".job-description").value
            };
            if (experience.title || experience.company) {
                data.experience.push(experience);
            }
        });

        // Educación
        document.querySelectorAll(".education-item").forEach(item => {
            const education = {
                degree: item.querySelector(".degree").value,
                institution: item.querySelector(".institution").value,
                location: item.querySelector(".edu-location").value,
                graduationDate: item.querySelector(".graduation-date").value,
                gpa: item.querySelector(".gpa").value
            };
            if (education.degree || education.institution) {
                data.education.push(education);
            }
        });

        // Proyectos
        document.querySelectorAll(".project-item").forEach(item => {
            const project = {
                name: item.querySelector(".project-name").value,
                description: item.querySelector(".project-description").value,
                url: item.querySelector(".project-url").value,
                technologies: item.querySelector(".project-tech").value
            };
            if (project.name || project.description) {
                data.projects.push(project);
            }
        });

        // Idiomas
        document.querySelectorAll(".language-item").forEach(item => {
            const language = {
                name: item.querySelector(".language-name").value,
                level: item.querySelector(".language-level").value
            };
            if (language.name) {
                data.languages.push(language);
            }
        });

        return data;
    }

    previewCV() {
        const data = this.getFormData();
        const cvHTML = this.generateCVHTML(data);
        
        this.cvPreview.innerHTML = cvHTML;
        this.previewSection.style.display = "block";
        
        // Scroll to preview
        this.previewSection.scrollIntoView({ behavior: "smooth" });
    }

    generateCVHTML(data) {
        let html = `
            <div class="cv-header">
                <div class="cv-name">${data.personal.fullName || "Tu Nombre"}</div>
                <div class="cv-contact">${data.personal.email || "tu@email.com"}</div>
                <div class="cv-contact">${data.personal.phone || "+1 234 567 8900"}</div>
                <div class="cv-contact">${data.personal.location || "Ciudad, País"}</div>
                ${data.personal.linkedin ? `<div class="cv-contact">LinkedIn: ${data.personal.linkedin}</div>` : ""}
                ${data.personal.github ? `<div class="cv-contact">GitHub: ${data.personal.github}</div>` : ""}
            </div>
        `;

        // Resumen
        if (data.personal.summary) {
            html += `
                <div class="cv-section">
                    <h3>Resumen Profesional</h3>
                    <p>${data.personal.summary}</p>
                </div>
            `;
        }

        // Experiencia
        if (data.experience.length > 0) {
            html += `
                <div class="cv-section">
                    <h3>Experiencia Laboral</h3>
            `;
            data.experience.forEach(exp => {
                html += `
                    <div class="cv-item">
                        <div class="cv-item-title">${exp.title}</div>
                        <div class="cv-item-company">${exp.company} - ${exp.location}</div>
                        <div class="cv-item-date">${this.formatDate(exp.startDate)} - ${exp.endDate}</div>
                        <div class="cv-item-description">${exp.description}</div>
                    </div>
                `;
            });
            html += `</div>`;
        }

        // Educación
        if (data.education.length > 0) {
            html += `
                <div class="cv-section">
                    <h3>Educación</h3>
            `;
            data.education.forEach(edu => {
                html += `
                    <div class="cv-item">
                        <div class="cv-item-title">${edu.degree}</div>
                        <div class="cv-item-company">${edu.institution} - ${edu.location}</div>
                        <div class="cv-item-date">${this.formatDate(edu.graduationDate)}${edu.gpa ? ` - GPA: ${edu.gpa}` : ""}</div>
                    </div>
                `;
            });
            html += `</div>`;
        }

        // Habilidades
        if (data.skills.length > 0) {
            html += `
                <div class="cv-section">
                    <h3>Habilidades</h3>
                    <div class="cv-skills">
            `;
            data.skills.forEach(skill => {
                html += `<span class="cv-skill">${skill}</span>`;
            });
            html += `</div></div>`;
        }

        // Proyectos
        if (data.projects.length > 0) {
            html += `
                <div class="cv-section">
                    <h3>Proyectos</h3>
            `;
            data.projects.forEach(project => {
                html += `
                    <div class="cv-project">
                        <div class="cv-project-name">${project.name}</div>
                        <div class="cv-project-tech">${project.technologies}</div>
                        <div class="cv-item-description">${project.description}</div>
                        ${project.url ? `<div class="cv-item-description">URL: ${project.url}</div>` : ""}
                    </div>
                `;
            });
            html += `</div>`;
        }

        // Idiomas
        if (data.languages.length > 0) {
            html += `
                <div class="cv-section">
                    <h3>Idiomas</h3>
            `;
            data.languages.forEach(lang => {
                html += `
                    <div class="cv-language">
                        <span class="cv-language-name">${lang.name}</span>
                        <span class="cv-language-level">${lang.level}</span>
                    </div>
                `;
            });
            html += `</div>`;
        }

        return html;
    }

    formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString + "-01");
        return date.toLocaleDateString("es-ES", { year: "numeric", month: "long" });
    }

    async downloadPDF() {
        try {
            // Mostrar loading
            const downloadBtn = document.getElementById("downloadPDF");
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = "Generando PDF...";
            downloadBtn.disabled = true;

            // Generar CV si no está visible
            if (this.previewSection.style.display === "none") {
                this.previewCV();
            }

            // Esperar un poco para que se renderice
            await new Promise(resolve => setTimeout(resolve, 500));

            // Generar PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("p", "mm", "a4");
            
            // Configurar fuente
            pdf.setFont("helvetica");
            
            // Generar contenido del PDF
            const data = this.getFormData();
            this.generatePDFContent(pdf, data);
            
            // Descargar
            pdf.save(`${data.personal.fullName || "CV"}_${new Date().toISOString().split("T")[0]}.pdf`);
            
            // Restaurar botón
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
            
        } catch (error) {
            console.error("Error generando PDF:", error);
            alert("Error al generar el PDF. Asegúrate de que las librerías estén cargadas correctamente.");
            
            // Restaurar botón
            const downloadBtn = document.getElementById("downloadPDF");
            downloadBtn.textContent = "Descargar PDF";
            downloadBtn.disabled = false;
        }
    }

    generatePDFContent(pdf, data) {
        let y = 20;
        const pageWidth = 210;
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        
        // Título
        pdf.setFontSize(24);
        pdf.setFont("helvetica", "bold");
        pdf.text(data.personal.fullName || "Tu Nombre", margin, y);
        y += 10;
        
        // Información de contacto
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        const contactInfo = [
            data.personal.email || "tu@email.com",
            data.personal.phone || "+1 234 567 8900",
            data.personal.location || "Ciudad, País"
        ].filter(info => info);
        
        contactInfo.forEach(info => {
            pdf.text(info, margin, y);
            y += 5;
        });
        
        y += 10;
        
        // Resumen
        if (data.personal.summary) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("Resumen Profesional", margin, y);
            y += 8;
            
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            const summaryLines = pdf.splitTextToSize(data.personal.summary, contentWidth);
            pdf.text(summaryLines, margin, y);
            y += summaryLines.length * 5 + 10;
        }
        
        // Experiencia
        if (data.experience.length > 0) {
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("Experiencia Laboral", margin, y);
            y += 8;
            
            data.experience.forEach(exp => {
                if (y > 250) {
                    pdf.addPage();
                    y = 20;
                }
                
                pdf.setFontSize(12);
                pdf.setFont("helvetica", "bold");
                pdf.text(exp.title, margin, y);
                y += 6;
                
                pdf.setFontSize(10);
                pdf.setFont("helvetica", "normal");
                pdf.text(`${exp.company} - ${exp.location}`, margin, y);
                y += 5;
                pdf.text(`${this.formatDate(exp.startDate)} - ${exp.endDate}`, margin, y);
                y += 5;
                
                if (exp.description) {
                    const descLines = pdf.splitTextToSize(exp.description, contentWidth);
                    pdf.text(descLines, margin, y);
                    y += descLines.length * 5;
                }
                y += 8;
            });
        }
        
        // Educación
        if (data.education.length > 0) {
            if (y > 200) {
                pdf.addPage();
                y = 20;
            }
            
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("Educación", margin, y);
            y += 8;
            
            data.education.forEach(edu => {
                pdf.setFontSize(12);
                pdf.setFont("helvetica", "bold");
                pdf.text(edu.degree, margin, y);
                y += 6;
                
                pdf.setFontSize(10);
                pdf.setFont("helvetica", "normal");
                pdf.text(`${edu.institution} - ${edu.location}`, margin, y);
                y += 5;
                pdf.text(`${this.formatDate(edu.graduationDate)}${edu.gpa ? ` - GPA: ${edu.gpa}` : ""}`, margin, y);
                y += 10;
            });
        }
        
        // Habilidades
        if (data.skills.length > 0) {
            if (y > 220) {
                pdf.addPage();
                y = 20;
            }
            
            pdf.setFontSize(14);
            pdf.setFont("helvetica", "bold");
            pdf.text("Habilidades", margin, y);
            y += 8;
            
            pdf.setFontSize(10);
            pdf.setFont("helvetica", "normal");
            pdf.text(data.skills.join(", "), margin, y);
            y += 15;
        }
    }

    loadTemplate() {
        // Cargar datos de ejemplo
        document.getElementById("fullName").value = "Juan Pérez";
        document.getElementById("email").value = "juan.perez@email.com";
        document.getElementById("phone").value = "+1 234 567 8900";
        document.getElementById("location").value = "Madrid, España";
        document.getElementById("linkedin").value = "https://linkedin.com/in/juanperez";
        document.getElementById("github").value = "https://github.com/juanperez";
        document.getElementById("summary").value = "Desarrollador Full Stack con 5 años de experiencia en tecnologías web modernas. Especializado en React, Node.js y bases de datos. Apasionado por crear soluciones innovadoras y escalables.";
        document.getElementById("skills").value = "JavaScript, React, Node.js, Python, SQL, MongoDB, Git, Docker, AWS";
    }

    clearForm() {
        if (confirm("¿Estás seguro de que quieres limpiar todo el formulario?")) {
            // Limpiar campos personales
            document.getElementById("fullName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("location").value = "";
            document.getElementById("linkedin").value = "";
            document.getElementById("github").value = "";
            document.getElementById("summary").value = "";
            document.getElementById("skills").value = "";
            
            // Limpiar contenedores
            this.experienceContainer.innerHTML = "";
            this.educationContainer.innerHTML = "";
            this.projectsContainer.innerHTML = "";
            this.languagesContainer.innerHTML = "";
            
            // Ocultar preview
            this.previewSection.style.display = "none";
            
            // Reiniciar contadores
            this.experienceCount = 1;
            this.educationCount = 1;
            this.projectCount = 1;
            this.languageCount = 1;
        }
    }
}

// Inicializar generador de CV
document.addEventListener("DOMContentLoaded", () => {
    new CVGenerator();
});

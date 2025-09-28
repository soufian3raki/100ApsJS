// Calculadora de IMC - Día 45
class BMICalculator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.heightInput = document.getElementById("height");
        this.weightInput = document.getElementById("weight");
        this.ageInput = document.getElementById("age");
        this.genderSelect = document.getElementById("gender");
        this.activitySelect = document.getElementById("activity");
        this.calculateBtn = document.getElementById("calculateBtn");
        this.clearBtn = document.getElementById("clearBtn");
        this.resultsSection = document.getElementById("resultsSection");
        this.bmiValue = document.getElementById("bmiValue");
        this.bmiCategory = document.getElementById("bmiCategory");
        this.chartFill = document.getElementById("chartFill");
        this.recommendations = document.getElementById("recommendations");
        this.idealWeight = document.getElementById("idealWeight");
        this.idealWeightRange = document.getElementById("idealWeightRange");
        this.dailyCalories = document.getElementById("dailyCalories");
        this.calorieRange = document.getElementById("calorieRange");
        this.dailyWater = document.getElementById("dailyWater");
    }

    setupEventListeners() {
        this.calculateBtn.addEventListener("click", () => this.calculateBMI());
        this.clearBtn.addEventListener("click", () => this.clearForm());
        
        // Calcular automáticamente cuando se cambien los valores
        [this.heightInput, this.weightInput, this.ageInput, this.genderSelect, this.activitySelect].forEach(input => {
            input.addEventListener("input", () => this.calculateBMI());
        });
    }

    calculateBMI() {
        const height = parseFloat(this.heightInput.value);
        const weight = parseFloat(this.weightInput.value);
        const age = parseInt(this.ageInput.value);
        const gender = this.genderSelect.value;
        const activity = this.activitySelect.value;

        // Validar datos
        if (!height || !weight || !age || !gender || !activity) {
            this.resultsSection.style.display = "none";
            return;
        }

        // Calcular IMC
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // Mostrar resultados
        this.displayResults(bmi, weight, height, age, gender, activity);
    }

    displayResults(bmi, weight, height, age, gender, activity) {
        // Mostrar sección de resultados
        this.resultsSection.style.display = "block";
        
        // Actualizar valor de IMC
        this.bmiValue.textContent = bmi.toFixed(1);
        
        // Determinar categoría
        const category = this.getBMICategory(bmi);
        this.bmiCategory.textContent = category.name;
        this.bmiCategory.className = `bmi-category ${category.class}`;
        
        // Actualizar gráfico
        this.updateChart(bmi);
        
        // Generar recomendaciones
        this.generateRecommendations(bmi, weight, height, age, gender, activity);
        
        // Calcular información adicional
        this.calculateAdditionalInfo(weight, height, age, gender, activity);
        
        // Scroll a resultados
        this.resultsSection.scrollIntoView({ behavior: "smooth" });
    }

    getBMICategory(bmi) {
        if (bmi < 18.5) {
            return { name: "Bajo peso", class: "underweight" };
        } else if (bmi >= 18.5 && bmi < 25) {
            return { name: "Peso normal", class: "normal" };
        } else if (bmi >= 25 && bmi < 30) {
            return { name: "Sobrepeso", class: "overweight" };
        } else {
            return { name: "Obesidad", class: "obese" };
        }
    }

    updateChart(bmi) {
        // Calcular posición en el gráfico (0-100%)
        let percentage;
        if (bmi < 15) {
            percentage = 5;
        } else if (bmi > 40) {
            percentage = 95;
        } else {
            percentage = ((bmi - 15) / (40 - 15)) * 90 + 5;
        }
        
        this.chartFill.style.width = `${percentage}%`;
    }

    generateRecommendations(bmi, weight, height, age, gender, activity) {
        const recommendations = [];
        
        if (bmi < 18.5) {
            recommendations.push({
                title: "Aumentar de peso de forma saludable",
                description: "Consume más calorías de fuentes nutritivas como frutos secos, aguacate y proteínas magras."
            });
            recommendations.push({
                title: "Ejercicio de fuerza",
                description: "Incluye entrenamiento de resistencia para ganar masa muscular de forma saludable."
            });
        } else if (bmi >= 18.5 && bmi < 25) {
            recommendations.push({
                title: "Mantener el peso actual",
                description: "Continúa con una dieta balanceada y ejercicio regular para mantener tu peso saludable."
            });
            recommendations.push({
                title: "Ejercicio regular",
                description: "Mantén al menos 150 minutos de actividad física moderada por semana."
            });
        } else if (bmi >= 25 && bmi < 30) {
            recommendations.push({
                title: "Reducir peso gradualmente",
                description: "Crea un déficit calórico moderado de 300-500 calorías por día."
            });
            recommendations.push({
                title: "Ejercicio cardiovascular",
                description: "Incluye actividades como caminar, correr o nadar para quemar calorías."
            });
        } else {
            recommendations.push({
                title: "Consultar con un profesional",
                description: "Es recomendable consultar con un médico o nutricionista para un plan personalizado."
            });
            recommendations.push({
                title: "Cambios en el estilo de vida",
                description: "Enfócate en cambios sostenibles en la dieta y actividad física."
            });
        }
        
        // Recomendaciones generales
        recommendations.push({
            title: "Hidratación adecuada",
            description: "Bebe al menos 8 vasos de agua al día para mantener tu metabolismo activo."
        });
        
        recommendations.push({
            title: "Sueño de calidad",
            description: "Duerme entre 7-9 horas por noche para mantener un metabolismo saludable."
        });
        
        // Mostrar recomendaciones
        this.recommendations.innerHTML = `
            <h3>Recomendaciones Personalizadas</h3>
            ${recommendations.map(rec => `
                <div class="recommendation-item">
                    <strong>${rec.title}</strong><br>
                    ${rec.description}
                </div>
            `).join("")}
        `;
    }

    calculateAdditionalInfo(weight, height, age, gender, activity) {
        // Peso ideal (método de Devine)
        const heightInMeters = height / 100;
        let idealWeightKg;
        
        if (gender === "male") {
            idealWeightKg = 50 + 2.3 * ((height - 152.4) / 2.54);
        } else {
            idealWeightKg = 45.5 + 2.3 * ((height - 152.4) / 2.54);
        }
        
        const idealWeightRange = {
            min: idealWeightKg * 0.9,
            max: idealWeightKg * 1.1
        };
        
        this.idealWeight.textContent = `${idealWeightKg.toFixed(1)} kg`;
        this.idealWeightRange.textContent = `Rango: ${idealWeightRange.min.toFixed(1)} - ${idealWeightRange.max.toFixed(1)} kg`;
        
        // Calorías diarias (fórmula de Mifflin-St Jeor)
        let bmr;
        if (gender === "male") {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        
        const activityMultipliers = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725,
            "very-active": 1.9
        };
        
        const tdee = bmr * activityMultipliers[activity];
        const calorieRange = {
            min: tdee - 200,
            max: tdee + 200
        };
        
        this.dailyCalories.textContent = `${Math.round(tdee)} kcal`;
        this.calorieRange.textContent = `Rango: ${Math.round(calorieRange.min)} - ${Math.round(calorieRange.max)} kcal`;
        
        // Agua diaria (35ml por kg de peso)
        const waterLiters = (weight * 35) / 1000;
        this.dailyWater.textContent = `${waterLiters.toFixed(1)} L`;
    }

    clearForm() {
        this.heightInput.value = "";
        this.weightInput.value = "";
        this.ageInput.value = "";
        this.genderSelect.value = "";
        this.activitySelect.value = "";
        this.resultsSection.style.display = "none";
    }

    // Métodos de utilidad
    getBMIDescription(bmi) {
        if (bmi < 18.5) {
            return "Tu peso está por debajo del rango normal. Considera consultar con un profesional de la salud.";
        } else if (bmi >= 18.5 && bmi < 25) {
            return "¡Excelente! Tu peso está en el rango normal y saludable.";
        } else if (bmi >= 25 && bmi < 30) {
            return "Tu peso está por encima del rango normal. Considera hacer cambios en tu estilo de vida.";
        } else {
            return "Tu peso está significativamente por encima del rango normal. Es recomendable consultar con un profesional.";
        }
    }

    getHealthRisks(bmi) {
        const risks = [];
        
        if (bmi < 18.5) {
            risks.push("Desnutrición");
            risks.push("Sistema inmunológico debilitado");
            risks.push("Osteoporosis");
        } else if (bmi >= 25 && bmi < 30) {
            risks.push("Diabetes tipo 2");
            risks.push("Enfermedades cardíacas");
            risks.push("Presión arterial alta");
        } else if (bmi >= 30) {
            risks.push("Diabetes tipo 2");
            risks.push("Enfermedades cardíacas");
            risks.push("Accidente cerebrovascular");
            risks.push("Ciertos tipos de cáncer");
            risks.push("Apnea del sueño");
        }
        
        return risks;
    }

    getWeightChangeRecommendation(currentBMI, targetBMI) {
        const difference = targetBMI - currentBMI;
        const heightInMeters = parseFloat(this.heightInput.value) / 100;
        const weightChange = difference * (heightInMeters * heightInMeters);
        
        if (Math.abs(weightChange) < 1) {
            return "Tu peso está muy cerca del ideal. Mantén tu estilo de vida actual.";
        } else if (weightChange > 0) {
            return `Para alcanzar un IMC saludable, considera ganar aproximadamente ${Math.abs(weightChange).toFixed(1)} kg de forma gradual.`;
        } else {
            return `Para alcanzar un IMC saludable, considera perder aproximadamente ${Math.abs(weightChange).toFixed(1)} kg de forma gradual.`;
        }
    }
}

// Inicializar calculadora de IMC
document.addEventListener("DOMContentLoaded", () => {
    new BMICalculator();
});

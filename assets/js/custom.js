document.addEventListener("DOMContentLoaded", function () {

  const dateInput = document.getElementById('date');
  dateInput.onchange = function() {
    if (dateInput.value === '') {
        dateInput.classList.add("empty");
    } else {
        dateInput.classList.remove("empty");
    }
}

  const form = document.getElementById("multi-step-form");
  const steps = Array.from(form.querySelectorAll(".step"));
  const prevButtons = Array.from(form.querySelectorAll(".prev-step"));
  const nextButtons = Array.from(form.querySelectorAll(".next-step"));

  let currentStep = 0;

  // Function to show a specific step
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.style.display = "block";
      } else {
        step.style.display = "none";
      }
    });
  }

  // Event listeners for next and previous buttons
  nextButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      currentStep--;
      showStep(currentStep);
    });
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateForm()) {
      // Process the form data or submit it to a server
      alert("Form submitted successfully!");
    }
  });

  // Function to validate a step
  function validateStep(stepIndex) {
    const currentStepFields = Array.from(
      steps[stepIndex].querySelectorAll("input[required]")
    );
    for (const field of currentStepFields) {
      if (!field.value.trim()) {
        const errorSpan = document.getElementById(`${field.id}-error`);
        errorSpan.textContent = "This field is required.";
        return false;
      } else {
        const errorSpan = document.getElementById(`${field.id}-error`);
        errorSpan.textContent = ""; // Clear any previous error messages
      }
    }
    return true;
  }

  // Function to validate the entire form
  function validateForm() {
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        showStep(i);
        return false;
      }
    }
    return true;
  }

  // Show the initial step
  showStep(currentStep);
});

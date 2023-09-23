document.addEventListener("DOMContentLoaded", function () {

  // date field color change
  const dateInput = document.getElementById('date');
  const dateInput2 = document.getElementById('date2');
  dateInput.onchange = function() {
    if (dateInput.value === '') {
        dateInput.classList.add("empty");
    } else {
        dateInput.classList.remove("empty");
    }
  }
  dateInput2.onchange = function() {
      if (dateInput2.value === '') {
          dateInput2.classList.add("empty-gray");
      } else {
          dateInput2.classList.remove("empty-gray");
      }
  }

  // Get references to the input and image elements
  const fileInput = document.getElementById("fileInput");
  const uploadedImage = document.getElementById("uploadedImage");

  // Add an event listener to the file input
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];

    if (file) {
        // Create a FileReader to read the selected file
        const reader = new FileReader();

        // Set up an event listener for when the FileReader has loaded the file
        reader.onload = function (e) {
            // Set the source of the image element to the data URL
            uploadedImage.src = e.target.result;
        };

        // Read the file as a data URL (this will trigger the onload event)
        reader.readAsDataURL(file);
    }
  });



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
      window.scrollTo({top: 0})
      if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({top: 0})
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

function sendEmail(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById("contactForm"));
  const submitButton = event.target.querySelector('button[type="submit"]');

  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = "Sending...";

  fetch("send-email.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Thank you! Your message has been sent.");
        document.getElementById("contactForm").reset();
      } else {
        alert(
          "Sorry, there was an error sending your message. Please try again."
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
    })
    .finally(() => {
      // Re-enable button and restore text
      submitButton.disabled = false;
      submitButton.innerHTML = "Send Message";
    });

  return false;
}

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.2) {
        if (entry.target.classList.contains("text-reveal")) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.add("active");
        }
        observer.unobserve(entry.target); // Ensures animation only runs once
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "-50px",
  }
);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Observe all elements with animate class and text-reveal class
  document.querySelectorAll(".animate, .text-reveal").forEach((elem) => {
    observer.observe(elem);
  });
});

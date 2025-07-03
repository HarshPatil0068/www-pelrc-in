const form = document.querySelector("application-form");
const flash = document.getElementById("flashMessage");

  // ✅ Ensure flash message is hidden on page load
  window.addEventListener("DOMContentLoaded", () => {
    flash.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/auth/api/send/mech-eng-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        flash.classList.remove("hidden");
        form.reset();
        setTimeout(() => flash.classList.add("hidden"), 4000);
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  });
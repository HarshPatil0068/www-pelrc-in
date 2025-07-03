window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const status = params.get("status");

  if (status === "success") {
    alert("Application sent! We'll get back to you soon.");
  } else if (status === "error") {
    alert("Something went wrong.");
  }

  if (status) {
    // Remove query string without reloading
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
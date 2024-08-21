// Initial page setup
let currentPage = 1;
const totalPages = 21;

// Display current date
document.getElementById("date").innerText = new Date().toLocaleDateString(
  "hi-IN",
  {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
);

document.getElementById("city").innerText = "नई दिल्ली";

// Function to update the page number
function updatePageNumber() {
  document.getElementById(
    "pageNumber"
  ).innerText = `${currentPage} / ${totalPages}`;
}

// Page content update functionality
function updatePage() {
  document.getElementById("news-content").innerHTML = `<div class="page">
    <h2>Page ${currentPage} Title</h2>
    <p>Content for page ${currentPage}...</p>
  </div>`;
}

// Page navigation functionality
document.getElementById("next").addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updatePage();
    updatePageNumber();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePage();
    updatePageNumber();
  }
});

// Dark mode toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  // Check for saved user preference
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const darkModeEnabled =
    localStorage.getItem("dark-mode") === "true" || prefersDarkMode;

  if (darkModeEnabled) {
    document.body.classList.add("dark-mode");
  }

  const toggleButton = document.getElementById("toggle-mode");
  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDarkMode);
  });
});
// Function to load dynamic news content
function loadNews() {
  const newsSections = ["news1", "news2"]; // Add all your news sections here
  newsSections.forEach((section) => {
    // Fetching data from an API (use your own API key or service)
    $.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=YOUR_API_KEY`,
      function (data) {
        const articles = data.articles.slice(0, 5); // Taking top 5 articles for simplicity
        let content = "";
        articles.forEach((article) => {
          content += `<h3 class="text-2xl font-bold">${article.title}</h3>`;
          content += `<p>${article.description}</p>`;
          if (article.urlToImage) {
            content += `<img src="${article.urlToImage}" alt="${article.title}" class="w-full h-auto my-4">`;
          }
          content += `<a href="${article.url}" target="_blank" class="text-blue-600 underline">Read more</a>`;
        });
        document.getElementById(section).innerHTML = content;
      }
    );
  });
}

// Load news on page load
loadNews();

// Function to load dynamic advertisements
function loadAdvertisement() {
  // Example advertisement content (can be fetched dynamically)
  document.getElementById("advertisement").innerHTML = `
    <h4 class="text-lg font-bold">Ad Title</h4>
    <p>Ad content goes here...</p>
  `;
}

// Load advertisements on page load
loadAdvertisement();

// Function to load weather
function loadWeather() {
  const apiKey = "YOUR_WEATHER_API_KEY";
  const city = document.getElementById("city").innerText;

  $.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    function (data) {
      document.getElementById("weather").innerHTML = `
        <p>${data.name}: ${data.main.temp}°C, ${data.weather[0].description}</p>
      `;
    }
  );
}

// Load weather on page load
loadWeather();

// Function to change the layout
const changeLayout = (layout) => {
  const contentContainer = document.getElementById("contentContainer");
  contentContainer.className = ""; // Reset existing classes
  contentContainer.classList.add(`layout-${layout}`);
};

// Event listeners for layout buttons
document
  .getElementById("newspaperLayout")
  .addEventListener("click", () => changeLayout("newspaper"));
document
  .getElementById("gridLayout")
  .addEventListener("click", () => changeLayout("grid"));
document
  .getElementById("listLayout")
  .addEventListener("click", () => changeLayout("list"));

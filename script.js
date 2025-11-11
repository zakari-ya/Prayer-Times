document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("city");
  const languageSelect = document.getElementById("language");
  const countdownElement = document.getElementById("countdown");
  const nextPrayerNameElement = document.getElementById("next-prayer-name");
  const currentDateElement = document.getElementById("current-date");
  let countdownInterval;
  let currentPrayerTimes = {};

  // Language translations
  const translations = {
    en: {
      appTitle: "Moroccan Prayer Times",
      cityLabel: "Select City:",
      countdownLabel: "Next Prayer in",
      fajr: "Fajr",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
    },
    fr: {
      appTitle: "Horaires de Prière Maroc",
      cityLabel: "Sélectionnez la Ville:",
      countdownLabel: "Prochaine Prière dans",
      fajr: "Fajr",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
    },
    ar: {
      appTitle: "أوقات الصلاة المغربية",
      cityLabel: "اختر المدينة:",
      countdownLabel: "الصلاة القادمة في",
      fajr: "الفجر",
      dhuhr: "الظهر",
      asr: "العصر",
      maghrib: "المغرب",
      isha: "العشاء",
    },
  };

  // Date formatting options for each language
  const dateOptions = {
    en: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    fr: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
    ar: {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  };

  // Locales for each language
  const locales = {
    en: "en-US",
    fr: "fr-FR",
    ar: "ar-MA",
  };

  // Update UI language
  function updateLanguage(lang) {
    document.documentElement.lang = lang;

    // Set layout direction based on language
    if (lang === "ar") {
      document.body.setAttribute("dir", "rtl");
      document.body.classList.add("lang-arabic");
      document.body.classList.remove("lang-french", "lang-english");
    } else {
      document.body.setAttribute("dir", "ltr");
      if (lang === "fr") {
        document.body.classList.add("lang-french");
        document.body.classList.remove("lang-arabic", "lang-english");
      } else {
        document.body.classList.add("lang-english");
        document.body.classList.remove("lang-arabic", "lang-french");
      }
    }

    const t = translations[lang];
    document.getElementById("app-title").textContent = t.appTitle;
    document.getElementById("city-label").textContent = t.cityLabel;
    document.getElementById("countdown-label").textContent = t.countdownLabel;
    document.getElementById("fajr-label").textContent = t.fajr;
    document.getElementById("dhuhr-label").textContent = t.dhuhr;
    document.getElementById("asr-label").textContent = t.asr;
    document.getElementById("maghrib-label").textContent = t.maghrib;
    document.getElementById("isha-label").textContent = t.isha;

    // Update current date display
    updateCurrentDate(lang);

    // Update next prayer name if it exists
    if (nextPrayerNameElement.textContent !== "Loading...") {
      const prayerName = nextPrayerNameElement.textContent.toLowerCase();
      nextPrayerNameElement.textContent =
        t[prayerName] || nextPrayerNameElement.textContent;
    }
  }

  // Update current date display with language support
  function updateCurrentDate(lang) {
    const now = new Date();
    const locale = locales[lang];
    const options = dateOptions[lang];

    try {
      currentDateElement.textContent = now.toLocaleDateString(locale, options);
    } catch (error) {
      console.error("Error formatting date:", error);
      // Fallback to English if there's an issue
      currentDateElement.textContent = now.toLocaleDateString(
        "en-US",
        dateOptions.en
      );
    }
  }

  // Fetch prayer times from API
  async function fetchPrayerTimes(city) {
    try {
      // Show loading state
      document.querySelectorAll(".prayer-hour").forEach((el) => {
        el.textContent = "--:--";
        el.classList.add("loading");
      });

      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Morocco&method=4`
      );
      const data = await response.json();

      // Remove loading state
      document.querySelectorAll(".prayer-hour").forEach((el) => {
        el.classList.remove("loading");
      });

      return data.data.timings;
    } catch (error) {
      console.error("Error fetching prayer times:", error);

      // Remove loading state on error too
      document.querySelectorAll(".prayer-hour").forEach((el) => {
        el.classList.remove("loading");
      });

      return null;
    }
  }

  // Update prayer times display
  function updatePrayerTimes(prayerTimes) {
    if (!prayerTimes) return;

    document.getElementById("fajr-time").textContent = formatTime(
      prayerTimes.Fajr
    );
    document.getElementById("dhuhr-time").textContent = formatTime(
      prayerTimes.Dhuhr
    );
    document.getElementById("asr-time").textContent = formatTime(
      prayerTimes.Asr
    );
    document.getElementById("maghrib-time").textContent = formatTime(
      prayerTimes.Maghrib
    );
    document.getElementById("isha-time").textContent = formatTime(
      prayerTimes.Isha
    );

    currentPrayerTimes = prayerTimes;
  }

  // Format time to 12-hour format if needed
  function formatTime(timeString) {
    // You can modify this function to change time format
    return timeString;
  }

  // Calculate the next prayer time
  function calculateNextPrayer(prayerTimes) {
    if (!prayerTimes) return null;

    const now = new Date();
    const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    for (let i = 0; i < prayerOrder.length; i++) {
      const prayerName = prayerOrder[i];
      const [hour, minute] = prayerTimes[prayerName].split(":").map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hour, minute, 0, 0);

      if (now < prayerTime) {
        return { time: prayerTime, name: prayerName };
      }
    }

    // If all prayer times for today have passed, set next prayer to Fajr of next day
    const [fajrHour, fajrMinute] = prayerTimes.Fajr.split(":").map(Number);
    const nextDayFajr = new Date();
    nextDayFajr.setDate(now.getDate() + 1);
    nextDayFajr.setHours(fajrHour, fajrMinute, 0, 0);

    return { time: nextDayFajr, name: "Fajr" };
  }

  // Highlight the current/next prayer
  function highlightCurrentPrayer(prayerName) {
    // Remove active class from all prayer times
    document.querySelectorAll(".prayer-time").forEach((el) => {
      el.classList.remove("active");
    });

    // Add active class to current prayer
    if (prayerName) {
      const prayerElement = document.getElementById(prayerName.toLowerCase());
      if (prayerElement) {
        prayerElement.classList.add("active");
      }
    }
  }

  // Start the countdown timer
  function startCountdown(prayerTimes) {
    if (countdownInterval) clearInterval(countdownInterval);

    const nextPrayer = calculateNextPrayer(prayerTimes);
    if (!nextPrayer) return;

    const lang = languageSelect.value;
    const t = translations[lang];
    nextPrayerNameElement.textContent =
      t[nextPrayer.name.toLowerCase()] || nextPrayer.name;
    highlightCurrentPrayer(nextPrayer.name);

    function updateCountdown() {
      const now = new Date();
      const timeDiff = nextPrayer.time - now;

      if (timeDiff <= 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "00:00:00";
        updatePrayerData(); // Update prayer data for the next prayer
      } else {
        const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(
          2,
          "0"
        );
        const minutes = String(
          Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");
        const seconds = String(
          Math.floor((timeDiff % (1000 * 60)) / 1000)
        ).padStart(2, "0");
        countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
      }
    }

    updateCountdown(); // Initial call to set the countdown immediately
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  // Update all prayer data
  async function updatePrayerData() {
    const city = citySelect.value;
    const prayerTimes = await fetchPrayerTimes(city);
    updatePrayerTimes(prayerTimes);
    startCountdown(prayerTimes);
  }

  // Event listeners
  citySelect.addEventListener("change", updatePrayerData);
  languageSelect.addEventListener("change", function () {
    const lang = this.value;
    updateLanguage(lang);
    // Update next prayer name when language changes
    if (currentPrayerTimes) {
      startCountdown(currentPrayerTimes);
    }
  });

  // Initial load
  updateLanguage("en"); // Set default language to English
  updatePrayerData();

  // Update every minute to handle prayer time changes
  setInterval(updatePrayerData, 60000);
});

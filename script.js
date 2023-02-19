const API_KEY = "at_chBfmFcyYaRZWXqUSIHzMM0xZd9dd";
let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
const data = {
  ip: "8.8.8.8",
  location: {
    country: "US",
    region: "California",
    city: "Mountain View",
    lat: 37.38605,
    lng: -122.08385,
    postalCode: "94035",
    timezone: "-08:00",
    geonameId: 5375480,
  },
  domains: ["dahakjs956.top", "ailtone.duckdns.org", "almasdar24.ma", "ns2.igrushkimakushki.ru", "1master-fitness.com"],
  as: {
    asn: 15169,
    name: "GOOGLE",
    route: "8.8.8.0/24",
    domain: "https://about.google/intl/en/",
    type: "Content",
  },
  isp: "Google LLC",
  proxy: {
    proxy: false,
    vpn: false,
    tor: false,
  },
};

const ipAddressNode = document.querySelector("#ip-address");
const cityNode = document.querySelector("#city");
const countryNode = document.querySelector("#country");
const postalCodeNode = document.querySelector("#postal-code");
const timezoneNode = document.querySelector("#timezone");
const ispNode = document.querySelector("#ISP");

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

let localisation = [0, 0];

let map = null;

const fetchLocalisationByIp = async (url) => {
  const response = await fetch(url);
  const localisationByIp = await response.json();
  return localisationByIp;
};

const renderData = async (url) => {
  // const data = await fetchLocalisationByIp(url);

  if (data) {
    localisation = [data.location.lat, data.location.lng];

    ipAddressNode.innerHTML = data.ip;
    timezoneNode.innerHTML = `UTC ${data.location.timezone}`;
    ispNode.innerHTML = data.isp;
    cityNode.innerHTML = data.location.city;
    countryNode.innerHTML = data.location.country;
    postalCodeNode.innerHTML = data.location.postalCode;

    if (!map) {
      map = L.map("map").setView(localisation, 13);
      L.marker(localisation).addTo(map);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    } else {
      map.setView(localisation);
      L.marker(localisation).addTo(map);
    }
  }
};

const handleSubmit = () => {
  const inputValue = searchInput.value;
  url += `&domain=${inputValue}`;
  renderData(url);
};

searchBtn.addEventListener("click", handleSubmit);
renderData(url);

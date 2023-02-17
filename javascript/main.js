window.onload = getLocation();
var x = document.querySelector("main");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  fetch(
    `https://www.meteosource.com/api/v1/free/point?lat=${position.coords.latitude}&lon=${position.coords.longitude}&sections=current%2Chourly&language=en&units=auto&key=af2cshpqscwh5qvql26n6pjj8tc4kyjosh1sh13z`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      document.querySelector(".degree").innerHTML = res.current.temperature;
      document.querySelector(
        ".image img"
      ).src = `https://www.meteosource.com/static/img/ico/weather/${res.current.icon_num}.svg`;
      document.querySelector(".summery").innerHTML = res.current.summary;
      document.querySelector(".location").innerHTML = res.timezone;
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

fetch("https://ipapi.co/json/")
  .then((res) => res.json())
  .then((res) => {
    document.querySelector(".location").innerHTML = res.city;
    fetch(
      `https://www.meteosource.com/api/v1/free/point?place_id=${res.city}&sections=current%2Chourly&language=en&units=auto&key=af2cshpqscwh5qvql26n6pjj8tc4kyjosh1sh13z`
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        document.querySelector(".degree").innerHTML = res.current.temperature;
        document.querySelector(
          ".image img"
        ).src = `https://www.meteosource.com/static/img/ico/weather/${res.current.icon_num}.svg`;
        document.querySelector(".summery").innerHTML = res.current.summary;
      });
  });

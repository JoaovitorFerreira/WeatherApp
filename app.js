window.addEventListener('load',()=>{

    let long;

    let lat;

    const temperatureDescription = document.querySelector(".temperature-description");

    const temperatureDegree = document.querySelector(".temperature-degree");

    const locationTimeZone = document.querySelector(".location-timezone");

    const temperatureSection = document.querySelector(".temperature");

    const temperatureSpan = document.querySelector(".temperature span")

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{

            long=position.coords.longitude;

            lat=position.coords.latitude;

            const proxy='https://cors-anywhere.herokuapp.com/';

            const api=`${proxy}https://api.darksky.net/forecast/3507a6b2eac1f8fa79b4685c3d22e70c/${lat},${long}`;

            fetch(api)
        .then(response=>{
            return response.json();
            })
            .then(data=>{
                console.log(data);
                const {temperature, summary, icon} = data.currently;

                //Definindo elementos do DOM através da API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimeZone.textContent = data.timezone;
                // formula de farenheit para grau
                let celsius = (temperature - 32) * (5/9);

                //Definindo os icones/ animacoes
                setIcons(icon, document.querySelector(".icon"));

                //Altera temperatura para Celsius/volta para Farenheit
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent ==="F"){
                        temperatureSpan.textContent= "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent= "F";
                        temperatureDegree.textContent = temperature;
                    }
                });
            });
        });
    }
    else{
        h1.textContent = "nao funciona pq tu n permitiu saber a tua localizacao"
    }
    function setIcons(icon, iconId){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();

        return skycons.set(iconId,Skycons[currentIcon]);
    }

});
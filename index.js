function toggleDiv(event, divId) {
    event.preventDefault();
    const div = document.getElementById(divId);
    if (div.style.display === 'none' || div.style.display === '') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
}

//image map scales with image
window.addEventListener('resize', scaleImageMap);
window.addEventListener('load', scaleImageMap);

function scaleImageMap() {
    const img = document.querySelector('#datamap');
    const map = document.querySelector('map[name="datamap"]');
    const areas = map.getElementsByTagName('area');
    const originalWidth = 1080;

    const scale = img.clientWidth / originalWidth;

    for (let area of areas) {
        const coords = area.getAttribute('coords').split(',').map(Number);
        const scaledCoords = coords.map(coord => coord * scale);
        area.setAttribute('coords', scaledCoords.join(','));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const image = document.getElementById("datamap");
    const mapContainer = document.querySelector(".image-scale");
  
    //show pop-up and scale it dynamically
    function showPin(event, pinId) {
      event.preventDefault();
        //hide any already open pins
        const pins = document.querySelectorAll(".pin");
        pins.forEach(pin => {
            pin.style.display = "none";
        })
        //display selected
            const pin = document.getElementById(pinId);
            const rect = image.getBoundingClientRect(); //get current dimensions of the image
  
      //position and scale the popup relative to the image
      pin.style.display = "block";
      pin.style.left = `${event.pageX - mapContainer.offsetLeft}px`;
      pin.style.top = `${event.pageY - mapContainer.offsetTop}px`;
  
      //scale the pop-up dynamically based on the image size
      const scaleFactor = rect.width / image.naturalWidth; //calculate scaling based on the image size
      pin.style.transform = `scale(${scaleFactor})`;
    }
  
    //attach the showPopup function to areas (you can also add onclick attributes in HTML)
    const areas = document.querySelectorAll("map[name='datamap'] area");
    areas.forEach(area => {
      area.addEventListener("click", event => {
        const pinId = area.getAttribute("onclick").match(/'(.*?)'/)[1];
        showPin(event, pinId);
      });
    });
  
    //close pop-ups when clicking outside
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".pin") && !event.target.closest("area")) {
        const popups = document.querySelectorAll(".pin");
        popups.forEach(pin => {
          pin.style.display = "none";
        });
      }
    });
  });

  
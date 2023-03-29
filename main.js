const API = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_t4IEUVeayUcsTaOxbSn1t6BVAGJ25CkbyMJIkicEvl90cwcy9OfFLhGypTvu0pDX";
const API_URL_RANDOM = `${API}/images/search?limit=10&order=rand&api_key=${API_KEY}`;
const API_URL_FAVORITES = `${API}/favourites?api_key=${API_KEY}`;
const API_URL_FAVORITES_DELETE = (id) =>
  `${API}/favourites/${id}?api_key=${API_KEY}`;

const spanError = document.getElementById("error");

async function loadRandomCats() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Load Random Cats", data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const imgs = document
      .getElementById("random-cats")
      .querySelectorAll(".images");

    const btnRandom1 = document.getElementById("btn-random-1");
    const btnRandom2 = document.getElementById("btn-random-2");
    const btnRandom3 = document.getElementById("btn-random-3");

    btnRandom1.onclick = () => saveFavoriteCat(data[0].id);
    btnRandom2.onclick = () => saveFavoriteCat(data[1].id);
    btnRandom3.onclick = () => saveFavoriteCat(data[2].id);

    for (let index = 0; index < imgs.length; index++) {
      const element = imgs[index];
      element.src = data[index].url;
    }
  }
}

async function loadFavoriteCats() {
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.log("Load Favorite Cats", data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const favoriteCats = document.getElementById("favorite-cats");
    const gridContainer = favoriteCats.querySelector(".grid-container");
    // Limpia la carga de las imagenes
    gridContainer.innerHTML = "";

    data.forEach((cat) => {
      const div = document.createElement("div");

      const img = document.createElement("img");
      img.src = cat.image.url;
      img.alt = "cats";
      img.className = "images";

      const btn = document.createElement("btn");
      const btnText = document.createTextNode("Eliminar de favoritos");
      btn.onclick = () => deleteFavoriteCat(cat.id);
      btn.className = "btn-cats";

      gridContainer.appendChild(div);
      div.appendChild(img);
      div.appendChild(btn);
      btn.appendChild(btnText);
    });
  }
}

async function saveFavoriteCat(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("Save Favorite Cats", res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Gatito guardado en favoritos");
    loadFavoriteCats();
  }
}

async function deleteFavoriteCat(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
  });
  const data = await res.json();

  console.log("Delete Favorite Cat", res);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Gatito eliminado de favoritos");
    loadFavoriteCats();
  }
}

loadRandomCats();
loadFavoriteCats();

// ***************************************************************
// fetch(URL)
//   .then((res) => res.json())
//   .then((data) => {
//     const img = document.querySelector("img");
//     img.src = data[0].url;
//   });

// En este caso es mejor usar for si tienen un index *****
// const img1 = document.getElementById("img1");
// const img2 = document.getElementById("img2");
// img1.src = data[0].url;
// img2.src = data[1].url;

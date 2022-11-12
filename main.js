import "./style.scss";
import javascriptLogo from "./javascript.svg";
import { setupCounter } from "./counter.js";

(async () => {
  // 초기화 코드
  const moviesEl = document.querySelector(".movies");
  const searchBtnEl = document.querySelector(".searching_btn");
  const inputEl = document.querySelector(".input");
  const selectYearEl = document.querySelector(".select_year");
  const selectPageEl = document.querySelector(".page");
  const moveTopBtn = document.querySelector(".move_top");
  const btnMovieMoreEl = document.querySelector(".btn_movie_more");
  const loadingBarEl = document.querySelector(".loader");

  let page = 1;
  let title;
  let year;

  // 최초 호출
  // const movies = await getMovies();
  // page += 1;
  // renderMovies(movies);

  //search버튼을 눌리면 findMovies 가 작동하게,
  searchBtnEl.addEventListener("click", async () => {
    // page = 1;
    page = selectPageEl.options[selectPageEl.selectedIndex].value;
    findMovies();
  });

  //enter 키를 눌러도 findMovies 가 작동하게,
  inputEl.onkeypress = function (e) {
    if (e.keyCode == 13) {
      page = 1;
      findMovies();
    }
  };

  // 왜 안될까
  // inputEl.addEventListener("keyup", searchEnter);
  // function searchEnter(event) {
  //   if (event.keycode === 13) {
  //     page = 1;
  //     findMovies();
  //   }
  // }

  //movies 창이 비어있지 않으면 비워주고 시작,
  async function findMovies() {
    if (moviesEl.innerHTML !== "") {
      moviesEl.innerHTML = "";
    }
    title = inputEl.value;
    //페이지 선택 개수 따라 다르게 출력되게
    page = selectPageEl.options[selectPageEl.selectedIndex].value;
    for (let i = 1; i <= page; i++) {
      const movies = await getMovies(title, year, i);
      renderMovies(movies);
    }
  }

  //더보기 버튼 클릭
  btnMovieMoreEl.addEventListener("click", async () => {
    page += 1;
    title = inputEl.value;
    const movies = await getMovies(title, year, page);
    loadingBarEl.classList.remove("hidden");
    if (movies === undefined) {
      btnMovieMoreEl.classList.add("hidden");
      alert("🧨no more movies any more!");
    }
    renderMovies(movies);
  });

  // selectPageEl.addEventListener("click", async () => {
  //   page = selectedIndex;
  // });

  //누르면 맨 위로 이동
  const btnVisible = () => {
    window.scrollY > 100
      ? (moveTopBtn.style.display = "block")
      : (moveTopBtn.style.display = "none");
  };
  document.addEventListener("scroll", btnVisible);
  const moveTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  moveTopBtn.addEventListener("click", moveTop);

  async function getMovies(title, year, page) {
    const res = await fetch(
      `https://omdbapi.com/?apikey=7035c60c&s=${title}&y=${year}&page=${page}`
    );
    const { Search: movies } = await res.json();
    return movies;
  }

  function renderMovies(movies) {
    if (!movies) {
      alert("please double check the title😃");
      return;
    }
    for (const movie of movies) {
      const el = document.createElement("div");
      el.classList.add("movie");
      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;
      imgEl.setAttribute(
        "onerror",
        "this.src='https://www.wheelco.com/images/product-images/no_image_available.jpeg?resizeid=114&resizeh=1200&resizew=1200'"
      );
      el.append(imgEl, h1El);
      moviesEl.append(el);
      btnMovieMoreEl.classList.remove("hidden");
    }
  }
})();

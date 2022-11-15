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
  const thisYear = document.querySelector(".this-year");

  let page = 1;
  let title;
  let year;

  thisYear.textContent = new Date().getFullYear();

  //input 받아오기
  searchBtnEl.addEventListener("click", async () => {
    findMovies();
  });
  inputEl.onkeypress = function (e) {
    if (e.keyCode == 13) {
      findMovies();
    }
  };

  //movies 창이 비어있지 않으면 먼저 비워준 후 실행
  async function findMovies() {
    if (moviesEl.innerHTML !== "") {
      moviesEl.innerHTML = "";
    }
    title = inputEl.value;
    if (title === "") {
      alert("제목을 입력해주셔야죠!😃");
    }
    page = selectPageEl.options[selectPageEl.selectedIndex].value;
    year = selectYearEl.options[selectYearEl.selectedIndex].value;
    for (let i = 1; i <= page; i++) {
      const movies = await getMovies(title, year, i);
      try {
        renderMovies(movies);
      } catch (error) {}
    }
  }

  //년도 생성
  for (let i = 2022; i > 1980; i--) {
    const selectYearEl = document.querySelector(".select_year");
    const yearOpt = document.createElement("option");
    yearOpt.value = i;
    yearOpt.textContent = i;
    selectYearEl.append(yearOpt);
  }

  //무한스크롤
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        getMorePages();
      }
    });
  });
  io.observe(btnMovieMoreEl);

  //더보기 버튼 클릭
  btnMovieMoreEl.addEventListener("click", async () => {
    getMorePages();
  });

  //페이지 더 가져오는 함수
  async function getMorePages() {
    page += 1;
    title = inputEl.value;
    const movies = await getMovies(title, year, page);
    if (movies === undefined) {
      btnMovieMoreEl.classList.add("hidden");
      alert("영화를 다 찾았어요!");
    }
    try {
      renderMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }

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
    const s = `&s=${title}`;
    const y = `&y=${year}`;
    const p = `&page=${page}`;
    const res = await fetch(`https://omdbapi.com/?apikey=7035c60c${s}${y}${p}`);
    const { Search: movies } = await res.json();
    return movies;
  }

  async function renderMovies(movies) {
    console.log(movies);
    for (const movie of movies) {
      const el = document.createElement("div");
      el.classList.add("movie");

      const infoEl = document.createElement("div");
      infoEl.classList.add("info");

      const h1El = document.createElement("h1");
      h1El.textContent = movie.Title;
      h1El.classList.add("movie-title");

      const h2El = document.createElement("h2");
      h2El.textContent = movie.Year;
      h2El.classList.add("movie-year");

      infoEl.append(h1El, h2El);
      const imgEl = document.createElement("img");
      imgEl.src = movie.Poster;
      imgEl.alt = movie.Title;
      `${movie.Poster}` === "N/A"
        ? (imgEl.src =
            "https://www.wheelco.com/images/product-images/no_image_available.jpeg?resizeid=114&resizeh=1200&resizew=1200")
        : (imgEl.src = `${movie.Poster}`);
      el.append(imgEl, infoEl);
      moviesEl.append(el);
      btnMovieMoreEl.classList.remove("hidden");
    }
  }
})();

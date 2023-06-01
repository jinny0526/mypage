const movieListContainer = document.querySelector("#movie-list-container");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
let data;

//api
const getTopRatedMovies = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjc3YWYxMTVmNTA4MDlmOGMyZTc0ZWRiYmVhMGIxYSIsInN1YiI6IjY0NzViOWFmOTI0Y2U2MDEzM2IwNmRmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4idGHQhk6pIpbc9jzZ9lSBAwYtJNIxXpTbpsphsnOig",
    },
  };
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    );

    return res.json();
  } catch (err) {
    console.log({ err });
  }
};

//??
//

const makeMovieList = (moviesData) => {
  moviesData.forEach((item) => {
    //오류
    const movieItem = document.createElement("div");
    //<div></div>

    movieItem.setAttribute("id", item.id);
    // movieItem.id = item.id
    //<div id></div>

    movieItem.classList.add("card-item");
    // movieItem.className = "card-item
    //<div id="" class="card-list"></div>

    //<div class="movie-list-container">

    // //이미지 넣기 - 엑박은 도대체 뭐가 문젤까
    const moviePoster = document.createElement("img");
    moviePoster.src = "https://image.tmdb.org/t/p/w500/" + item.poster_path;

    //<div img scr="">
    moviePoster.classList.add("card-img");
    moviePoster.setAttribute("alt", item.title);
    movieItem.append(moviePoster);

    //제목 넣기
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = item.title;
    movieItem.append(movieTitle);
    // //설명 넣기
    const movieDesc = document.createElement("p");
    movieDesc.textContent = item.overview;
    movieItem.append(movieDesc);
    // //평점 넣기
    const voteAverage = document.createElement("p");
    voteAverage.textContent = item.vote_average;
    movieItem.append(voteAverage);

    // Add Movie Click Event
    movieItem.addEventListener("click", () => {
      alert(`id : ${item.id}`);
    });

    movieListContainer.append(movieItem);
  });
};
// ////////////////

const showData = async () => {
  //1.데이터를 가져오기
  data = await getTopRatedMovies();

  //2.가져온 data를 이용해서 현재 화면에 그리기
  makeMovieList(data.results);
};

// searchInput.addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     searchBtn.click();
//   }
// });

const searchMovie = async () => {
  // 1. search-input에 있는 키워드부터 가져오기
  const keyword = searchInput.value;

  // 2. 화면에 보여주고 있는 movies를 keyword를 이용해서 필터링하기
  // 2-1. movies 가져오기
  const movies = data.results;

  // 2-2. movies에 filter 함수 쓰기

  const filteredMovies = movies.filter((movie) => {
    if (movie.title.includes(keyword)) {
      return true; // 포함
    } else {
      return false; // 필터링
    }
  });

  // 2-3. 현재 화면에 그려져 있는 movies들 지우기
  movieListContainer.innerHTML = "";

  // 2-4. filteredMovies를 화면에 그리기
  makeMovieList(filteredMovies);
};

const addEventForSearch = () => {
  searchBtn.addEventListener("click", () => {
    searchMovie();
  });
};

const init = () => {
  showData();

  addEventForSearch();

  // searchInput.focus();
};

init();

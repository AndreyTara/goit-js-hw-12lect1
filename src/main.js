// import axios from 'axios';

// const BASE_URL = 'https://api.themoviedb.org';
// const END_POINT = '/3/trending/movie/week';
// const API_KEY = '9b2515cc3c50c20e84c19bb79f2b818d';

// const container = document.querySelector('.js-movie-list');
// const loadMore = document.querySelector('.js-load-more');

// loadMore.addEventListener('click', onLoadMore);
// let page = 1;

// async function serviceMovie(page = 1) {
//   const { data } = await axios(`${BASE_URL}${END_POINT}`, {
//     // headers: {
//     //   Authorization: `Barier ${API_KEY}`,
//     // },
//     params: {
//       page: page,
//       api_key: API_KEY,
//     },
//   });
//   return data;
// }

// function createMarcup(arr) {
//   return arr
//     .map(
//       ({
//         poster_path,
//         release_date,
//         original_title,
//         vote_averange,
//         id,
//       }) => `<li class="movie-card" data-id ='${id}'>
//       <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
//       <div class ="movie-info">
//       <h3>${original_title}</h3>
//             <p>Relise Date: ${release_date}</p>
//             <p>Vote Averange: ${vote_averange}</p>
//           </div>
//         </li>`
//     )
//     .join('');
// }
// // poster_path ==.>>https://image.tmdb.org/t/p/w500 __https://developer.themoviedb.org/docs/image-basics

// serviceMovie(page)
//   .then(data => {
//     console.log(data);
//     container.insertAdjacentHTML('beforeend', createMarcup(data.results));
//     if (data.page <= 500) {
//       //data.total_pages
//       loadMore.classList.remove('js-load-more-hidden');
//     }
//   })
//   .catch(error => {
//     alert(error.message);
//   });

// async function onLoadMore() {
//   page += 1;
//   loadMore.disabled = true;
//   try {
//     const data = await serviceMovie(page);
//     container.insertAdjacentHTML('beforeend', createMarcup(data.results));
//     if (data.page >= 500) {
//       //data.total_pages
//       loadMore.classList.add('js-load-more-hidden');
//     }
//     const listHeight = document.querySelector('.js-movie-list');
//     const curHeight = listHeight.getBoundingClientRect().top;
//     const card = document.querySelector('.movie-card');
//     const cardHeight = card.getBoundingClientRect().height;
//     console.log(curHeight);
//     const height = -curHeight + 4 * cardHeight;
//     console.log(height);
//     window.scrollTo({
//       left: 0,
//       top: height,
//       behavior: 'smooth',
//     });
//   } catch (error) {
//     alert(error.message);
//   } finally {
//     loadMore.disabled = false;
//   }
//   console.log(page);
// }

/**
 *
 */

import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org';
const END_POINT = '/3/trending/movie/week';
const API_KEY = '9b2515cc3c50c20e84c19bb79f2b818d';
const container = document.querySelector('.js-movie-list');
const guard = document.querySelector('.js-guard');
let page = 1;

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

const observer = new IntersectionObserver(handlePagination, options);

// observer.observe(guard);

async function serviceMovie(page) {
  const { data } = await axios(`${BASE_URL}${END_POINT}`, {
    params: {
      page,
      api_key: API_KEY,
    },
  });
  return data;
}

function createMarcup(arr) {
  return arr
    .map(
      ({
        poster_path,
        release_date,
        original_title,
        vote_averange,
        id,
      }) => `<li class="movie-card" data-id ='${id}'>
      <img src="https://image.tmdb.org/t/p/w300${poster_path}" alt="${original_title}">
      <div class ="movie-info">
      <h3>${original_title}</h3>
            <p>Relise Date: ${release_date}</p>
            <p>Vote Averange: ${vote_averange}</p>
          </div>
        </li>`
    )
    .join('');
}

serviceMovie(page)
  .then(result => {
    // console.log(result);
    container.insertAdjacentHTML('beforeend', createMarcup(result.results));
    if (result.page < 500) {
      //data.total_pages
      observer.observe(guard);
    }
  })
  .catch(error => {
    alert(error.message);
  });

function handlePagination(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page += 1;
      try {
        const data = await serviceMovie(page);
        container.insertAdjacentHTML('beforeend', createMarcup(data.results));
        if (data.page >= 500) {
          observer.unobserve(entry.target);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  });
}
// async function handlePagination(entries, observer) {
//   if (entries[0].isIntersecting) {
//     page += 1;
//     try {
//       const data = await serviceMovie(page);
//       container.insertAdjacentHTML('beforeend', createMarcup(data.results));
//       if (data.page >= 500) {
//         observer.unobserve(entries[0].target);
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   }
// }


const featured = document.querySelector('.featured-content-wrapper');
const trendingParent = document.querySelector('.trending-parent');
const featuredList = document.querySelector('.featured-list');

const api_key = '846f8e2ad3573955a674a5a739c8a611';

let listParent = document.createElement('ul');
listParent.classList.add('trending');



const trendingFetchFunc = (url)=>{

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        /* map through received data as list items */
        let movies = data.results;
        movies.map(movie =>{
            let lists = document.createElement('li');
            let img = document.createElement('img');
            lists.classList.add('trending-list');

            img.src = `http://image.tmdb.org/t/p/w185${movie.poster_path}` ;

            img.alt = movie.original_title ? movie.original_title : movie.original_name;

            /* remove dot between rating and making it two decimal numbers */
            const votes = movie.vote_average;
            let rating = votes + '';
             rating = rating.replace('.', '');
            
           /*  set images alt text to the movie's name */
            const altText = movie.original_title;

            /* trendng movies rendering to the Dom */
            lists.innerHTML = `
                <div class="title">
                    <h3>
                        ${
                            /* movie titles are in two object method hence the condition */
                            movie.original_title ? movie.original_title : movie.original_name
                        }
                    </h3>
                    <span>
                        ${
                            /* some ratings are in just one number hence the condition */
                                votes === 0 ? rating = 'NF' : rating.length === 1 ? rating + 0 : rating
                    
                        }
                    </span>
                </div>
            `; 

            lists.append(img);
            listParent.append(lists);
        })
    });

}

trendingFetchFunc(`https://api.themoviedb.org/3/trending/all/week?api_key=${api_key}`);

trendingParent.append(listParent);

const featuredFetchFunc = (url) =>{
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        const movies = data.results;
        movies.map((movie)=>{
            console.log(movie);

            const lists = document.createElement('li');

            const backdrop = `http://image.tmdb.org/t/p/original${movie.backdrop_path}`;

            lists.style.backgroundImage = `url( ${ backdrop } )` ;


            featuredList.append(lists);

        })
    })
}

featuredFetchFunc(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}`);







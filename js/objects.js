var movies=[
    {
        title:"Star Wars",
        rating:5,
        hasWatched:true
    },
    {
        title:"Back to the Future",
        rating:5,
        hasWatched:true 
    },
    {
        title:"Final Fantasy",
        rating:4,
        hasWatched:false
    }
]
movies.forEach(function(movie){
    if (movie.hasWatched) {
        console.log("You have watched " + movie.title+" - "+movie.rating+" stars")
    }
    else{
        console.log("You have not watched " + movie.title+" - "+movie.rating+" stars")
    }
})

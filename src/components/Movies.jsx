function ListOfMovies({ movies }) {
	return (
		<ul className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 mt-4 text-white p-4 bg-gray-800'>
			{movies.map((movie) => (
				<li
					key={movie.id}
					className='flex flex-col items-center p-4 transition-transform bg-gray-700 rounded cursor-pointer hover:bg-gray-600 hover:scale-105'
				>
					{movie.title} ({movie.year})
					<img src={movie.poster} alt={movie.title} className='' />
				</li>
			))}
		</ul>
	);
}

function NoMoviesFound() {
	return (
		<p className='mt-4 text-center text-red-500 '>
			No se encontraron resultados.
		</p>
	);
}

export function Movies({ movies }) {
	const hasMovies = movies?.length > 0;
	return (
		<>
			{hasMovies ? (
				<ListOfMovies movies={movies} hasMovies={hasMovies} />
			) : (
				<NoMoviesFound />
			)}
		</>
	);
}

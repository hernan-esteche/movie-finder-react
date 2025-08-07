import { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import './App.css';
import { Movies } from './components/Movies.jsx';
import { useMovies } from './hooks/useMovies.js';

function useSearch() {
	const [search, setSearch] = useState('');
	const [error, setError] = useState(null);
	const isFirstInput = useRef(true);

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = search === '';
		} else if (search === '') {
			setError('Por favor, ingresa un término de búsqueda.');
		} else if (search.length < 3) {
			setError('La búsqueda debe tener al menos 3 caracteres.');
		} else {
			setError(null);
		}
	}, [search]);

	return [search, setSearch, error];
}

function App() {
	const [search, setSearch, error] = useSearch();
	const [sort, setSort] = useState(false);
	const { movies, getMovies, loading } = useMovies({ search, sort });
	const [debouncedSearch] = useDebounce(search, 300);

	useEffect(() => {
		if (debouncedSearch) {
			getMovies({ search: debouncedSearch });
		}
	}, [debouncedSearch, getMovies]);

	async function handleSubmit(event) {
		event.preventDefault();
		getMovies({ search });
	}

	const handleChange = (event) => {
		setSearch(event.target.value);
	};

	const handleSort = () => {
		setSort(!sort);
	};

	return (
		<div className='h-screen bg-gray-800'>
			<header className='flex flex-col items-center justify-center w-full p-4 text-white bg-gray-900 '>
				<h1 className='mb-2 text-3xl font-bold'>Movie Finder</h1>
				<h3 className='text-red-500'>{error}</h3>
				<form
					action=''
					className='flex items-center mt-4'
					onSubmit={handleSubmit}
				>
					<input
						value={search}
						onChange={handleChange}
						type='text'
						placeholder='Buscar películas...'
						id='search'
						className='px-4 py-2 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500'
					/>
					<input
						type='checkbox'
						onChange={handleSort}
						checked={sort}
						id='sort'
						className='ml-2'
					/>
					<button
						type='submit'
						className='px-4 py-2 ml-2 text-white transition-colors bg-blue-500 rounded cursor-pointer hover:bg-blue-600'
					>
						Buscar
					</button>
				</form>
			</header>

			<main>
				<section>
					<h2 className='mt-4 text-2xl font-bold text-center text-white'>
						Resultados de búsqueda
					</h2>
					{loading ? (
						<p className='text-center text-white'>Cargando...</p>
					) : (
						<Movies movies={movies} />
					)}
				</section>
			</main>
		</div>
	);
}
export default App;

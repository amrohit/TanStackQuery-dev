import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNotes } from '../utility/http';
import ErrorBlock from './ErrorBlock';
import LoadingBlock from './LoadingBlock';
import Note from './Note';
import useDebounce from './useDebounce';

const FindNote = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  // const [isLoading, setIsLoading] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);
  // const [error, setError] = useState(null);

  // what if you have used useRef for searchTerm? even though the value will change but useRef will not re-trigger the component to re-render. so you will not get the updated value in the queryKey. so you have to use useState here.

  const { data = [], isLoading, isError, error } = useQuery({
    // queryKey: ['notes'], if you use the same queryKey as used in Notes.js, ReactQuery is use the same result from the first query in the second query in FindNote.js. as result are cached they are not refetched and will be used here.
    queryKey: ['notes', { search: debouncedSearch }], // alternatively you can directly put the search term value 'your search term value but here we will use an object with key and dynamic value to make it clear which kind of other values we have in the key
    // queryFn: () => searchNotes(debouncedSearch),
    queryFn: ({ signal }) => fetchNotes({ signal, searchTerm: debouncedSearch }),
    enabled: !!debouncedSearch, // enable the query only when there is a search term,
  })

  // const { data = [], isLoading, isError, error } = useQuery(['notes', { search: searchTerm }], () => searchNotes(searchTerm), {
  //   enabled: !!searchTerm // enable the query only when there is a search term
  // });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   // debounce the API call
  //   const timeoutId = setTimeout(async () => {
  //     setSearchResults([]);
  //     if (!searchTerm) return;
  //     setError('');
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`http://localhost:8001/search?query=${searchTerm}`);
  //       const data = await response.json();
  //       setSearchResults(data);
  //     } catch (error) {
  //       setError('Something went wrong!');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }, 500); // wait for 500ms before making the API call

  //   // clear the timeout on every key press
  //   return () => clearTimeout(timeoutId);
  // }, [searchTerm]);

  let content = 'Please enter any search term!';

  if (isLoading) {
    content = <LoadingBlock />;
  }

  if (isError) {
    content = <ErrorBlock message={error.message} />;
  }

  if (data?.length) {
    content = data.map((note) => <Note key={note.id} note={note} />);
  }

  return (
    <div className='find-note-container'>
      <input type='text' placeholder='Search notes' value={searchTerm} onChange={handleSearch} />
      <div className='search-results-container'>
        {/* {isLoading ? (
          <LoadingBlock />
        ) : (
          <>
            {data.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </>
        )}
        {isError && <ErrorBlock message={error.message} />}  */}
        {content}
      </div>
    </div>
  );
};

export default FindNote;


/**
 * if you construct a query key dynamically, React Query can cache and re-use different data for different keys based on the same query
 */
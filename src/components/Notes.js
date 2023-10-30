import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../utility/http';
import ErrorBlock from './ErrorBlock';
import LoadingBlock from './LoadingBlock';
import Note from './Note';

const Notes = () => {
  const { data, isPending, isLoading, isError, error } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    // staleTime: 1000 * 60 * 5, // 5 minutes //by-default is 0
    staleTime: 1000 * 10, // 30 seconds,
    // gcTime: 1000 * 60 * 60 * 24, // 24 hours // by-default is 300000 (5 minutes)
    gcTime: 10000, // 10 seconds
  });

  return (
    <div className='notes-container'>
      <h1>All Notes</h1>
      <div className='notes-wrapper'>
        {isLoading && <LoadingBlock />}
        {data && data.map((note, index) => <Note key={index} note={note} />)}
        {error && <ErrorBlock message={error.message} />}
      </div>
    </div>
  );
};

export default Notes;


/**
 * What is staleTime?
 *  staleTime is the amount of time in milliseconds before a query is considered stale.
 * That means it is the time which you can configure to tell React Query to refetch the data even if the data is already available in the cache. 
 * By default, the staleTime is 0, which means the data will never be stale and will never be refetched.
 *  If you have configured staleTime for 2 minutes and if you revisit the same component multiple times within 2 minutes, React Query will not refetch the data from the server or will not fire the query again. 
 * It can help you to reduce the number of API calls.
 * But if you revisit the same component after 2 minutes, React Query will refetch the data from the server.
 * 
 */

/**
 * What is gcTime?
 * gcTime is the amount of time in milliseconds before a query is garbage collected.
 * By default the gcTime is 5 minutes, which means if you revisit the same component after 5 minutes, React Query will refetch the data from the server.
 * It helps you to keep the cache fresh and up to date.
 * If you have configured gcTime for 24 hours and if you revisit the same component after 24 hours, React Query will refetch the data from the server.
 * 
 */

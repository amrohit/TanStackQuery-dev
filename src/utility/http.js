/*
export async function fetchNotes(searchTerm) {
  // console.log(params); // {queryKey: Array(1), meta: undefined}
  // you can find signal in meta object which is used to cancel the request in case of unmounting of the component or any other reason to cancel the request in the middle of the request. so browser can use this AbortController internally for the received signal to cancel the request.

  let url = 'http://localhost:8001/notes';
  
  if (searchTerm) {
    url += '?query=' + searchTerm
  }
  const response = await fetch(url);
  return handleResponse(response);
}

*/


export async function fetchNotes({ signal, searchTerm }) {
  // console.log(params); // {queryKey: Array(1), meta: undefined}
  // you can find signal in meta object which is used to cancel the request in case of unmounting of the component or any other reason to cancel the request in the middle of the request. so browser can use this AbortController internally for the received signal to cancel the request.

  let url = 'http://localhost:8001/notes';

  if (searchTerm) {
    url += '?query=' + searchTerm
  }
  const response = await fetch(url, { signal });
  return handleResponse(response);
}


export async function searchNotes(searchTerm) {
  console.log(searchTerm);
  const response = await fetch(`http://localhost:8001/search?query=${searchTerm}`);
  return await handleResponse(response);
}

async function handleResponse(response) {
  if (!response.ok) {
    const error = new Error('Error occurred while fetching data!');
    error.code = response.status;
    error.message = error.code === 404 ? 'Something went wrong!' : await response.json();
    throw error;
  }
  return await response.json();
}


// export async function searchNotes() {

//   const response = await fetch(`http://localhost:8001/search?query=${searchTerm}`);
//   if (!response.ok) {
//     const error = new Error('Error occurred while fetching notes!');
//     error.code = response.status;
//     error.message = error.code === 404 ? 'Something went wrong!' : await response.json();
//     throw error;
//   }
//   return await response.json();

// }
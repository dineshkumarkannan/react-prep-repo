const fetchPosts = async (
  url: string = "https://jsonplaceholder.typicode.com/posts",
  options: RequestInit = {}
) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Optionally, you can log or handle the error here
    throw error;
  }
};

export default fetchPosts;

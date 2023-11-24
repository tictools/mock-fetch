const fetchRequest = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      error: {
        name: error.name,
        message: error.message,
      },
      data: null,
    };
  }
};

export default fetchRequest;

const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "9aefa3ffdf8294c13b4aecc53ea612b3",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;

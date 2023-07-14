const getSpotifyTokenFromUrl = (hash) => {
  const stringAfterHash = hash.substring(1);
  const splitUrlParams = stringAfterHash.split("&");
  const separateUrlParams = splitUrlParams.reduce(
    (accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    },
    {}
  );

  return separateUrlParams;
};


export default getSpotifyTokenFromUrl;

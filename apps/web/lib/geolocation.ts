export const geocodeAddress = async (address: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    } else {
      console.error("No results from Nominatim");
      return null;
    }
  } catch (error) {
    console.error("Error calling Nominatim:", error);
    return null;
  }
};

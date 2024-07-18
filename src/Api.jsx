export async function GetUniversity(country) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}/search?country=${country}`
    );
    const dataJson = await response.json();
    if (dataJson) {
      return dataJson;
    }
  } catch (error) {
    console.error("Error fetching universities:", error);
  }
}

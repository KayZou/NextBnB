const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    //handle if domain not available
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }
    return res.json();
  } catch (error) {
    console.log(error.message || error);
    return [];
  }
}

async function fetchProperty(id) {
  try {
    if (!apiDomain) {
      throw new Error("API domain is not defined");
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch property");
    }
    const data = await res.json();
    // console.log(data[0]);
    return data[0];
  } catch (error) {
    console.log(error.message || error);
    return null;
  }
}

export { fetchProperties, fetchProperty };

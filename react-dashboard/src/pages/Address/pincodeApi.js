const POSTAL_PINCODE_URL = "https://api.postalpincode.in/pincode";

export async function fetchPincodeDetails(pinCode, signal) {
  const response = await fetch(`${POSTAL_PINCODE_URL}/${pinCode}`, { signal });

  if (!response.ok) {
    throw new Error("Unable to fetch pincode details.");
  }

  const [result] = await response.json();
  const postOffice = result?.PostOffice?.[0];

  if (result?.Status !== "Success" || !postOffice) {
    throw new Error("Please enter a valid postal code.");
  }

  return {
    city: postOffice.Block || postOffice.Name || "",
    district: postOffice.District || "",
    state: postOffice.State || "",
  };
}

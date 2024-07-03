const TOKEN = ""; // Replace with your actual token

async function query(chooseModel, token = TOKEN) {
  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${chooseModel}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text.value }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.blob();
    return result;
  } catch (error) {
    console.error("Error fetching the image:", error);
    throw error; // Re-throw the error to handle it in the click event listener
  }
}

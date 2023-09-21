import axios from "axios";

const DATAMUSE_API_URL = "https://api.datamuse.com/words";

export async function fetchRandomWord() {
  try {
    const response = await axios.get(`${DATAMUSE_API_URL}?sp=?????`);
    if (response.data && response.data.length > 0) {
      const randomWord =
        response.data[Math.floor(Math.random() * response.data.length)].word;
      return randomWord;
    } else {
      throw new Error("No random word found");
    }
  } catch (error) {
    throw new Error("Failed to fetch a random word from Datamuse.");
  }
}

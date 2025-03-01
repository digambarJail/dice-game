import axios from "axios";

const API_URL = "https://dice-game-cjj9.onrender.com";

interface RollDiceResponse {
  roll: number;
  newBalance: number;
}

export const rollDiceApi = async (bet: number): Promise<RollDiceResponse> => {
  try {
    const response = await axios.post<RollDiceResponse>(`${API_URL}/roll-dice`, { bet });
    return response.data;
  } catch (error) {
    throw new Error("Error rolling dice.");
  }
};

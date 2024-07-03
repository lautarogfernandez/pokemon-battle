import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IPokemon } from "../models/pokemon";

class PokemonService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:9999",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private handleResponse(response: AxiosResponse) {
    return response.data;
  }

  public async getPokemon(): Promise<IPokemon[]> {
    const response = await this.axiosInstance.get<IPokemon[]>("/pokemons");
    return this.handleResponse(response);
  }

  public async getWinner(id1: string, id2: string): Promise<string> {
    const response = await this.axiosInstance.get<string>(
      `/pokemons/battle?pokemonId1=${id1}&pokemonId2=${id2}`
    );
    return this.handleResponse(response);
  }
}

export default PokemonService;

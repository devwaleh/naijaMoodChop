export interface FoodRecommendation {
  name: string;
  emoji: string;
  description: string;
  vibeMatch: string;
  whereToFind: string;
  funFact: string;
}

export interface RecommendationResponse {
  recommendations: FoodRecommendation[];
}

export interface ApiError {
  error: string;
}

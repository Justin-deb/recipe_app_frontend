// Tipos para el frontend
export interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
}

export interface Country {
  id: number;
  name: string;
  flag_url: string;
  iso_alpha3: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  recipeId: string;
  title: string;
  description: string;
}

export interface Step {
  id: number;
  recipe_id: number;
  name: string;
  description: string;
  order: number;
}

export interface Ingredient {
  id: number;
  name: string;
}

export interface Recipe {
  comments: Comment[];
  countryFlag: string;
  countryId: string;
  countryName: string;
  description: string;
  id: number;
  ingredients: Ingredient[];
  name: string;
  photoUrl: string;
  userId: string;
  username: string;
}

// Agrega esto a tu archivo types/recipe.ts
export interface Rating {
  id: number;
  recipe_id: number;
  user_id: number;
  value: number;
}

export interface RecipeFavorite {
  id: number;
  recipe_id: number;
  user_id: number;
}

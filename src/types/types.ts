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
  id: number;
  title: string;
  description: string;
  user: User;
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
  amount: string;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  photo_url: string;
  author: User;
  country: Country;
  ingredients: Ingredient[];
  steps: Step[];
  comments: Comment[];
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

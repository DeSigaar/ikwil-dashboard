interface iMeal {
  id?: string;
  name: string;
  price: string;
  ingredients: string;
  isHallal: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  createdBy?: string;
  creatorId?: string;
  isActive?: boolean;
}

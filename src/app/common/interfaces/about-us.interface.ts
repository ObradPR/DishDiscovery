export interface IAboutUsDto {
  social_media: {
    facebook: string;
    twitter: string;
    instagram: string;
    pinterest: string;
  };
  contact_info: {
    email: string;
    phone: string;
  };
  statistics: {
    total_recipes: number;
    total_users: number;
    active_users: number;
    new_recipes_last_week: number;
    popular_tags: string[];
  };
  testimonials: {
    user_name: string;
    testimonial_text: string;
    user_avatar_url: string;
  }[];
}

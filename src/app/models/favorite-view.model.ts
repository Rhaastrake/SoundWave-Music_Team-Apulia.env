import { ContentType } from '../enums';

export interface FavoriteCardItem {
  id: string;
  type: ContentType;
  title: string;
  imageUrl: string;
  subtitle: string;
}

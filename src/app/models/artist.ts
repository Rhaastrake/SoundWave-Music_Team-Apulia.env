import { Album } from "./album";
import { WithId } from "./with-id";

export interface Artist extends WithId {
  name: string;
  imageUrl: string;
  albums: Album[];
}

import Grid from "../Grid/Grid";
import GridItem from "../GridItem/GridItem";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";
import type { IPhoto } from "../../types/photo";

interface IPhotosGallery {
  arr: IPhoto[];
  onClick: (i: IPhoto | null) => void;
}

export default function PhotosGallery({ arr, onClick }: IPhotosGallery) {
  return (
    <Grid>
      {arr.map((i) => (
        <GridItem key={i.id}>
          <PhotosGalleryItem item={i} action={onClick} />
        </GridItem>
      ))}
    </Grid>
  );
}

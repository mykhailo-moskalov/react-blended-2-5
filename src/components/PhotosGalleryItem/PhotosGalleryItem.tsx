import type { IPhoto } from "../../types/photo";

import styles from "./PhotosGalleryItem.module.css";

interface IPhotosGalleryItem {
  item: IPhoto;
  action: (i: IPhoto | null) => void;
}

export default function PhotosGalleryItem({
  item,
  action,
}: IPhotosGalleryItem) {
  return (
    <div
      className={styles.thumb}
      style={{
        backgroundColor: item.avg_color,
        borderColor: item.avg_color,
      }}
      onClick={() => action(item)}
    >
      <img src={item.src.original} alt={item.alt} />
    </div>
  );
}

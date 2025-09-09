import Container from "../components/container";
import AlbumsFilter from "../contexts/album/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";

const photos = [
  {
    id: "yrowiyr",
    title: "Foto de viangem a china",
    imageId: "portrait-tower.png",
    albums: [
      { id: "skhfk", title: "almnut" },
      { id: "skhfkjf", title: "almnujt" },
      { id: "skjgugrhfk", title: "almnut" },
    ],
  },

  {
    id: "yrowiyr",
    title: "Ola mundo",
    imageId: "portrait-tower.png",
    albums: [
      { id: "skhfk", title: "almnut" },
      { id: "skhfkjf", title: "almnujt" },
      { id: "skjgugrhfk", title: "almnut" },
    ],
  },

  {
    id: "yrowiyr",
    title: "Ola mundo",
    imageId: "portrait-tower.png",
    albums: [
      { id: "skhfk", title: "almnut" },
      { id: "skhfkjf", title: "almnujt" },
      { id: "skjgugrhfk", title: "almnut" },
    ],
  },

  {
    id: "yrowiyr",
    title: "Ola mundo",
    imageId: "portrait-tower.png",
    albums: [
      { id: "skhfk", title: "almnut" },
      { id: "skhfkjf", title: "almnujt" },
      { id: "skjgugrhfk", title: "almnut" },
    ],
  },
];
const albums = [
  {
    id: "knibeutuet",
    title: "Viagens",
  },

  {
    id: "knibeutuet8",
    title: "Trabalho",
  },

  {
    id: "knibeutuetiu",
    title: "Natureza",
  },
];
const PageHome = () => {
  return (
    <Container>
      <AlbumsFilter albums={albums} className="mb-9" />
      <PhotosList photos={photos} />
    </Container>
  );
};
export default PageHome;

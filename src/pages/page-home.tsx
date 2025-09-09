import Container from "../components/container";
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

const PageHome = () => {
  return (
    <Container>
      <PhotosList photos={photos} />
    </Container>
  );
};
export default PageHome;

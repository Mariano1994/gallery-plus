import Container from "../components/container";
import PhotoWidget from "../contexts/photos/components/photo-widget";

const PageHome = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-9 ">
        <PhotoWidget
          photo={{
            id: "yrowiyr",
            title: "Ola mundo",
            imageId: "portrait-tower.png",
            albums: [
              { id: "skhfk", title: "almnut" },
              { id: "skhfkjf", title: "almnujt" },
              { id: "skjgugrhfk", title: "almnut" },
            ],
          }}
        />

        <PhotoWidget
          photo={{
            id: "yrowiyr",
            title: "Ola mundo",
            imageId: "portrait-tower.png",
            albums: [
              { id: "skhfk", title: "almnut" },
              { id: "skhfkjf", title: "almnujt" },
              { id: "skjgugrhfk", title: "almnut" },
            ],
          }}
        />

        <PhotoWidget
          loading
          photo={{
            id: "yrowiyr",
            title: "Ola mundo",
            imageId: "portrait-tower.png",
            albums: [
              { id: "skhfk", title: "almnut" },
              { id: "skhfkjf", title: "almnujt" },
              { id: "skjgugrhfk", title: "almnut" },
            ],
          }}
        />

        <PhotoWidget
          photo={{
            id: "yrowiyr",
            title: "Ola mundo",
            imageId: "portrait-tower.png",
            albums: [
              { id: "skhfk", title: "almnut" },
              { id: "skhfkjf", title: "almnujt" },
              { id: "skjgugrhfk", title: "almnut" },
            ],
          }}
        />
      </div>
    </Container>
  );
};
export default PageHome;

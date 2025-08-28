import { useParams } from "react-router";
import Text from "../components/text";

const PagePhotoDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Text variant="heading-medium">Page photo details {id}</Text>
    </>
  );
};

export default PagePhotoDetails;

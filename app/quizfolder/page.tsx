"use client"; // Add this at the top
import React from "react";
import { supabase } from "../../utils/supabaseClient.ts";
// import { fetchQuizImages } from "../../utils/api"; // Adjust the path as necessary
// Define the Image interface
// interface Image {
//   name: string;
//   url: string;
// }
const Quiz = () => {
  // const [images, setImages] = useState<Image[]>([]);
  // useEffect(() => {
  //   const loadImages = async () => {
  //     const fetchedImages = await fetchQuizImages();
  //     console.log("Fetched Images:", fetchedImages); // Log the images
  //     if (fetchedImages) {
  //       setImages(fetchedImages);
  //     }
  //   };

  //   loadImages();
  // }, []);
  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <div>
      <h1>Quiz Images</h1>
      <div>
        {images.map((image) => (
          <img key={image.name} src={image.url} alt={image.name} />
        ))}
      </div>
    </div>
  );
};
export default Quiz;

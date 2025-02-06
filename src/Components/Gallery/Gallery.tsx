import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";

interface Image {
  id: string;
  webformatURL: string;
  tags: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>("mountain");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=48628711-ffb817c55a9388b99da7da5f6&q=${value}&image_type=photo&pretty=true`
        );
        setImages(response.data.hits);
        setLoading(false);
      } catch (err) {
        setError('An error occurred');
        setLoading(false);
      }
    };

    fetchImages();
  }, [value]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  function valueName(e: React.MouseEvent<HTMLInputElement>){
    setValue(e.currentTarget.ariaValueText)
  }
  return (
    <>
    <section className='my-4'>
        <div className="container">
            <div className="row justify-content-center row-gap-4">
                <div className="col-lg-4">
                    <input type="search" className='form-control' 
                        placeholder='Search For Picture'
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <input type='button' className="nav-link" 
                        aria-valuetext='mountain' key={value} 
                        onClick={valueName} value={"mountain"} name='mountain'/>
                    </li>

                    <li className="nav-item">
                        <input type='button' className="nav-link" 
                        aria-valuetext='beaches' key={value} 
                        onClick={valueName} value={"beaches"} name='beaches'/>
                    </li>

                    <li className="nav-item">
                        <input type='button' className="nav-link" 
                        aria-valuetext='flower' key={value} 
                        onClick={valueName} value={"flower"} name='flower'/>
                    </li>
                    
                    <li className="nav-item">
                        <input type='button' className="nav-link" 
                        aria-valuetext='food' key={value} 
                        onClick={valueName} value={"food"} name='food'/>
                    </li>
                </ul>
                {images.map((image) => (
                    <div className="col-lg-3 hov overflow-hidden">
                        <img src={image.webformatURL} alt={image.tags} key={image.id} />
                    </div>
                ))}
            </div>
        </div>
    </section>
    </>
  );
};

export default Gallery;

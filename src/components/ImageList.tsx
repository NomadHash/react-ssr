import React from 'react';
import styled from 'styled-components';
import image1 from '@assets/images/image-1.jpg';
import image2 from '@assets/images/image-2.jpg';
import image3 from '@assets/images/image-3.jpg';
import LazyImage from '@lib/utilComponents/LazyImage';

const UlImageList = styled.ul`
  list-style: none;

  li {
    margin-bottom: 200px;
  }
`;

const SomeBlock = styled.div`
  background: #929292;
  height: 2000px;
  ${({ theme }) => theme.media.mobile`
      border: 2px solid red;
      `}
  ${({ theme }) => theme.media.tablet`
        border: 2px solid yellow;
    `}
    ${({ theme }) => theme.media.desktop`
        border: 2px solid purple;
    `}
`;

const ImageList: React.FC = () => {
  return (
    <UlImageList>
      <SomeBlock />
      <li>
        <LazyImage src={image1} alt="someImage1" />
      </li>
      <li>
        <LazyImage src={image2} alt="someImage2" />
      </li>
      <li>
        <LazyImage src={image3} alt="someImage3" />
      </li>
    </UlImageList>
  );
};

export default ImageList;

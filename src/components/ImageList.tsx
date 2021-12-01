import React from 'react';
import styled from 'styled-components';
import image1 from '@src/assets/images/image-1.jpg';
import image2 from '@src/assets/images/image-2.jpg';
import image3 from '@src/assets/images/image-3.jpg';

const UlImageList = styled.ul`
  list-style: none;
`;

const SomeBlock = styled.div`
  background: red;
  height: 300px;
  ${({ theme }) => theme.media.mobile`
      border: 2px solid yellow;
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
      <li>
        <SomeBlock />
        <img src={image1} alt="someImage1" />
      </li>
      <li>
        <img src={image2} alt="someImage2" />
      </li>
      <li>
        <img src={image3} alt="someImage3" />
      </li>
    </UlImageList>
  );
};

export default ImageList;

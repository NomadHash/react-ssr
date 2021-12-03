import React from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

interface ILazyImgBlockProps {
  isInView: boolean;
}
interface ILazyImageProps {
  src: string;
  alt: string;
}

const LazyImgBlock = styled.div<ILazyImgBlockProps>`
  width: 240px;
  height: 150px;
  background: #f5f5f5;

  img {
    width: 240px;
    height: 150px;
    opacity: ${({ isInView }) => {
      return isInView ? '1' : '0';
    }};
    transition: opacity 0.3s;
  }
`;

const LazyImage: React.FC<ILazyImageProps> = ({ src, alt }): JSX.Element => {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '80px', triggerOnce: true });
  return (
    <LazyImgBlock isInView={inView}>
      <img ref={ref} src={inView ? src : '#'} alt={inView ? alt : ''} />
    </LazyImgBlock>
  );
};

export default LazyImage;

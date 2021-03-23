import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  var screen='lg'
  if(width<=600) screen='xs';
  else if(width<=960) screen ='sm'
  else if(width<=1280) screen ='md'
  else if(width<=1920) screen ='lg'
  else screen ='xl'
  
  return {
    width,
    height,
    screen
  };
}

export default function UseWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
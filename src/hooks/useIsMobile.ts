import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    handleWindowSizeChange();

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return mobile;
};

export default useIsMobile;

import { useEffect, useState } from "react";

const useAllServicesReady = () => {
  const [isSubsReady, setIsSubsReady] = useState(false);

  useEffect(() => {
    const SERVICES = [i18n, theme];
    let subsReady = 0;

    SERVICES.forEach((service) => {
      service.events.on("ready", () => {
        subsReady += 1;
        service.events.off("ready");

        if (subsReady === SERVICES.length) {
          setIsSubsReady(true);
        }
      });
    });
  }, []);

  return isSubsReady;
};

export default useAllServicesReady;

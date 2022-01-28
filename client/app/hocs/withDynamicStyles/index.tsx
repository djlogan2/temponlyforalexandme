import React, {
  FCICC,
  TRequiredComponentProps,
  useEffect,
  useState,
} from "react";
import injectSheet from "react-jss";

export const withDynamicStyles =
  (Component: FCICC) =>
  ({ ...props }: TRequiredComponentProps) => {
    const [data, setData] = useState<object>();

    useEffect(() => {
      theme.events.on("ready", () => {
        const fetchedData = theme.getTheme();
        if (fetchedData?.reactclass) {
          setData(fetchedData.reactclass);
        }
      });
    }, []);

    let CustomComponent = Component;

    if (data) {
      CustomComponent = injectSheet(data)(CustomComponent) as unknown as FCICC;
    }

    return data ? <CustomComponent {...props} /> : null;
  };

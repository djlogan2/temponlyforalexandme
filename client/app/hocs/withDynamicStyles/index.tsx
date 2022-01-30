import React, {
  FCICC,
  TRequiredComponentProps,
  useEffect,
  useState,
} from "react";
import injectSheet from "react-jss";
import { updateTranslations } from "../../store/features/i18n";
import { useAppDispatch } from "../../store/hooks";

export const withDynamicStyles =
  (Component: FCICC) =>
  ({ ...props }: TRequiredComponentProps) => {
    const [data, setData] = useState<object>();
    const dispatch = useAppDispatch();

    //
    // TODO: So this is exactly what I'm talking about. Why do you think you must have theme.events.on.ready?
    //   theme.events.on.themechanged works perfectly, it provides you the record, and it does so every time
    //   the record changes.
    //   theme.events.on.ready works "almost perfectly"...
    //     it does NOT provide the record, only that an update has occurred (and finished.) You must obtain
    //     the record yourself.
    //   Otherwise both are absolutely identical, so again, why did we, why do we, need a "ready"?
    //   "ready" is going to be for later, when we are loading 10000 translations, or users, or games, or chats.
    useEffect(() => {
      theme.events.on("ready", () => {
        const fetchedData = theme.getTheme();

        if (fetchedData?.reactclass) {
          setData(fetchedData.reactclass);
        }
      });

      i18n.events.on("ready", () => {
        const fetchedData = i18n.getTranslations();

        const translations = fetchedData?.reduce(
          (prev: { [key: string]: string }, curr) => {
            prev[curr.token] = curr.text;

            return prev;
          },
          {},
        );

        if (translations) {
          dispatch(updateTranslations(translations));
        }
      });
    }, []);

    let CustomComponent = Component;

    if (data) {
      CustomComponent = injectSheet(data)(CustomComponent) as unknown as FCICC;
    }

    return data ? <CustomComponent {...props} /> : null;
  };

import React, { FCICC, TRequiredComponentProps, useEffect } from "react";
import { updateTranslations } from "../../store/features/i18n";
import { useAppDispatch } from "../../store/hooks";

export const withTranslations =
  (Component: FCICC) =>
  ({ ...props }: TRequiredComponentProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
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

    return <Component {...props} />;
  };

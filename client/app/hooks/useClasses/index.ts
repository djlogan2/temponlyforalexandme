const useClasses = (classes: string[]) => {
  const newClasses: any = {};

  classes.forEach((cl) => {
    // @ts-ignore TODO: what is it? Looks like a dummy event
    newClasses[cl] = window.theme.getCgetssClass(cl);
  });

  return newClasses;
};

export default useClasses;

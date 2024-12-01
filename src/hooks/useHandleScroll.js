export const useHandleScroll = (ref) => {
  const elementPosition =
    ref?.current?.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
};

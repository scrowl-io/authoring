export const getContainer = (target: HTMLElement | null, classTest: string) => {
  if (!target) {
    return;
  }

  if (!target.classList.contains(classTest)) {
    return getContainer(target.parentElement, classTest);
  }

  return target;
};

export default {
  getContainer,
};

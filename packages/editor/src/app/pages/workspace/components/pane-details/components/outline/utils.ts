export const getContainer = (target: Element | null, classTest: string, reverse: boolean = false) => {
  if (!target) {
    return;
  }

  if (!target.classList.contains(classTest)) {

    if (reverse) {
      const children = Array.from(target.children);
      const childrenLn = children.length;
      let check;

      for (let i = 0; i < childrenLn; i++) {
        check = getContainer(children[i], classTest, true);

        if (check) {
          break;  
        }
      }

      return check;
    }

    return getContainer(target.parentElement, classTest);
  }

  return target;
};

export default {
  getContainer,
};

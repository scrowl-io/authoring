import { useSelector, useDispatch } from 'react-redux';
import { stateManager } from '../../services';
import { state } from './';

const processor: stateManager.StateProcessor = {};

export const useProcessor = () => {
  const dispatch = useDispatch();

  processor.dispatch = dispatch;
};

export const useGlossaryEditor = () => {
  return useSelector((data: stateManager.RootState) => data.workspace.isOpenGlossaryEditor);
};

export const setGlossaryEditor = (isOpen: boolean) => {
  if (!processor.dispatch) {
    console.warn('workspace processor not ready');
    return;
  }

  processor.dispatch(state.setGlossaryEditor(isOpen));
};

export default {
  useProcessor,
  useGlossaryEditor,
  setGlossaryEditor,
};

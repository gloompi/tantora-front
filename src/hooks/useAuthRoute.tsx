import { useHistory } from 'react-router-dom';
import useStore from 'hooks/useStore';

export default () => {
  const history = useHistory();
  const { authStore } = useStore();

  if (!authStore.isAuth) {
    history.replace('/login');
  }
};

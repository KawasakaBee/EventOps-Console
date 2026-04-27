import { redirect } from 'next/navigation';

const Root = () => {
  redirect('/login');
  return <>Root page</>;
};

export default Root;

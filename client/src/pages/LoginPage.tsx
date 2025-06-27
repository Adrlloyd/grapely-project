import LoginForm from '../components/Authentification/LoginForm';
import Layout from '../components/Layout';


const LoginPage = () => {

  return (
    <>
    <Layout>
      <h2>Create an account</h2>
      <LoginForm />
    </Layout>
    </>
  );
}

export default LoginPage;
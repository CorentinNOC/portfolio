const Login = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <form className="w-full max-w-[380px] rounded-lg p-6 bg-gray-200 flex flex-col">
        <label htmlFor="mail">E-mail</label>
        <input
          className="bg-gray-300 my-2 py-2 px-4"
          type="email"
          id="mail"
          name="mail"
          placeholder="Email"
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          className="bg-gray-300 my-2 py-2 px-4"
          id="password"
          name="password"
          type="password"
          placeholder="••••••"
          required
        />
      </form>
    </main>
  );
};

export default Login;

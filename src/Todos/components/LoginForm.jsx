const LoginForm = () => {
  return (
      <>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-purple-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded-md border border-gray-300 p-2 outline-none focus:border-purple-500"
        />

       </>
  );
};

export default LoginForm;
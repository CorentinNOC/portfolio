import Content from "../components/Content";
import Header from "../components/Header";

export const Home = () => {
  return (
    <main className="max-w-screen-xl mx-auto lg:flex lg:justify-between px-6 relative min-h-screen">
      <Header />
      <Content />
    </main>
  );
};

export default Home;

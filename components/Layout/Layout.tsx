import { Header, Navigation } from '..';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header>
        <Navigation />
      </Header>
      <main>{children}</main>
    </div>
  );
};

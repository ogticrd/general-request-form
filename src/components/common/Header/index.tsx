import { Container } from '../../ui/Container';

export const Header = () => {

  return (
    <header style={{ background: "white" }}>
      <Container paddingY={false} maxWidth='lg'>
        <div style={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 0rem"
        }}>
          <img style={{ cursor: "pointer" }}
            src={"/assets/logo.svg"}
            alt='logo' width={110} />
        </div>
      </Container>
    </header>
  );
}

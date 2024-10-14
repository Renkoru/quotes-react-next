// import Footer from './footer'
import { Container } from "@mui/material";
 
export default function Layout({ children }) {
  return (
    <>
      <main>
        <Container maxWidth="md" sx={{pt: "30px"}}>
          {children}
        </Container>
      </main>
      {/* <Footer /> */}
    </>
  );
}

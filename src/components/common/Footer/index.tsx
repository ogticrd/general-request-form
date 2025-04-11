import * as React from 'react';
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

import { GridContainer, GridItem } from "../../ui/Grid";
import { theme } from "../../../theme";
import { Container } from '../../ui/Container';
import { IconButton, Typography } from '@mui/material';

interface IFooterInternalProps {
  children: React.ReactNode;
}

export interface IFooter {
  contact?: {
    phone?: string;
    fax?: string;
    email?: string;
  },
  logo?: string;
  logoAllRightsReserved?: string;
  logoAllRightsReservedWidth?: string;
  social?: {
    facebook?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
  },
  links?: {
    terms?: string;
    privacy?: string;
    faq?: string;
  },
  address?: string;
  institutionFullName?: string;
}

export const FooterContent = ({ children }: IFooterInternalProps) => {
  return (
    <div style={{ padding: "75px 25px", background: theme.palette.primary.main }}>
      <Container paddingY={false}>
        {children}
      </Container>
    </div>
  )
}

export const FooterBottom = ({ children }: IFooterInternalProps) => {
  return (
    <div style={{ background: "white", padding: "12.5px 25px" }}>
      <Container paddingY={false}>
        {children}
      </Container>
    </div>
  )
}

export const Footer = (props: IFooter) => {

  return (
    <div>
      <FooterContent>
        <GridContainer alignItems="center" spacing={4}>
          <GridItem md={12} lg={3}>
            <div style={{ display: "flex" }}>
              <img src={'/assets/logo-footer.svg'} alt="logo institucion" width="241" />
            </div>
          </GridItem>
          <GridItem md={12} lg={9}>
            <GridContainer spacing={4}>
              <GridItem md={6} lg={3}>
                <Typography fontWeight="500" fontSize={16} color="white">
                  CONÓCENOS
                </Typography>
                <br />
                <Typography lineHeight='19px' variant='body2' color="white" fontWeight="400" fontSize="16">
                  Oficina Gubernamental de Tecnologías de la Información y Comunicaciones (OGTIC) y el Gabinete de Innovación
                </Typography>
              </GridItem>

              <GridItem md={6} lg={3}>
                <Typography fontWeight="500" fontSize={16} color="white">
                  CONTÁCTANOS
                </Typography>
                <br />
                <Typography lineHeight='19px' variant='body2' color="white" fontWeight="400" fontSize="16">
                  Tel: (809)-286-1009
                </Typography>
                <Typography lineHeight='19px' variant='body2' color="white" fontWeight="400" fontSize="16">
                  Fax: (809)-732-5465
                </Typography>
                <Typography lineHeight='19px' variant='body2' color="white" fontWeight="400" fontSize="16">
                  info@ogtic.gob.do
                </Typography>
              </GridItem>

              <GridItem md={6} lg={3}>
                <Typography fontWeight="500" fontSize={16} color="white">
                  BÚSCANOS
                </Typography>
                <br />
                <Typography lineHeight='19px' variant='body2' color="white" fontWeight="400" fontSize="16">
                  Ave. Rómulo Betancourt #311, Edificio Corporativo Vista 311, Santo Domingo, R.D.
                </Typography>
              </GridItem>

              <GridItem md={6} lg={3}>
                <Typography fontWeight="500" fontSize={16} color="white">
                  INFÓRMATE
                </Typography>
                <br />
                <Typography lineHeight='19px' variant='body2' color="white" fontWeight="400" fontSize="16">
                  <a style={{ color: 'white' }} href="https://ogtic.gob.do/terminos-de-uso" target='_blank' className='block cursor-pointer hover:underline'>Términos y Condiciones</a>
                  <br />
                  <a style={{ color: 'white' }} href="https://ogtic.gob.do/politicas-de-privacidad" target='_blank' className='block cursor-pointer hover:underline'>Política de Privacidad</a>
                  <br />
                  <a style={{ color: 'white' }} href="https://ogtic.gob.do/faqs" target='_blank' className='block cursor-pointer hover:underline'>Preguntas Frecuentes</a>
                </Typography>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </FooterContent>

      <FooterBottom>
        <GridContainer>
          <GridItem md={6} lg={6}>
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
              <Typography variant="caption" fontWeight="600" color="primary">
                © {new Date().getFullYear()} Todos los Derechos Reservados.
                Desarrollado por
              </Typography>
              <img
                style={{ marginLeft: "5px", cursor: "pointer" }}
                src={"/assets/logo.svg"}
                alt="logo institución"
                width={"70px"}
                onClick={() => window.open("https://ogtic.gob.do/")}
              />
            </div>
          </GridItem>
          <GridItem md={6} lg={6}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ margin: "auto", marginRight: '10px' }}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="primary"
                >
                  SÍGUENOS
                </Typography>
              </span>

              <a href={"https://www.facebook.com/Ogticrd"} target='_blank'>
                <IconButton color="primary">
                  <FacebookIcon />
                </IconButton>
              </a>

              <a href={"https://www.youtube.com/c/OGTICRD"} target='_blank'>
                <IconButton color="primary">
                  <YouTubeIcon />
                </IconButton>
              </a>

              <a href={"https://www.instagram.com/ogticrd/"} target='_blank'>
                <IconButton color="primary">
                  <InstagramIcon />
                </IconButton>
              </a>

              <a href={"https://x.com/OGTICRDO"} target='_blank'>
                <IconButton color="primary">
                  <TwitterIcon />
                </IconButton>
              </a>

            </div>
          </GridItem>
        </GridContainer>
      </FooterBottom>
    </div >
  );
}

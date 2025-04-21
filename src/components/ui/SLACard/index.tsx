import { dataSLA } from '@/data'
import { theme } from '@/theme'
import { Typography } from '@mui/material'
import React from 'react'
import { SpanColor } from '../SpanColor'
import { GridContainer, GridItem } from '../Grid'

export const SLACard = () => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" color='primary' gutterBottom>
        SLA <SpanColor>Datos Abiertos</SpanColor>
      </Typography>
      <GridContainer justifyContent="center" alignItems="stretch">
        {dataSLA?.map((item, index) => (
          <GridItem
            key={index}
            lg={6}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "30px 20px",
                background: `${theme.palette.info.main}10`,
                borderRadius: "8px",
                border: `1px solid ${theme.palette.info.main}`,
              }}
            >
              <Typography variant="h6" fontWeight="bold" color='info' gutterBottom>
                {item?.title}
              </Typography>
              <Typography variant="body1" color="primary">
                {item?.description}
              </Typography>
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </>
  )
}

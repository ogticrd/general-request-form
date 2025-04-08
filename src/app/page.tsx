"use client"

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio, Typography, Button, Stack } from '@mui/material';
import { Container } from '@/components/ui/Container';
import * as yup from 'yup';
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup';
import { SpanColor } from '@/components/ui/SpanColor';
import { GridContainer, GridItem } from '@/components/ui/Grid';
import { dataFrequencyOptions, dataTypeOptions } from '@/data';

interface FormValues {
  requesterName: string;
  department: string;
  requestDate: string;
  phone: string;
  email: string;
  requestChannel: 'Correo' | 'Whatsapp' | 'Otro';

  requestTitle: string;
  desiredDeliveryDate: string;
  description: string;
  objective: string;

  developmentType: 'Nuevo desarrollo' | 'Modificación';
  includesDataLoad: boolean;
  dataType?: any;
  dataSource?: string;
  dataFrequency?: any;
  metadataUpdate: boolean;
  systemIntegration: boolean;
  integratedSystems?: string;

  priority: 'Alta' | 'Media' | 'Baja';
  priorityJustification: string;
  affectsPortal: boolean;
  requiresDowntime: boolean;
  estimatedDowntime?: string;

  includesAttachments: boolean;
  attachments?: any;

  additionalNotes?: string;
  copyEmails?: string;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  requesterName: yup.string().required('Nombre requerido'),
  department: yup.string().required('Departamento requerido'),
  requestDate: yup.string().required('Fecha requerida'),
  phone: yup.string().required('Teléfono requerido'),
  email: yup.string().email('Correo inválido').required('Correo requerido'),
  requestChannel: yup.mixed<'Correo' | 'Whatsapp' | 'Otro'>().oneOf(['Correo', 'Whatsapp', 'Otro']).required('Canal requerido'),

  requestTitle: yup.string().required('Título requerido'),
  desiredDeliveryDate: yup.string().required('Fecha deseada requerida'),
  description: yup.string().required('Descripción requerida'),
  objective: yup.string().required('Objetivo requerido'),

  developmentType: yup.mixed<'Nuevo desarrollo' | 'Modificación'>().oneOf(['Nuevo desarrollo', 'Modificación']).required('Tipo requerido'),
  includesDataLoad: yup.boolean().required(),
  dataType: yup.array().of(
    yup.object().shape({
      value: yup.string().required('Valor requerido'),
      label: yup.string().required('Etiqueta requerida'),
    })
  ).optional().when('includesDataLoad', {
    is: true,
    then: (schema) => schema.min(1, 'Debe seleccionar al menos un tipo de dato').required('Tipo de datos requerido'),
  }),
  dataSource: yup.string().optional().when('includesDataLoad', {
    is: true,
    then: (schema) => schema.required('Fuente requerida'),
  }),
  dataFrequency: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable()
    .when('includesDataLoad', {
      is: true,
      then: (schema) =>
        schema
          .required('Periodicidad requerida')
          .test('has-value-label', 'Periodicidad requerida', (val) => {
            return !!val?.value && !!val?.label;
          }),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
  metadataUpdate: yup.boolean().required('Campo requerido'),
  systemIntegration: yup.boolean().required('Campo requerido'),
  integratedSystems: yup.string().optional().when('systemIntegration', {
    is: true,
    then: (schema) => schema.required('Sistemas requeridos'),
  }),

  priority: yup.mixed<'Alta' | 'Media' | 'Baja'>().oneOf(['Alta', 'Media', 'Baja']).required('Prioridad requerida'),
  priorityJustification: yup.string().required('Justificación requerida'),
  affectsPortal: yup.boolean().required('Campo requerido'),
  requiresDowntime: yup.boolean().required('Campo requerido'),
  estimatedDowntime: yup.string().optional().when('requiresDowntime', {
    is: true,
    then: (schema) => schema.required('Tiempo estimado requerido'),
  }),

  includesAttachments: yup.boolean().required('Campo requerido'),
  attachments: yup
    .array()
    .of(yup.mixed())
    .nullable()
    .when('includesAttachments', {
      is: true,
      then: (schema) =>
        schema
          .min(1, 'Debe adjuntar al menos un archivo')
          .required('Archivos requeridos'),
      otherwise: (schema) => schema.notRequired(),
    }),

  additionalNotes: yup.string().optional(),
  copyEmails: yup.string().optional(),
});


export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  console.log(errors)
  console.log('watch', watch)

  const includesDataLoad = Boolean(watch('includesDataLoad'));
  const systemIntegration = Boolean(watch('systemIntegration'));
  const requiresDowntime = Boolean(watch('requiresDowntime'));
  const includesAttachments = Boolean(watch('includesAttachments'));
  const attachments = watch('attachments') || [];

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const existingFiles = watch('attachments') || [];

    const combined = [
      ...existingFiles,
      ...newFiles.filter(
        (newFile) =>
          !existingFiles.some(
            (existingFile: File) => existingFile.name === newFile.name
          )
      ),
    ];

    setValue('attachments', combined);
    e.target.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updated = attachments.filter((_: File, i: number) => i !== indexToRemove);
    setValue('attachments', updated);
  };

  const onSubmit = (data: FormValues) => {
    console.log('==============>', data);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" fontWeight="bold" color='primary' gutterBottom>
        Formulario de Requerimientos Técnicos - <SpanColor>Datos Abiertos</SpanColor>
      </Typography>
      <div style={{ background: "white", padding: "40px", borderRadius: "8px" }}>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto mt-10">

          {/* Información General */}
          <Typography variant="h6" color="info" gutterBottom>1. Información General del Requerimiento</Typography>
          <br />
          <GridContainer>
            <GridItem>
              <label className='label'>Nombre del solicitante</label>
              <input {...register('requesterName')} className="input" />
              <p className="txt-red">{errors.requesterName?.message}</p>
            </GridItem>
            <GridItem>
              <label className='label'>Cargo o departamento</label>
              <input {...register('department')} className="input" />
              <p className="txt-red">{errors.department?.message}</p>
            </GridItem>
            <GridItem>
              <label className='label'>Fecha de solicitud</label>
              <input type="date" {...register('requestDate')} className="input" />
              <p className="txt-red">{errors.requestDate?.message}</p>
            </GridItem>
            <GridItem>
              <label className='label'>Teléfono o contacto</label>
              <input {...register('phone')} className="input" />
              <p className="txt-red">{errors.phone?.message}</p>
            </GridItem>
            <GridItem>
              <label className='label'>Correo electrónico</label>
              <input type="email" {...register('email')} className="input" />
              <p className="txt-red">{errors.email?.message}</p>
            </GridItem>
            <GridItem>
              <label className='label'>Canal de solicitud</label>
              <Controller control={control} name="requestChannel" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="Correo" control={<Radio />} label="Correo" />
                  <FormControlLabel value="Whatsapp" control={<Radio />} label="Whatsapp" />
                  <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.requestChannel?.message}</p>
            </GridItem>
          </GridContainer>

          {/* Descripción del Requerimiento */}
          <br />
          <Typography variant="h6" color="info" gutterBottom>2. Descripción del Requerimiento</Typography>
          <br />
          <GridContainer>
            <GridItem>
              <label className='label'>Título del requerimiento</label>
              <input {...register('requestTitle')} className="input" />
              <p className="txt-red">{errors.requestTitle?.message}</p>
            </GridItem>
            <GridItem>
              <label className='label'>Fecha deseada para la entrega</label>
              <input type="date" {...register('desiredDeliveryDate')} className="input" />
              <p className="txt-red">{errors.desiredDeliveryDate?.message}</p>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>Descripción detallada</label>
              <textarea
                placeholder="Explicar el problema o la necesidad que se desea abordar"
                {...register('description')}
                className="textarea"
              />
              <p className="txt-red">{errors.description?.message}</p>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>Objetivo del cambio o mejora</label>
              <textarea placeholder="¿Cuál es el resultado esperado?" {...register('objective')} className="textarea" />
              <p className="txt-red">{errors.objective?.message}</p>
            </GridItem>
          </GridContainer>

          {/* Alcance */}
          <br />
          <Typography variant="h6" color="info" gutterBottom>3. Alcance del Requerimiento</Typography>
          <br />
          <GridContainer>
            <GridItem lg={8} md={12}>
              <label className='label'>¿Es un nuevo desarrollo o una modificación?</label>
              <Controller control={control} name="developmentType" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="Nuevo desarrollo" control={<Radio />} label="Nuevo desarrollo" />
                  <FormControlLabel value="Modificación" control={<Radio />} label="Modificación" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.developmentType?.message}</p>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>¿Involucra la carga de nuevos datos?</label>
              <Controller control={control} name="includesDataLoad" render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={(e: any) => setValue('includesDataLoad', e?.target?.value === 'true' ? true : false)}
                >
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.includesDataLoad?.message}</p>
              {includesDataLoad && (
                <GridContainer>
                  <GridItem>
                    <label className='label2'>Tipo de datos</label>
                    <Select
                      isMulti
                      placeholder="Seleccionar"
                      options={dataTypeOptions}
                      onChange={(e: any) => setValue("dataType", e)}
                    />
                    <p className="txt-red">{errors.dataType?.message as string}</p>
                  </GridItem>

                  <GridItem>
                    <label className='label2'>Fuente de los datos</label>
                    <input {...register('dataSource')} className="input" />
                    <p className="txt-red">{errors.dataSource?.message}</p>
                  </GridItem>

                  <GridItem>
                    <label className='label2'>Periodicidad de la carga</label>
                    <Select
                      placeholder="Seleccionar"
                      options={dataFrequencyOptions}
                      onChange={(e: any) => setValue("dataFrequency", e)}
                    />
                    <p className="txt-red">{errors.dataFrequency?.message as string}</p>
                  </GridItem>
                </GridContainer>
              )}
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>¿Requiere actualización de metadatos?</label>
              <Controller control={control} name="metadataUpdate" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.metadataUpdate?.message}</p>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>¿Involucra integración con otros sistemas?</label>
              <Controller control={control} name="systemIntegration" render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={(e: any) => setValue('systemIntegration', e?.target?.value === 'true' ? true : false)}
                >
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.systemIntegration?.message}</p>
              {systemIntegration && (
                <GridContainer>
                  <GridItem>
                    <label className='label2'>Especificar los sistemas</label>
                    <input {...register('integratedSystems')} className="input" />
                    <p className="txt-red">{errors.integratedSystems?.message}</p>
                  </GridItem>
                </GridContainer>
              )}
            </GridItem>
          </GridContainer>

          {/* Impacto */}
          <br />
          <Typography variant="h6" color="info" gutterBottom>4. Impacto del Cambio</Typography>
          <br />
          <GridContainer>
            <GridItem lg={8} md={12}>
              <label className='label'>Nivel de prioridad</label>
              <Controller control={control} name="priority" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="Alta" control={<Radio />} label="Alta" />
                  <FormControlLabel value="Media" control={<Radio />} label="Media" />
                  <FormControlLabel value="Baja" control={<Radio />} label="Baja" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.priority?.message}</p>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>Justificación de la prioridad</label>
              <textarea
                {...register('priorityJustification')}
                className="textarea"
              />
              <p className="txt-red">{errors.priorityJustification?.message}</p>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>¿Afecta la disponibilidad del portal?</label>
              <Controller control={control} name="affectsPortal" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.affectsPortal?.message}</p>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>¿Requiere interrupción del servicio?</label>
              <Controller control={control} name="requiresDowntime" render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={(e: any) => setValue('requiresDowntime', e?.target?.value === 'true' ? true : false)}
                >
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.requiresDowntime?.message}</p>
              {requiresDowntime && (
                <GridContainer>
                  <GridItem>
                    <label className='label2'>Tiempo estimado</label>
                    <input {...register('estimatedDowntime')} className="input" />
                    <p className="txt-red">{errors.estimatedDowntime?.message}</p>
                  </GridItem>
                </GridContainer>
              )}
            </GridItem>
          </GridContainer>



          {/* Adjuntos */}
          <br />
          <Typography variant="h6" color="info" gutterBottom>5. Documentación Adjunta</Typography>
          <br />
          <GridContainer>
            <GridItem lg={12} md={12}>
              <label className='label'>¿Incluye archivos adjuntos?</label>
              <Controller control={control} name="includesAttachments" render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={(e: any) => setValue('includesAttachments', e?.target?.value === 'true' ? true : false)}
                >
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <p className="txt-red">{errors.includesAttachments?.message}</p>
              {includesAttachments && (
                <GridContainer>
                  <GridItem lg={12} md={12}>
                    <label className='label2'>Especificar los archivos</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFilesChange}
                    />
                    {attachments.length > 0 && (
                      <ul>
                        {attachments.map((file: File, index: number) => (
                          <li key={index}>
                            {file.name}{' '}
                            <Button
                              onClick={() => handleRemoveFile(index)}
                              size='small'
                              color='error'
                              variant='contained'
                            >
                              Eliminar
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="txt-red">{errors.attachments?.message as string}</p>
                  </GridItem>
                </GridContainer>
              )}
            </GridItem>
          </GridContainer>
          <br />
          <GridContainer>
            <GridItem lg={8} md={12}>
              <label className='label'>Notas adicionales</label>
              <textarea {...register('additionalNotes')} className="textarea" />
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>Correos electrónicos a copiar</label>
              <input {...register('copyEmails')} className="input mt-2" />
            </GridItem>
          </GridContainer>
          <br />
          <Button type="submit" variant="contained" color="primary" className="mt-6">
            Enviar
          </Button>
        </form>
      </div>
    </Container >
  );
}

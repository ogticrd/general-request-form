"use client"

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio, Typography, Button, Divider, Alert } from '@mui/material';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import { Container } from '@/components/ui/Container';
import { yupResolver } from '@hookform/resolvers/yup';
import { SpanColor } from '@/components/ui/SpanColor';
import { GridContainer, GridItem } from '@/components/ui/Grid';
import { useSnackbar } from 'notistack';
import { SLACard } from '@/components/ui/SLACard';
import { FormValues } from '@/types/form.types';
import { formSchema } from '@/schema/form.schema';
import { formDefaultValues } from '@/constants/form';
import { Input } from '@/components/ui/Input';
import { theme } from '@/theme';
import { getTodayDate } from '@/helpers/date';

registerLocale('es', es);

export default function Home() {

  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, control, setValue, watch, formState: { errors }, reset } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: formDefaultValues as FormValues,
  });
  console.log(watch())
  console.log(errors)

  // const includesDataLoad = Boolean(watch('includesDataLoad'));
  // const systemIntegration = Boolean(watch('systemIntegration'));
  const requiresDowntime = Boolean(watch('requiresDowntime'));
  const deliveryDate = watch('desiredDeliveryDate');
  const includesAttachments = Boolean(watch('includesAttachments'));
  // const attachments = watch('attachments') || [];
  // const requirementJustification = watch('requirementJustification') || [];

  // const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFiles = Array.from(e.target.files || []);
  //   const existingFiles = watch('requirementJustification') || [];

  //   const combined = [
  //     ...existingFiles,
  //     ...newFiles.filter(
  //       (newFile) =>
  //         !existingFiles.some(
  //           (existingFile: File) => existingFile.name === newFile.name
  //         )
  //     ),
  //   ];

  //   setValue('requirementJustification', combined);
  //   e.target.value = '';
  // };

  // const handleRemoveFile = (indexToRemove: number) => {
  //   const updated = requirementJustification.filter((_: File, i: number) => i !== indexToRemove);
  //   setValue('requirementJustification', updated);
  // };

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    try {
      const jsonBody: Record<string, any> = {
        requesterName: data?.requesterName,
        department: data?.department,
        requestDate: getTodayDate(),
        phone: data?.phone,
        email: data?.email,
        institution: data?.institution,
        requestChannel: data?.requestChannel,

        requestTitle: data?.requestTitle,
        desiredDeliveryDate: data?.desiredDeliveryDate
          ? data?.desiredDeliveryDate?.toISOString().split('T')[0]
          : null,
        requestType: data?.requestType,
        integrationSystem: data?.integrationSystem,
        involveNewData: data?.involveNewData,
        description: data?.description,
        objective: data?.objective,
        requirementJustification: data?.requirementJustification,

        // developmentType: data?.developmentType,
        // includesDataLoad: data?.includesDataLoad,
        // dataType: Array.isArray(data?.dataType)
        // ? data?.dataType.map((item: any) => item.value)
        // : undefined,
        // dataFrequency: data?.dataFrequency?.value,

        // systemIntegration: data?.systemIntegration,
        // integratedSystems: data?.integratedSystems,

        priority: data?.priority,
        priorityJustification: data?.priorityJustification,
        affectsPortal: data?.affectsPortal,
        requiresDowntime: data?.requiresDowntime,
        estimatedDowntime: data?.estimatedDowntime,

        includesAttachments: data?.includesAttachments,
        attachments: data?.attachments,

        additionalNotes: data?.additionalNotes,
        copyEmails: data?.copyEmails,
      };

      const response = await fetch('https://n8n.digital.gob.do/webhook-test/general-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });

      // if (!response.ok) {
      //   throw new Error(`Error en la solicitud: ${response.status}`);
      // }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
      enqueueSnackbar('El formulario ha sido enviado. Recibirás una copia en tu correo electrónico.', { variant: 'success' });
      reset()
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      enqueueSnackbar('Error al enviar el formulario', { variant: 'error' });
    } finally {
      setLoading(false)
    }
  };

  const today = new Date().toLocaleDateString('es-ES');

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
              <Input
                required
                label='Nombre del solicitante'
                {...register('requesterName')}
                error={errors.requesterName?.message}
              />
            </GridItem>
            <GridItem>
              <Input
                required
                label='Institución o dependencia'
                {...register('institution')}
                error={errors.institution?.message}
              />
            </GridItem>
            <GridItem>
              <Input
                required
                label='Cargo o departamento'
                {...register('department')}
                error={errors.department?.message}
              />
            </GridItem>
            <GridItem>
              <Input
                label='Fecha de solicitud'
                type="text"
                value={today}
                disabled
              />
            </GridItem>
            <GridItem>
              <Input
                required
                label='Correo electrónico institucional'
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
            </GridItem>
            <GridItem>
              <Input
                required
                label='Teléfono o contacto'
                {...register('phone')}
                error={errors.phone?.message}
              />
            </GridItem>
            <GridItem>
              <label className='label'>Canal de solicitud</label>
              <Controller control={control} name="requestChannel" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="Correo" control={<Radio />} label="Correo" />
                </RadioGroup>
              )} />
              <span className="error-text">{errors.requestChannel?.message}</span>
            </GridItem>
          </GridContainer>

          <Divider />

          {/* Descripción del Requerimiento */}
          <br />
          <Typography variant="h6" color="info" gutterBottom>2. Descripción del Requerimiento</Typography>
          <br />
          <GridContainer>
            <GridItem lg={8} md={12}>
              <Input
                required
                label='Título del requerimiento'
                {...register('requestTitle')}
                error={errors.requestTitle?.message}
                placeholder='Breve y claro, que identifique el propósito principal del requerimiento.'
              />
            </GridItem>
            <GridItem>
              {/* <Input
                required
                label='Fecha deseada de la entrega'
                type="date"
                {...register('desiredDeliveryDate')}
                error={errors.desiredDeliveryDate?.message}
              /> */}
              <label className='label'>Fecha deseada de la entrega <span style={{ color: theme.palette.error.main }}>*</span></label>
              <DatePicker
                selected={deliveryDate ? new Date(deliveryDate) : null}
                onChange={(date) => setValue('desiredDeliveryDate', date)}
                className="input"
                dateFormat="dd/MM/yyyy"
                locale="es"
                placeholderText="dd/mm/yyyy"
              />
              <span className="error-text">{errors.desiredDeliveryDate?.message}</span>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>Tipo de solicitud</label>
              <Controller control={control} name="requestType" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value="Nuevo desarrollo" control={<Radio />} label="Nuevo desarrollo" />
                  <FormControlLabel value="Cambio / Mejora / Modificación de funcionalidad existente" control={<Radio />} label="Cambio / Mejora / Modificación de funcionalidad existente" />
                  <FormControlLabel value="Corrección de errores" control={<Radio />} label="Corrección de errores" />
                </RadioGroup>
              )} />
              <span className="error-text">{errors.requestType?.message}</span>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>¿Integración con otro sistema?</label>
              <Controller control={control} name="integrationSystem" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <span className="error-text">{errors.integrationSystem?.message}</span>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>¿Involucra la carga de nuevos datos?</label>
              <Controller control={control} name="involveNewData" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <span className="error-text">{errors.involveNewData?.message}</span>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>Descripción detallada del requerimiento<span style={{ color: theme.palette.error.main }}>*</span></label>
              <textarea
                className="textarea"
                {...register('description')}
                rows={3}
                placeholder='Explique con precisión qué se solicita, el tipo de solicitud, cómo debe funcionar, a quién impacta y, si aplica, detalles técnicos relevantes.'
              />
              <span className="error-text">{errors.description?.message}</span>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>Objetivo o finalidad del requerimiento <span style={{ color: theme.palette.error.main }}>*</span></label>
              <textarea
                {...register('objective')}
                className="textarea"
                rows={3}
                placeholder='¿Cuál es el problema que se busca resolver o la necesidad que se atiende con este requerimiento? ¿Qué se espera lograr?'
              />
              <span className="error-text">{errors.objective?.message}</span>
            </GridItem>
            <GridItem lg={8} md={12}>
              <label className='label'>Sustento normativo, documental, legal u oficial <span style={{ color: theme.palette.error.main }}>*</span></label>
              <textarea
                {...register('requirementJustification')}
                className="textarea"
                rows={3}
                placeholder='Incluir la normativa, resolución, disposición legal o documento oficial que respalda esta solicitud, ya sea de su institución o del Estado Dominicano.'
              />
              {/* <input
                type="file"
                multiple
                onChange={handleFilesChange}
              />
              {requirementJustification.length > 0 && (
                <ul>
                  {requirementJustification.map((file: File, index: number) => (
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
              )}*/}
              <p className="error-text">{errors.requirementJustification?.message as string}</p>
            </GridItem>
          </GridContainer>

          <Divider />

          {/* Alcance */}
          {/* <br />
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
              <span className="error-text">{errors.developmentType?.message}</span>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>¿Involucra la carga de nuevos datos?</label>
              <Controller control={control} name="includesDataLoad" render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={(e: any) => {
                    if (e?.target?.value === 'true') {
                      setValue('includesDataLoad', true)
                      setValue("dataFrequency", { ...dataFrequencyOptions[0] })
                    } else {
                      setValue('includesDataLoad', false)
                    }
                  }}
                >
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <span className="error-text">{errors.includesDataLoad?.message}</span>
              {includesDataLoad && (
                <div style={{ padding: "15px" }}>
                  <GridContainer>
                    <GridItem lg={6}>
                      <label className='label2'>Tipo de datos <span style={{ color: theme.palette.error.main }}>*</span></label>
                      <Select
                        isMulti
                        placeholder="Seleccionar"
                        options={dataTypeOptions}
                        onChange={(e: any) => setValue("dataType", e)}
                      />
                      <span className="error-text">{errors.dataType?.message as string}</span>
                    </GridItem> */}

          {/* <GridItem>
                      <label className='label2'>Fuente de los datos</label>
                      <input {...register('dataSource')} className="input" />
                      <p className="error-text">{errors.dataSource?.message}</p>
                    </GridItem> */}

          {/* <GridItem>
                      <label className='label2'>Periodicidad de la carga</label>
                      <Select
                        placeholder="Seleccionar"
                        defaultValue={dataFrequencyOptions[0]}
                        options={dataFrequencyOptions}
                        onChange={(e: any) => setValue("dataFrequency", e)}
                      />
                      <span className="error-text">{errors.dataFrequency?.message as string}</span>
                    </GridItem>
                  </GridContainer>
                </div>
              )}
            </GridItem> */}

          {/* <GridItem lg={8} md={12}>
              <label className='label'>¿Requiere actualización de metadatos?</label>
              <Controller control={control} name="metadataUpdate" render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <p className="error-text">{errors.metadataUpdate?.message}</p>
            </GridItem> */}

          {/* <GridItem lg={8} md={12}>
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
              <span className="error-text">{errors.systemIntegration?.message}</span>
              {systemIntegration && (
                <div style={{ padding: "15px" }}>
                  <GridContainer>
                    <GridItem lg={6}>
                      <label className='label2'>Especificar los sistemas <span style={{ color: theme.palette.error.main }}>*</span></label>
                      <Input
                        {...register('integratedSystems')}
                        error={errors.integratedSystems?.message}
                      />
                    </GridItem>
                  </GridContainer>
                </div>
              )}
            </GridItem>
          </GridContainer>

          <Divider /> */}

          {/* Impacto */}
          <br />
          <Typography variant="h6" color="info" gutterBottom>3. Impacto de este Requerimiento</Typography>
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
              <span className="error-text">{errors.priority?.message}</span>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>Justificación de la prioridad <span style={{ color: theme.palette.error.main }}>*</span></label>
              <textarea
                {...register('priorityJustification')}
                className="textarea"
                rows={3}
              />
              <span className="error-text">{errors.priorityJustification?.message}</span>
            </GridItem>

            <GridItem lg={8} md={12}>
              <label className='label'>¿Afecta la disponibilidad del portal?</label>
              <Controller control={control} name="affectsPortal" render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                  onChange={(e: any) => setValue('affectsPortal', e?.target?.value === 'true' ? true : false)}
                >
                  <FormControlLabel value={'true'} control={<Radio />} label="Sí" />
                  <FormControlLabel value={'false'} control={<Radio />} label="No" />
                </RadioGroup>
              )} />
              <span className="error-text">{errors.affectsPortal?.message}</span>
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
              <span className="error-text">{errors.requiresDowntime?.message}</span>
              {requiresDowntime && (
                <div style={{ padding: "15px" }}>
                  <GridContainer>
                    <GridItem>
                      <label className='label2'>Tiempo estimado <span style={{ color: theme.palette.error.main }}>*</span></label>
                      <Input
                        {...register('estimatedDowntime')}
                        error={errors.estimatedDowntime?.message}
                      />
                    </GridItem>
                  </GridContainer>
                </div>
              )}
            </GridItem>
          </GridContainer>

          <Divider />

          {/* Adjuntos */}
          <br />
          <Typography variant="h6" color="info" gutterBottom>4. Documentación Adjunta</Typography>
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
              <span className="error-text">{errors.includesAttachments?.message}</span>
              {includesAttachments &&
                <div style={{ padding: "15px" }}>
                  <GridContainer>
                    <GridItem lg={8} md={12}>
                      <label className='label2'>Incluir adjuntos <span style={{ color: theme.palette.error.main }}>*</span></label>
                      <textarea
                        {...register('attachments')}
                        className="textarea"
                        rows={3}
                      />
                      <span className="error-text">{errors.attachments?.message}</span>
                    </GridItem>
                  </GridContainer>
                </div>
              }
              {/* {includesAttachments && (
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
                    <p className="error-text">{errors.attachments?.message as string}</p>
                  </GridItem>
                </GridContainer>
              )} */}
            </GridItem>
          </GridContainer>

          <Divider />
          <br />
          <GridContainer>
            <GridItem lg={8} md={12}>
              <label className='label'>Notas adicionales</label>
              <textarea
                {...register('additionalNotes')}
                className="textarea"
                rows={3}
              />
            </GridItem>
            <GridItem lg={8} md={12}>
              <Input
                label='Correos electrónicos para incluir en copia'
                {...register('copyEmails')}
                error={errors.copyEmails?.message}
              />
            </GridItem>
          </GridContainer>
          <br />
          <Button loading={loading} type="submit" variant="contained" color="primary" className="mt-6">
            Enviar
          </Button>
        </form>
        <Alert severity="info" sx={{ mt: 4, fontWeight: "bold" }}>
          Este formulario generará un ticket automáticamente al ser enviado.
        </Alert>
      </div>
      <br />
      <SLACard />
    </Container>
  );
}
